import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  CONTACT_LIMITS,
  classifySendError,
  prepareContactSubmission,
} from "./contactForm.ts";

const valid = {
  name: "Ana Horvat",
  email: "ana@example.com",
  message: "Hello UPTZ!",
  website: "",
};

describe("prepareContactSubmission", () => {
  test("valid input produces trimmed EmailJS params", () => {
    const result = prepareContactSubmission({
      name: "  Ana Horvat  ",
      email: "  ana@example.com ",
      message: "  Hello UPTZ!  ",
      website: "",
    });
    assert.deepEqual(result, {
      status: "ok",
      params: {
        from_name: "Ana Horvat",
        from_email: "ana@example.com",
        message: "Hello UPTZ!",
        title: "New Contact Form Submission from Ana Horvat",
      },
    });
  });

  test("never sends a recipient address from the browser", () => {
    const result = prepareContactSubmission(valid);
    assert.equal(result.status, "ok");
    if (result.status === "ok") {
      assert.ok(!("to_email" in result.params));
    }
  });

  test("a filled honeypot is treated as spam, whatever else is sent", () => {
    assert.deepEqual(prepareContactSubmission({ ...valid, website: "http://spam.example" }), {
      status: "spam",
    });
    assert.deepEqual(
      prepareContactSubmission({ name: "", email: "bad", message: "", website: "x" }),
      { status: "spam" },
    );
  });

  test("a missing or whitespace-only honeypot is not spam", () => {
    assert.equal(prepareContactSubmission({ ...valid, website: undefined }).status, "ok");
    assert.equal(prepareContactSubmission({ ...valid, website: "   " }).status, "ok");
  });

  test("blank fields are rejected as required", () => {
    for (const field of ["name", "email", "message"] as const) {
      assert.deepEqual(
        prepareContactSubmission({ ...valid, [field]: "   " }),
        { status: "invalid", error: "required" },
        field,
      );
    }
  });

  test("rejects malformed addresses and multi-address tricks", () => {
    for (const email of [
      "nope",
      "a@b",
      "a b@example.com",
      "a@example.com,evil@example.com",
      "a@example.com;evil@example.com",
      "Name <a@example.com>",
      '"quoted"@example.com',
      "a@example.c",
    ]) {
      assert.deepEqual(
        prepareContactSubmission({ ...valid, email }),
        { status: "invalid", error: "invalidEmail" },
        email,
      );
    }
  });

  test("accepts normal addresses", () => {
    for (const email of ["a@b.co", "first.last+tag@sub.example.hr", "ANA@EXAMPLE.COM"]) {
      assert.equal(prepareContactSubmission({ ...valid, email }).status, "ok", email);
    }
  });

  test("enforces length limits, inclusive of the limit itself", () => {
    const atLimit = {
      ...valid,
      name: "n".repeat(CONTACT_LIMITS.name),
      message: "m".repeat(CONTACT_LIMITS.message),
    };
    assert.equal(prepareContactSubmission(atLimit).status, "ok");

    for (const [field, value] of [
      ["name", "n".repeat(CONTACT_LIMITS.name + 1)],
      ["message", "m".repeat(CONTACT_LIMITS.message + 1)],
      ["email", `${"e".repeat(CONTACT_LIMITS.email)}@example.com`],
    ] as const) {
      assert.deepEqual(
        prepareContactSubmission({ ...valid, [field]: value }),
        { status: "invalid", error: "tooLong" },
        field,
      );
    }
  });

  test("collapses line breaks and control characters in the name", () => {
    const result = prepareContactSubmission({ ...valid, name: "Ana\r\nBcc: evil\u0000Horvat" });
    assert.equal(result.status, "ok");
    if (result.status === "ok") {
      assert.equal(result.params.from_name, "Ana Bcc: evil Horvat");
      assert.equal(result.params.title, "New Contact Form Submission from Ana Bcc: evil Horvat");
    }
  });

  test("keeps line breaks in the message", () => {
    const result = prepareContactSubmission({ ...valid, message: "line one\nline two" });
    assert.equal(result.status, "ok");
    if (result.status === "ok") {
      assert.equal(result.params.message, "line one\nline two");
    }
  });
});

describe("classifySendError", () => {
  test("EmailJS rate-limit rejection maps to rateLimited", () => {
    assert.equal(classifySendError({ status: 429, text: "Too Many Requests" }), "rateLimited");
  });

  test("everything else maps to failed", () => {
    for (const error of [
      { status: 451, text: "Unavailable For Headless Browser" },
      { status: 400, text: "The public key is invalid" },
      new Error("Network down"),
      "boom",
      undefined,
      null,
    ]) {
      assert.equal(classifySendError(error), "failed", String(error));
    }
  });
});

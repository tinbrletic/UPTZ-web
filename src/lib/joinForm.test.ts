import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { CONTACT_LIMITS } from "./contactForm.ts";
import {
  DEFAULT_DIVISION,
  JOIN_CHOICES,
  OPEN_DIVISIONS,
  prepareJoinSubmission,
  toContactTemplateParams,
} from "./joinForm.ts";

const valid = {
  name: "Ana Horvat",
  email: "ana@example.com",
  message: "",
  division: "engineering",
  website: "",
};

describe("join divisions", () => {
  test("'Not sure yet' is offered after the open divisions and is the default", () => {
    assert.equal(DEFAULT_DIVISION, "not-sure");
    assert.deepEqual(
      JOIN_CHOICES.map((c) => c.id),
      [...OPEN_DIVISIONS.map((d) => d.id), "not-sure"],
    );
  });

  test("this season's open divisions are Engineering, Development, and Marketing and Web", () => {
    assert.deepEqual(
      OPEN_DIVISIONS.map((d) => d.emailLabel),
      ["Engineering Team", "Development Team", "Marketing and Web"],
    );
  });
});

describe("prepareJoinSubmission", () => {
  test("valid input produces join template params with the division named", () => {
    assert.deepEqual(prepareJoinSubmission({ ...valid, name: "  Ana  Horvat ", message: "  I study at Riteh.  " }), {
      status: "ok",
      params: {
        from_name: "Ana Horvat",
        from_email: "ana@example.com",
        division: "Engineering Team",
        message: "I study at Riteh.",
        title: "Join request: Engineering Team — Ana Horvat",
      },
    });
  });

  test("the few words are optional", () => {
    const result = prepareJoinSubmission({ ...valid, message: "   " });
    assert.equal(result.status, "ok");
    if (result.status === "ok") assert.equal(result.params.message, "");
  });

  test("'Not sure yet' is a valid choice", () => {
    const result = prepareJoinSubmission({ ...valid, division: "not-sure" });
    assert.equal(result.status, "ok");
    if (result.status === "ok") assert.equal(result.params.division, "Not sure yet");
  });

  test("a division that is not offered is rejected", () => {
    for (const division of ["electrical", "", "Engineering Team", "__proto__"]) {
      assert.deepEqual(
        prepareJoinSubmission({ ...valid, division }),
        { status: "invalid", error: "division" },
        division,
      );
    }
  });

  test("name and email are required", () => {
    for (const field of ["name", "email"] as const) {
      assert.deepEqual(
        prepareJoinSubmission({ ...valid, [field]: "  " }),
        { status: "invalid", error: "required" },
        field,
      );
    }
  });

  test("uses the same single-address rule as the contact form", () => {
    for (const email of ["a@b", "Name <a@example.com>", "a@example.com,b@example.com"]) {
      assert.deepEqual(prepareJoinSubmission({ ...valid, email }), { status: "invalid", error: "invalidEmail" }, email);
    }
  });

  test("enforces the contact form's length limits", () => {
    assert.deepEqual(
      prepareJoinSubmission({ ...valid, message: "m".repeat(CONTACT_LIMITS.message + 1) }),
      { status: "invalid", error: "tooLong" },
    );
    assert.deepEqual(
      prepareJoinSubmission({ ...valid, name: "n".repeat(CONTACT_LIMITS.name + 1) }),
      { status: "invalid", error: "tooLong" },
    );
  });

  test("a filled honeypot is spam, whatever else is sent", () => {
    assert.deepEqual(prepareJoinSubmission({ ...valid, division: "nope", website: "x" }), { status: "spam" });
  });

  test("line breaks in the name never reach the subject", () => {
    const result = prepareJoinSubmission({ ...valid, name: "Ana\r\nBcc: x" });
    assert.equal(result.status, "ok");
    if (result.status === "ok") assert.equal(result.params.title, "Join request: Engineering Team — Ana Bcc: x");
  });
});

describe("toContactTemplateParams (fallback until the join template exists)", () => {
  test("keeps the subject and puts the division at the top of the message", () => {
    const result = prepareJoinSubmission({ ...valid, message: "Hello" });
    assert.equal(result.status, "ok");
    if (result.status !== "ok") return;
    assert.deepEqual(toContactTemplateParams(result.params), {
      from_name: "Ana Horvat",
      from_email: "ana@example.com",
      title: "Join request: Engineering Team — Ana Horvat",
      message: "Division: Engineering Team\n\nHello",
    });
  });

  test("still sends a readable message when no words were added", () => {
    const result = prepareJoinSubmission(valid);
    assert.equal(result.status, "ok");
    if (result.status === "ok") {
      assert.equal(toContactTemplateParams(result.params).message, "Division: Engineering Team");
    }
  });
});

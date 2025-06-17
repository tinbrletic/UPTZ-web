# Translation Helpers

This file contains utility functions to handle array translations and complex objects that the main translation hook doesn't properly support.

## Problem

The `useTranslation` hook sometimes returns the translation key as a string instead of parsing nested arrays and objects from the JSON translation files. This causes errors when trying to use `.map()` on what should be an array or access complex data structures.

## Solutions

### `getTranslationArray()`

General-purpose helper for any array translation:

```typescript
import { getTranslationArray } from "@/utils/translationHelpers";

const { t } = useTranslation();

const translatedItems = getTranslationArray(t, "path.to.array.key", [
  "fallback",
  "english",
  "items",
]);
```

### `getProjectDetailArray()`

Specialized helper for project detail pages:

```typescript
import { getProjectDetailArray } from "@/utils/translationHelpers";

const { t } = useTranslation();

const translatedPoints = getProjectDetailArray(
  t,
  "projectName", // e.g., "maloVitra", "deltaOne"
  "section.subsection.points", // e.g., "vesselConstruction.cockpitConstruction.points"
  ["fallback", "english", "items"]
);
```

### `getTranslationObject()`

For complex objects like project details arrays:

```typescript
import { getTranslationObject } from "@/utils/translationHelpers";

const { locale } = useTranslation();

const projectDetails = getTranslationObject(
  locale,
  "projects.detail.maloVitra.projectDetails.details",
  [
    {
      title: "Default Title",
      description: "Default description",
      category: "Default",
    },
  ]
);
```

## Example Usage

```typescript
// In a project detail page
export default function ProjectPage() {
  const { t } = useTranslation();

  return (
    <ul>
      {getProjectDetailArray(
        t,
        "maloVitra",
        "vesselConstruction.cockpitConstruction.points",
        [
          "English fallback point 1",
          "English fallback point 2",
          "English fallback point 3",
        ]
      ).map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  );
}
```

## How It Works

1. **First attempt**: Tries to get the array directly from translation
2. **Second attempt**: Tries to access individual array elements by index (`key.0`, `key.1`, etc.)
3. **Fallback**: Uses English fallback strings only if translation completely fails

This approach maintains full multilingual support while providing graceful fallbacks when translations are missing or malformed.

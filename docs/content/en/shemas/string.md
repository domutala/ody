---
title: String
description: Validate and transform string values.
navigation:
seo:
  title: String schema
  description: Validate and transform string values.
---

## String Schema

**StringSchema** is the foundation for all string-based validation in **Ody**.
It provides a simple, strongly typed, chainable API to **transform and validate strings** using a sequential and deterministic pipeline.

All specialized schemas such as `email`, `uuid`, `url`, and others are built on top of `StringSchema`.

---

## Basic usage

```ts
import * as o from "ody";

const schema = o.string();

schema.parse("hello"); // ✅ "hello"
schema.parse(123);     // ❌ ValidationError
```

Every `StringSchema` always starts with a built-in `string` type validation.

---

## Chaining rules

Rules are chainable and executed in order:

```ts
const schema = o.string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(20);
```

---

## Transformations vs Validations

Ody clearly separates **transformations** and **validations**.

* **Transformations** modify the value
* **Validations** only check the value

**Execution order**:

1. Transformations
2. Validations

---

## Transformations

### `trim()`

Removes whitespace from both ends of the string.

```ts
o.string().trim();
```

### `normalize(form?)`

Normalizes the string using Unicode normalization (default: `NFC`).

```ts
o.string().normalize("NFKC");
```

### `toLowerCase()`

Transforms the value to lowercase.

```ts
o.string().toLowerCase();
```

### `toUpperCase()`

Transforms the value to uppercase.

```ts
o.string().toUpperCase();
```

---

## Validations

### `min(length, message?)`

Checks the minimum string length.

```ts
o.string().min(3);
```

### `max(length, message?)`

Checks the maximum string length.

```ts
o.string().max(20);
```

### `length(length, message?)`

Checks for an exact string length.

```ts
o.string().length(10);
```

### `nonempty(message?)`

Ensures the string is not empty.

```ts
o.string().nonempty();
```

### `includes(value, message?)`

Checks that the string contains a substring.

```ts
o.string().includes("@");
```

### `startsWith(value, message?)`

Checks that the string starts with a value.

```ts
o.string().startsWith("https://");
```

### `endsWith(value, message?)`

Checks that the string ends with a value.

```ts
o.string().endsWith(".png");
```

### `lowercase(message?)`

Checks that the string is lowercase.

```ts
string().lowercase();
```

### `uppercase(message?)`

Checks that the string is uppercase.

```ts
o.string().uppercase();
```

---

## Derived string schemas

All schemas below extend `StringSchema` and add **one domain-specific validation**.

### `email`

```ts
import * as o from "ody";

o.email().parse("user@example.com");
```

### `uuid`

```ts
import * as o from "ody";

o.uuid().parse("550e8400-e29b-41d4-a716-446655440000");
```

### `url`

```ts
import * as o from "ody";

o.url().parse("https://example.com");
```

### `httpUrl`

```ts
import * as o from "ody";

o.httpUrl().parse("https://api.example.com");
```

### `jwt`

```ts
import * as o from "ody";

o.jwt().parse("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
```

### `nanoid`

```ts
import * as o from "ody";

o.nanoid().parse("V1StGXR8_Z5jdHi6B-myT");
```

### `cuid` / `cuid2`

```ts
import * as o from "ody";

o.cuid().parse("ckv1f2xk40000l9d0b3b1d8gq");
o.cuid2().parse("tz4a98xxat96iws9zmbrgj3a");
```

### `ulid`

```ts
import * as o from "ody";

ulid().parse("01ARZ3NDEKTSV4RRFFQ69G5FAV");
```

### `hex`

```ts
import * as o from "ody";

o.hex().parse("deadbeef");
```

### `hash`

```ts
import * as o from "ody";

o.hash().parse("5f4dcc3b5aa765d61d8327deb882cf99");
```

### `base64` / `base64url`

```ts
import * as o from "ody";

o.base64().parse("SGVsbG8gd29ybGQ=");
o.base64url().parse("SGVsbG8td29ybGQ");
```

### `ipv4` / `ipv6`

```ts
import * as o from "ody";

o.ipv4().parse("192.168.1.1");
o.ipv6().parse("2001:db8::1");
```

### `cidrv4` / `cidrv6`

```ts
import * as o from "ody";

o.cidrv4().parse("192.168.0.0/24");
o.cidrv6().parse("2001:db8::/32");
```

### `mac`

```ts
import * as o from "ody";

o.mac().parse("00:1A:2B:3C:4D:5E");
```

### `hostname`

```ts
import {* as o from "ody";

o.hostname().parse("api.example.com");
```

### `isoDate` / `isoDatetime` / `isoTime` / `isoDuration`

```ts
import * as o from "ody";

o.isoDate().parse("2025-01-01");
o.isoDatetime().parse("2025-01-01T10:30:00Z");
o.isoTime().parse("10:30:00");
o.isoDuration().parse("PT2H30M");
```

### `regex`

```ts
import * as o* from "ody";

o.regex(/^[a-z0-9_]+$/).parse("user_name_1");
```

---

## Design notes

* Sequential and immutable pipeline
* Zero external dependencies
* Derived schemas are semantic presets of `StringSchema`
* Designed for performance and extensibility

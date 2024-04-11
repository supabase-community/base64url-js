# base64url

This is a pure TypeScript [Base64-URL](https://en.wikipedia.org/wiki/Base64) encoder/decoder for JavaScript strings
with [UTF-8](https://en.wikipedia.org/wiki/UTF-8) support.

If you've found it, you're already aware that:

- [btoa](https://developer.mozilla.org/en-US/docs/Web/API/btoa) and [atob](https://developer.mozilla.org/en-US/docs/Web/API/atob) only work on ASCII strings, and they're not always
  available in cool new JS runtimes
- [Buffer](https://nodejs.org/api/buffer.html) is only in Node.js
- [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) only works in browsers

This implementation allows you to encode any JavaScript string (emojis and
multi-byte characters allowed!) to and from UTF-8 and then encode it as
Base64-URL. It's great for:

- Working with JWTs on any JS runtime
- Encoding JavaScript strings to UTF-8 when serializing or parsing binary
  formats

It's a no-dependencies / no-depends library. Just copy the `src/base64url.ts`
file in your project. It's mostly finished software, so it's unlikely you'll
need to update it.

## Use

### Base64-URL

To encode to Base64-URL:

```typescript
import { stringToBase64URL } from "./base64url";

stringToBase64URL("This will be encoded to UTF-8 then Base64-URL");
```

To decode from Base64-URL:

```typescript
import { stringFromBase64URL } from "./base64url";

stringFromBase64URL(
  "VGhpcyB3aWxsIGJlIGVuY29kZWQgdG8gVVRGLTggdGhlbiBCYXNlNjQtVVJM",
);
```

### UTF-8

To encode a string to UTF-8:

```typescript
import { stringToUTF8 } from "./base64url";

stringToUTF8("This will be encoded as UTF-8", (byte: number) => {
  // write this byte to a stream or buffer
});
```

To decode UTF-8 bytes to a string:

```typescript
import { stringFromUTF8 } from "./base64url";

const result: string[] = [];
const state = { utf8seq: 0, codepoint: 0 };

const onCodepoint = (codepoint: number) => {
  result.push(String.fromCodePoint(codepoint));
};

for (let byte of buffer) {
  // buffer holds all the UTF-8 bytes,
  // call this function for each byte
  stringFromUTF8(byte, state, onCodepoint);
}

const string = result.join("");
```

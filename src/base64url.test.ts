import { describe, expect, test } from "vitest";
import {
  stringToBase64URL,
  stringFromBase64URL,
  stringFromUTF8,
} from "./base64url";

const EXAMPLES = [
  "a",
  "ab",
  "abc",
  "abcd",
  "hello world",
  "нешто на кирилица",
  "something with emojis 🤙🏾 ",
];

describe("stringToBase64URL", () => {
  EXAMPLES.forEach((example) => {
    test(`encode "${example}"`, () => {
      expect(stringToBase64URL(example)).toEqual(
        Buffer.from(example).toString("base64url"),
      );
    });
  });
});

describe("stringFromBase64URL", () => {
  EXAMPLES.forEach((example) => {
    test(`decode "${example}"`, () => {
      expect(
        stringFromBase64URL(Buffer.from(example).toString("base64url")),
      ).toEqual(example);
    });
  });
});

const BAD_UTF8 = [
  [0xf8], // 11111000
  [0xff], // 11111111
  [0x80], // 10000000
  [0xf8, 1], // 11110000 00000001
  [0xe0, 1], // 11100000 00000001
  [0xc0, 1], // 11100000 00000001
];

describe("stringFromUTF8", () => {
  BAD_UTF8.forEach((example) => {
    test(`should recognize bad UTF-8 sequence ${example.map((x) => x.toString(16)).join(" ")}`, () => {
      expect(() => {
        const state = { utf8seq: 0, codepoint: 0 };
        example.forEach((byte) => {
          console.log("byte ", byte);
          stringFromUTF8(byte, state, () => {});
        });
      }).toThrow(new Error("Invalid UTF-8 sequence"));
    });
  });
});

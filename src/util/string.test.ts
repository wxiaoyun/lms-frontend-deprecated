import { expect, test } from "vitest";
import * as Str from "./string";

test("string: IsValidUsername", () => {
  expect(Str.IsValidUsername("")).toBe(false);

  expect(Str.IsValidUsername("a")).toBe(false);

  expect(Str.IsValidUsername("ab")).toBe(false);

  expect(Str.IsValidUsername("abc")).toBe(false);

  expect(Str.IsValidUsername("abcd")).toBe(false);

  expect(Str.IsValidUsername("abcde")).toBe(true);

  expect(
    Str.IsValidUsername("0123456789" + "0123456789" + "0123456789" + "0"),
  ).toBe(false);
});

test("string: IsValidEmail", () => {
  expect(Str.IsValidEmail("")).toBe(false);

  expect(Str.IsValidEmail("a@gmail")).toBe(false);

  expect(Str.IsValidEmail("a@gmail.")).toBe(false);

  expect(Str.IsValidEmail("a@gmail.c")).toBe(false);

  expect(Str.IsValidEmail("a@gmail.co")).toBe(true);

  expect(Str.IsValidEmail("regular@gmail.com")).toBe(true);
});

test("string: IsValidPassword", () => {
  expect(Str.IsValidPassword("")).toBe(false);

  expect(Str.IsValidPassword("a")).toBe(false);

  expect(Str.IsValidPassword("ab")).toBe(false);

  expect(Str.IsValidPassword("abcdefgh")).toBe(false);

  expect(Str.IsValidPassword("Ab4defgh")).toBe(false);

  expect(Str.IsValidPassword("Abc!efgh")).toBe(false);

  expect(Str.IsValidPassword("ab4!efgh")).toBe(false);

  expect(Str.IsValidPassword("Ab4!efgh")).toBe(true);
});

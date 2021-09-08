import React from "react";
import renderer from "react-test-renderer";

import App from "./App";
import { jest } from "@jest/globals";

jest.useFakeTimers();

test("has 1 child", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree.children.length).toBe(1);
});

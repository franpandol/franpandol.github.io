import { describe, expect, test } from "vitest";
import { gatewayOptions } from "./aiGateway.js";

describe("gatewayOptions", () => {
  test("is undefined when AI_GATEWAY_ID is not set", () => {
    expect(gatewayOptions({})).toBeUndefined();
  });

  test("is undefined when AI_GATEWAY_ID is blank", () => {
    expect(gatewayOptions({ AI_GATEWAY_ID: "   " })).toBeUndefined();
  });

  test("enables log collection for the configured gateway", () => {
    expect(gatewayOptions({ AI_GATEWAY_ID: " default " })).toEqual({
      gateway: { id: "default", collectLog: true },
    });
  });
});

import { describe, expect, it } from "vitest";
import { PlaygroundDemoWorkflowDefinition } from "./demo.ts";
import { runWorkflow } from "@saflib/workflows";

describe("demo", () => {
  it("should successfully dry run", async () => {
    const result = await runWorkflow({
      definition: PlaygroundDemoWorkflowDefinition,
      runMode: "dry",
    });
    expect(result.output?.checklist).toBeDefined();
  });
});

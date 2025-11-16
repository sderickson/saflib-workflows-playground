import { PlaygroundDemoWorkflowDefinition } from "./demo.ts";
import type { WorkflowDefinition } from "@saflib/workflows";

export {
  // Export each workflow definition separately
  PlaygroundDemoWorkflowDefinition,
};

const PlaygroundWorkflowDefinitions: WorkflowDefinition[] = [
  // And have the default export be the array of all of them
  PlaygroundDemoWorkflowDefinition,
];
export default PlaygroundWorkflowDefinitions;

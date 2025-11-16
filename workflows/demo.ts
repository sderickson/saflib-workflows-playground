import {
  defineWorkflow,
  step,
  makeWorkflowMachine,
  CwdStepMachine,
} from "@saflib/workflows";
import {
  AddDrizzleQueryWorkflowDefinition,
  UpdateSchemaWorkflowDefinition,
} from "@saflib/drizzle/workflows";
import {
  AddRouteWorkflowDefinition,
  AddSchemaWorkflowDefinition,
} from "@saflib/openapi/workflows";
import path from "node:path";
import { InitServiceWorkflowDefinition } from "@saflib/service/workflows";

const input = [] as const;

interface PlaygroundDemoWorkflowContext {}

export const PlaygroundDemoWorkflowDefinition =
  defineWorkflow<
    typeof input,
    PlaygroundDemoWorkflowContext
  >({
    id: "playground/demo",

    description: "Create a demo workflow that runs init workflows and example workflows",

    checklistDescription: () =>
      `Create a demo workflow demonstrating the power of workflows by running init workflows and example workflows.`,

    input,

    sourceUrl: import.meta.url,

    context: () => {
      return {};
    },

    templateFiles: {},

    versionControl: {
      allowPaths: ["./demo/**"],
    },

    docFiles: {},

    steps: [
      step(makeWorkflowMachine(InitServiceWorkflowDefinition), () => ({
        name: "example-service",
        path: "./example",
      })),

      // Run example workflow: add a db schema
      step(CwdStepMachine, () => ({
        path: path.join("./example/example-db"),
      })),
      step(makeWorkflowMachine(UpdateSchemaWorkflowDefinition), () => ({
        path: "./schemas/user.ts",
      })),
      step(makeWorkflowMachine(AddDrizzleQueryWorkflowDefinition), () => ({
        path: "./queries/user/list.ts",
        promptMessage: "Add the query for a list of users.",
      })),

      // // Run example workflow: add a route
      step(CwdStepMachine, () => ({
        path: path.join("./example/example-spec"),
      })),
      step(makeWorkflowMachine(AddSchemaWorkflowDefinition), () => ({
        name: "user",
        promptMessage: "Add the API schema for the user resource that reflects the database schema.",
      })),
      step(makeWorkflowMachine(AddRouteWorkflowDefinition), () => ({
        path: "./routes/users/list.yaml",
        promptMessage: "Add the spec for a list route that uses the user schema.",
      })),
    ],
  });

export default PlaygroundDemoWorkflowDefinition;
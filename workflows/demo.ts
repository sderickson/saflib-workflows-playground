import {
  defineWorkflow,
  step,
  makeWorkflowMachine,
  CwdStepMachine,
} from "@saflib/workflows";
import {
  DrizzleInitWorkflowDefinition,
  UpdateSchemaWorkflowDefinition,
} from "@saflib/drizzle/workflows";
import {
  ExpressInitWorkflowDefinition,
} from "@saflib/express/workflows";
import {
  OpenapiInitWorkflowDefinition,
  AddRouteWorkflowDefinition,
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

      // // Run example workflow: add a route
      // step(CwdStepMachine, ({ context }) => ({
      //   path: path.join(context.demoDir, "example-spec"),
      // })),
      // step(makeWorkflowMachine(AddRouteWorkflowDefinition), () => ({
      //   path: "./routes/users/list.yaml",
      // })),
    ],
  });

export default PlaygroundDemoWorkflowDefinition;
# `saflib-workflows` Playground

This repo is a space to try out workflows without having to set them up for your own projects.

## Setup

1. Clone the repo
2. Run `git submodule update --init` to make sure `saflib/` is set up
3. Make sure you're running Node v22.19.0 or higher
4. Run `npm install`
5. Run `npm exec saf-workflow` to make sure workflows are working. You should see a help message.

## Run the demo

There is [one demo workflow](./workflows/demo.ts) that you can run to see the power of workflows. It will create a simple service with a database schema, a query, and a route.

### Checklist

To see what the workflow will do without running any of it:

```bash
npm exec saf-workflow checklist ./workflows/demo.ts
```

### Scripts

To run the workflow's automated scripts without invoking any agents:

```
npm exec saf-workflow run-scripts ./workflows/demo.ts
```

This will copy a great many files from templates, and run some commands such as `npm install`, `npm run typecheck`, and `npm run test`.

### Manually

If you want to act in the part of the agent:

```bash
npm exec saf-workflow kickoff ./workflows/demo.ts
```

It'll initialize the service, then prompt you to do the implementation parts.

### Agent-Driven

If you'd like the agent to do the implementation, prompt the agent:

```
Please run the following command:
npm exec saf-workflow kickoff ./workflows/demo.ts

Follow its instructions until the workflow is entirely finished.
```

Odds are good the agent will do so. If it stops partway through, nudge it to continue. You can check the status of the workflow with:

```
npm exec saf-workflow status ./workflows/demo.ts
```

### CLI-Driven

To have the workflow tool invoke the agent, you will need [Cursor CLI](https://cursor.com/cli) installed. Set that up first, including logging in, then run:

```bash
npm exec saf-workflow kickoff ./workflows/demo.ts -- -r cursor
```

### With Version Control

For either Agent-Driven or CLI-Driven, you can have the workflow tool automatically commit after each workflow.

```bash
npm exec saf-workflow kickoff ./workflows/demo.ts -- -v git            # Agent-Driven
npm exec saf-workflow kickoff ./workflows/demo.ts -- -v git -r cursor  # CLI-Driven
```

You may want to create a branch first to isolate the commits.

## Run Individual Workflows

Any of the above methods can also be used to run routine workflows, rather than the entire demo. The first few steps would be:

```bash
npm exec saf-workflow kickoff service/init example-service ./example
cd ./example/example-db
npm exec saf-workflow kickoff drizzle/update-schema ./schemas/user.ts
```
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

```
npm exec saf-workflow checklist ./workflows/demo.ts
```

### Scripts

To run the workflow's automated scripts without invoking any agents:

```
npm exec saf-workflow run-scripts ./workflows/demo.ts
```

This will copy a great many files from templates, and run some commands such as `npm install`, `npm run typecheck`, and `npm run test`.
# Lambda extensions example

This example shows how to create a simple Lambda with a monitoring tool composed of:
- an internal extension that logs all http calls made by the Lambda
- an external extension that aggregate those logs and send them to an hypothetical monitoring tool


## Install

```bash
 pnpm install
 pnpm cdk bootstrap
 pnpm run deploy
```

## Test

```bash
pnpm integration-test
```

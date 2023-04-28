import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Architecture,
  Code,
  LayerVersion,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha";
import { TestEnvVar } from "@swarmion/integration-tests";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const httpApi = new HttpApi(this, "HttpApi");

    new TestEnvVar(this, "API_URL", {
      value: httpApi.url as string,
    });

    const interceptorLayer = new LayerVersion(this, "Interceptor", {
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      compatibleArchitectures: [Architecture.ARM_64],
      code: Code.fromAsset("src/layers/interceptorExtension"),
    });

    const helloFunction = new NodejsFunction(this, "Hello", {
      architecture: Architecture.ARM_64,
      memorySize: 256,
      timeout: cdk.Duration.seconds(5),
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: path.join(__dirname, `/../src/functions/hello/handler.ts`),
      environment: {
        NODE_OPTIONS: "--enable-source-maps --require /opt/interceptor.js",
      },
      layers: [interceptorLayer],
    });

    const syncNftIntegration = new HttpLambdaIntegration(
      "Hello",
      helloFunction
    );

    httpApi.addRoutes({
      path: "/hello",
      methods: [HttpMethod.POST],
      integration: syncNftIntegration,
    });
  }
}

import { DynamoDB, DocumentClient } from "aws-sdk"

const ddb = new DynamoDB({
  endpoint: "http://localhost:8000",
  // ...rest of your configuration variables
})

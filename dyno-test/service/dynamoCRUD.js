const { ExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");
const AWS = require("aws-sdk");
const { debug } = require("console");
AWS.config.update({
    region: "local",
    endpoint: "http://192.168.1.219:8000"
});
var dynamodb = new AWS.DynamoDB();
const dynamoClient = new AWS.DynamoDB.DocumentClient()
dynamodb
    .createTable({
        AttributeDefinitions: [
            {
                AttributeName: "id",
                AttributeType: "n",
            },
            {
                AttributeName: "memberName", AttributeType: "S"
            },
        ],
        KeySchema: [
            {
                AttributeName: "id",
                KeyType: "HASH",
            },
            {
                AttributeName: "memberName",
                KeyType: "RANGE",
            },
        ],
        AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "S" },
            { AttributeName: "memberName", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        },
        BillingMode: "PAY_PER_REQUEST",
        TableName: "members",
    })
    .promise()
    .then(data => console.log("Success!", data))
    .catch((err) => {
        if (err.code == "ResourceInUseException") {
            //do nothing
        } else {
            console.error(err)
        }
    })

const TABLE_MEMBERS = "members"

const addMember = async (member) => {
    const params = {
        TableName: TABLE_MEMBERS,
        Item: member
    }
    await dynamoClient.put(params).promise()
    const response = {
        data: await getMembers()
    }
    return response;
}
const getMemberById = async (id) => {
    const params = {
        TableName: TABLE_MEMBERS,
        Key: {
            id
        }
    }
    return await dynamoClient.get(params).promise()
}
const getMembers = async () => {
    const params = {
        TableName: TABLE_MEMBERS
    }

    const members = await dynamoClient.scan(params).promise()
    console.log(members)
    return members.Items
}
const deleteMember = async (id) => {
    const params = {
        TableName: TABLE_MEMBERS,
        Key: {
            id
        }
    }

    return await dynamoClient.delete(params).promise()
}

const queryByMember =async(memberName)=>{
    const params = {
        Statement: `SELECT * FROM ${TABLE_MEMBERS} where "memberName"= ${memberName}`,
        
    }
    debug(params)
    const data = await dynamodb.executeStatement(params).promise();
    debug(data.)
    return data;
}

module.exports = {
    dynamoClient,
    getMembers,
    addMember,
    getMemberById,
    deleteMember,
    queryByMember
}
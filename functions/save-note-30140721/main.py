import json
import boto3
dynamodb_resource = boto3.resource("dynamodb")
table = dynamodb_resource.Table("lotion-30143339")


def lambda_handler(event, context):
    print()
    body = json.loads(event["body"])
    try:
        table.put_item(Item=body)
        return {
            'statusCode': 200,
            "body": json.dumps({
            "message": "successfully added note"
            })

    }
    except Exception as exp:
        print("exception: ", exp)
    return {
        'statusCode': 500,
        "body": json.dumps({
            "message": str(exp)
        })

    }


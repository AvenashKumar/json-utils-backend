# json-utils-backend

# Pre Req:

1. VS Code

2. Node 14.17.6

3. Postman

# Run:

node server.js

# Docker image build:

docker build . -t us.gcr.io/json-utils-327201/json-utils-backend:1.0.0

# Docker Push:

docker push us.gcr.io/json-utils-327201/json-utils-backend:1.0.0

# Endpoint:

## JSON 2 YAML

Request Type: POST

Request URL: https://json-utils-backend-i23qbebcva-uc.a.run.app/json-utils/api/v1/json2yaml/indent/2

Request Header: Content-Type application/json

Request Body: 

```
{
	"id": "0002",
	"type": "donut",
	"name": "Cake",
	"ppu": 0.55,
	"batters":
		{
			"batter":
				[
					{ "id": "1001", "type": "Regular" },
					{ "id": "1002", "type": "Chocolate" },
					{ "id": "1003", "type": "Blueberry" },
					{ "id": "1004", "type": "Devil's Food" }
				]
		},
	"topping":
		[
			{ "id": "5001", "type": "None" },
			{ "id": "5002", "type": "Glazed" },
			{ "id": "5005", "type": "Sugar" },
			{ "id": "5007", "type": "Powdered Sugar" },
			{ "id": "5006", "type": "Chocolate with Sprinkles" },
			{ "id": "5003", "type": "Chocolate" },
			{ "id": "5004", "type": "Maple" }
		]
}
```

## XML 2 JSON

Request Type: POST

Request URL: https://json-utils-backend-i23qbebcva-uc.a.run.app/json-utils/api/v1/xml2json/indent/2

Request Header: Content-Type application/json

Request Body: 

```
<?xml version="1.0" encoding="UTF-8" ?>
<user id="1">
    <name>John Doe</name>
    <email>john.doe@example.com</email>
    <roles>
        <role>Member</role>
        <role>Admin</role>
    </roles>
    <admin>true</admin>
</user>
```
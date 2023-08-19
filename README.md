<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJS Starter Template

## Author
Simon Brännström

## About
This is a starter template for NestJS with Prisma.io, it currently contains endpoints to `GET` a user by ID, a `POST` to create a user and a `POST` to login a user and get a `JWT` in return. The `GET` by ID endpoint is protected by the `JWT auth guard`.

The project uses SWC for ~20x times faster compile time.

## Setup
1. Create an `.env` file in the root of the project with the keys from `.env.example` and change out the values to reflect your setup.
2. Run `npm i`
3. Run `npm run start:dev` to start the project.

## Testing
To create a user by using cURL, input this in a terminal:
```
curl --request POST \
  --url http://localhost:3000/user \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "TesterA",
	"email": "a@a.se",
	"password": "123"
}'
```

To login that user, run the following cURL command:
```
curl --request POST \
  --url http://localhost:3000/auth \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "a@a.se",
	"password": "123"
}'
```

which will return a token, use that token to do a cURL request to the GET endpoint for fetching a user by ID:

```
curl --request GET \
  --url http://localhost:3000/user/3 \
  --header 'Authorization: Bearer <TOKEN HERE>'
```

That's it for now :) more to come in the future (probably).

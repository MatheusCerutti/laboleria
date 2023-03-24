CREATE DATABASE "laboleria";

CREATE TABLE "cakes" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR UNIQUE NOT NULL,
	"price" NUMERIC NOT NULL,
	"image" VARCHAR NOT NULL,
	"description" text
);

CREATE TABLE "clients" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR UNIQUE NOT NULL,
	"address" VARCHAR NOT NULL,
	"phone" VARCHAR NOT NULL
);


CREATE TABLE "orders" (
	"id" SERIAL PRIMARY KEY,
	"clientId" INTEGER NOT NULL REFERENCES "clients"("id"),
	"cakeId" INTEGER NOT NULL REFERENCES "cakes"("id"),
	"quantity" INTEGER NOT NULL,
	"createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
	"totalPrice" NUMERIC NOT NULL
);

CREATE DATABASE "laboleria";

CREATE TABLE "cakes" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"price" NUMERIC,
	"image" VARCHAR,
	"description" text
);

CREATE TABLE "clients" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"address" VARCHAR,
	"phone" VARCHAR
);


CREATE TABLE "orders" (
	"id" SERIAL PRIMARY KEY,
	"clientId" INTEGER,
	"cakeId" INTEGER,
	"quantity" INTEGER,
	"createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
	"totalPrice" NUMERIC
);

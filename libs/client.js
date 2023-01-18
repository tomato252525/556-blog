import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: "556-blog",
    apiKey: process.env.API_KEY,
});
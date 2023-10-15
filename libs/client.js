import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: "my-divingram",
    apiKey: process.env.API_KEY,
});

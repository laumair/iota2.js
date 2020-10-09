import { Client } from "../../src/api/client";

describe("Client", () => {
    test("Can fail to construct with invalid endpoint", async () => {
        expect(() => new Client("")).toThrow("correct format");
    });

    test("Can be constructed with local url", async () => {
        const client = new Client("https://localhost:14265/");
        expect(client).toBeDefined();
    });

    test("Can be constructed with remote url", async () => {
        const client = new Client("https://my.example.com:14265/");
        expect(client).toBeDefined();
    });
});

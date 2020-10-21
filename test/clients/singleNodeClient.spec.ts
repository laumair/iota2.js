import { SingleNodeClient } from "../../src/clients/singleNodeClient";

describe("Client", () => {
    test("Can fail to construct with invalid endpoint", async () => {
        expect(() => new SingleNodeClient("")).toThrow("correct format");
    });

    test("Can be constructed with local url", async () => {
        const client = new SingleNodeClient("https://localhost:14265/");
        expect(client).toBeDefined();
    });

    test("Can be constructed with remote url", async () => {
        const client = new SingleNodeClient("https://my.example.com:14265/");
        expect(client).toBeDefined();
    });
});

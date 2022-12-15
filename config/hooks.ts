import {generatePgClientWithTestContainer} from "./test.container";

let client;
export let resultset;

jest.setTimeout(20000);

beforeAll(async () => {
    client = await generatePgClientWithTestContainer();

    // Seed (stage) the data in the PostgreSQL database
    await client.query("INSERT INTO books (name, price) VALUES ('Oliver Twist', 3.99), ('Jingle Jangle', 4.50);");
    resultset = await client.query("SELECT * from books");
});

afterAll(async () => {
    await client.end();
});

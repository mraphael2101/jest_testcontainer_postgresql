import {generatePgClientWithTestContainer} from "./test.container";

export let client;
export let resultset;

jest.setTimeout(20000);

beforeAll(async () => {
    client = await generatePgClientWithTestContainer();

    // Seed (stage) values in the PostgreSQL Database
    await client.query("INSERT INTO books (name, price) VALUES ('Oliver Twist', 3.99), ('Jingle Jangle', 4.50);");
    resultset = await client.query("SELECT * from books");
});

afterAll(async () => {
    await client.end();
});

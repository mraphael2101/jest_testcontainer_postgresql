import {generatePgClientWithTestContainer} from "./test.container";

jest.setTimeout(20000);

let client;
let resultset;

beforeAll(async () => {
    // Seed (stage) values in the PostgreSQL Database
    client = await generatePgClientWithTestContainer();
    await client.query("INSERT INTO books (name, price) VALUES ('Oliver Twist', 3.99), ('Jingle Jangle', 4.50);");
    resultset = await client.query("SELECT * from books");
});

test("Validate: Names and Prices of books in the PostgreSQL Container", async () => {
    expect(resultset.rows[0].price).toBe("3.99");
    expect(resultset.rows[1].price).toBe("4.50");

    let i = 0;
    while (i < resultset.rowCount) {
        console.log(resultset.rows[i].name);
        console.log(resultset.rows[i].price);
        i++;
    }
});

test("Display the Physical Structure of the Database", async () => {
    console.log(resultset.fields);
});


afterAll(async () => {
    await client.end();
})

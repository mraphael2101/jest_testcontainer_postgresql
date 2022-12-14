import {generatePgClientWithTestContainer} from "./test.container";

jest.setTimeout(20000);

test("Insert & Validate the names and prices of books in the PostgreSQL Container", async () => {

    const client = await generatePgClientWithTestContainer();

    await client.query("INSERT INTO books (name, price) VALUES ('Oliver Twist', 3.99), ('Jingle Jangle', 4.50);");
    const resultset = await client.query("SELECT * from books");
    expect(resultset.rows[0].price).toBe("3.99");
    expect(resultset.rows[1].price).toBe("4.50");

    // console.log(resultset.fields);   // Displays the physical structure of the db in the container

    let i = 0;
    while (i < resultset.rowCount) {
        console.log(resultset.rows[i].name);
        console.log(resultset.rows[i].price);
        i++;
    }

    await client.end();

});
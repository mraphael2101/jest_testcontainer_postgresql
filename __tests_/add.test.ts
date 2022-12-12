import {generatePgClientWithTestContainer} from "./test.container";

jest.setTimeout(20000);


test("description of my test container", async () => {

    const client = await generatePgClientWithTestContainer();

    await client.query("INSERT INTO books (name, price) VALUES ('Oliver Twist', 100), ('Alice in Wonderland', 200);");
    const resultset = await client.query("SELECT * from books");
    expect(resultset.rows[0].price + resultset.rows[1].price).toBe(300);

    console.log(resultset.fields);

    let i = 0;
    while (i < resultset.rowCount) {
        console.log(resultset.rows[i].name);
        console.log(resultset.rows[i].price);
        i++;
    }

    await client.end();

});
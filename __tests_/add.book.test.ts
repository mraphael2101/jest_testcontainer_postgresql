import {resultset} from "./hooks";

test("Validate: Names and Prices of books in the PostgreSQL Container", async () => {
    expect(resultset.rows[0].name).toBe("Oliver Twist");
    expect(resultset.rows[1].name).toBe("Jingle Jangle");
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

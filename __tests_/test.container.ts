import {Client} from "pg";  // In this example, pg is the docker image name
import {GenericContainer} from "testcontainers";

/** "We want to test our nodejs application with jest. The application connects to PostgreSQL."
 *  Testcontainers is a library that supports different unit test frameworks like Jest and JUnit etc.,
 *  providing lightweight, throwaway instances of common databases, Selenium web browsers, or anything
 *  else that can run inside a Docker container
 * */

export async function generatePgClientWithTestContainer(): Promise<Client> {

    const container = await GenericContainer
        .fromDockerfile(__dirname + "/..").build();

    const testContainer = await container
        .withEnv("POSTGRES_USER", "sample")
        .withEnv("POSTGRES_PASSWORD", "sample")
        .withEnv("POSTGRES_DB", "sample_db")
        .withExposedPorts(5432)
        .start()

    const postgreSqlClient = new Client({
        user: "sample",
        password: "sample",
        database: "sample_db",
        host: testContainer.getHost(),
        port: testContainer.getMappedPort(5432),
    });

    await postgreSqlClient.connect();

    return postgreSqlClient;

}
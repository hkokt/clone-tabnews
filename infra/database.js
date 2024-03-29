import { Client } from 'pg';

async function query(queryObject) {

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
  });

  console.log('POSTGRES_CREDENTIALS:', {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
  });

  try {
    await client.connect();
    const res = await client.query(queryObject);
    return res;
  } catch (err) {
    throw err;
  } finally {
    if (client) {
      await client.end();
    }
  }
}

export default {
  query: query,
};
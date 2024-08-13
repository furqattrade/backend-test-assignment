// script.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://postgres:root123@localhost:5432/testdb',
});

async function createUsersTable() {
  const client = await pool.connect();
  try {
    console.log('Creating users table...');

    // Create the users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        balance NUMERIC(10, 2) NOT NULL
      );
    `);

    console.log('Users table created successfully.');

    // Insert the initial user with id = 1 and a starting balance (e.g., $500.00)
    const initialBalance = 500.00;
    await client.query(
      `INSERT INTO users (balance) VALUES ($1) 
      ON CONFLICT (id) DO NOTHING;`,
      [initialBalance]
    );

    console.log('Initial user inserted with balance:', initialBalance);
  } catch (err) {
    console.error('Error executing script:', err.stack);
  } finally {
    client.release();
    await pool.end();
    console.log('Database connection closed.');
  }
}

createUsersTable().catch((err) => console.error('Unexpected error:', err));

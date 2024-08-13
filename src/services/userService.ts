import { getPool } from '../db/db';

export async function deductUserBalance(userId: number, amount: number): Promise<number> {
  const pool = getPool();
  const client = await pool.connect(); 
  try {
    const result = await client.query('SELECT balance FROM users WHERE id=$1', [userId]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const userBalance: number = result.rows[0].balance;

    if (userBalance < amount) {
      throw new Error('Insufficient balance');
    }

    const newBalance = userBalance - amount;

    await client.query('UPDATE users SET balance=$1 WHERE id=$2', [newBalance, userId]);

    return newBalance;
  } finally {
    client.release();  
  }
}

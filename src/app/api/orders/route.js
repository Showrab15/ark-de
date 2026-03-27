import { promises as fs } from 'fs';
import path from 'path';

const ordersFilePath = path.join(process.cwd(), 'src', 'data', 'orders.json');

// Ensure orders.json exists
async function ensureOrdersFile() {
  try {
    await fs.access(ordersFilePath);
  } catch {
    await fs.writeFile(ordersFilePath, JSON.stringify([], null, 2));
  }
}

// GET /api/orders - Get all orders
export async function GET() {
  try {
    await ensureOrdersFile();
    const ordersData = await fs.readFile(ordersFilePath, 'utf8');
    const orders = JSON.parse(ordersData);
    return Response.json(orders);
  } catch (error) {
    console.error('Error reading orders:', error);
    return Response.json({ error: 'Failed to read orders' }, { status: 500 });
  }
}
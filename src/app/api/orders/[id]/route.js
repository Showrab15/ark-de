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

// PUT /api/orders/[id] - Update order status
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!status || !['pending', 'confirmed', 'delivered', 'canceled', 'returned'].includes(status)) {
      return Response.json({ error: 'Valid status required' }, { status: 400 });
    }

    await ensureOrdersFile();
    const ordersData = await fs.readFile(ordersFilePath, 'utf8');
    const orders = JSON.parse(ordersData);

    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      return Response.json({ error: 'Order not found' }, { status: 404 });
    }

    orders[orderIndex].status = status;

    // Write back to file
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error updating order:', error);
    return Response.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
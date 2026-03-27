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

// POST /api/orders - Add new order
export async function POST(request) {
  try {
    const newOrder = await request.json();

    // Validate required fields
    const requiredFields = ['id', 'productId', 'productName', 'customerName', 'phone', 'address', 'size', 'quantity', 'deliveryCharge', 'status', 'timestamp'];
    for (const field of requiredFields) {
      if (!newOrder[field]) {
        return Response.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    await ensureOrdersFile();
    const ordersData = await fs.readFile(ordersFilePath, 'utf8');
    const orders = JSON.parse(ordersData);

    // Add new order
    orders.push(newOrder);

    // Write back to file
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));

    return Response.json({ success: true, orderId: newOrder.id });
  } catch (error) {
    console.error('Error saving order:', error);
    return Response.json({ error: 'Failed to save order' }, { status: 500 });
  }
}

// PUT /api/orders/[id] - Update order status
export async function PUT(request, { params }) {
  try {
    const url = new URL(request.url);
    const orderId = url.pathname.split('/').pop();

    if (!orderId) {
      return Response.json({ error: 'Order ID required' }, { status: 400 });
    }

    const { status } = await request.json();

    if (!status || !['pending', 'confirmed', 'delivered', 'canceled', 'returned'].includes(status)) {
      return Response.json({ error: 'Valid status required' }, { status: 400 });
    }

    await ensureOrdersFile();
    const ordersData = await fs.readFile(ordersFilePath, 'utf8');
    const orders = JSON.parse(ordersData);

    const orderIndex = orders.findIndex(order => order.id === orderId);
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
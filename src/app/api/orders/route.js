import { getOrders, addOrder, updateOrderStatus } from '@/lib/googleSheets';

// GET /api/orders - Get all orders
export async function GET() {
  try {
    const orders = await getOrders();
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

    const result = await addOrder(newOrder);
    return Response.json(result);
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

    const result = await updateOrderStatus(orderId, status);
    return Response.json(result);
  } catch (error) {
    console.error('Error updating order:', error);
    return Response.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
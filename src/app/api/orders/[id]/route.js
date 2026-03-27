import { updateOrderStatus } from '../../../lib/googleSheets.js';

// PUT /api/orders/[id] - Update order status
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!status || !['pending', 'confirmed', 'delivered', 'canceled', 'returned'].includes(status)) {
      return Response.json({ error: 'Valid status required' }, { status: 400 });
    }

    await updateOrderStatus(id, status);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error updating order:', error);
    return Response.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
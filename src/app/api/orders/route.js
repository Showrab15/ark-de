// import { promises as fs } from 'fs';
// import path from 'path';

// const ordersFilePath = path.join(process.cwd(), 'src', 'data', 'orders.json');

// async function ensureOrdersFile() {
//   try {
//     await fs.access(ordersFilePath);
//   } catch {
//     await fs.writeFile(ordersFilePath, JSON.stringify([], null, 2));
//   }
// }

// // GET /api/orders - Get all orders
// export async function GET() {
//   try {
//     await ensureOrdersFile();
//     const ordersData = await fs.readFile(ordersFilePath, 'utf8');
//     const orders = JSON.parse(ordersData);
//     return Response.json(orders);
//   } catch (error) {
//     console.error('Error reading orders:', error);
//     return Response.json({ error: 'Failed to read orders' }, { status: 500 });
//   }
// }

// // POST /api/orders - Add new order
// export async function POST(request) {
//   try {
//     const orderData = await request.json();

//     // Validate required fields
//     const requiredFields = ['productId', 'productName', 'customerName', 'phone', 'address', 'size', 'quantity', 'deliveryCharge'];
//     for (const field of requiredFields) {
//       if (!orderData[field]) {
//         return Response.json({ error: `Missing required field: ${field}` }, { status: 400 });
//       }
//     }

//     await ensureOrdersFile();
//     const ordersData = await fs.readFile(ordersFilePath, 'utf8');
//     const orders = JSON.parse(ordersData);

//     const newOrder = {
//       id: Date.now().toString(),
//       ...orderData,
//       status: 'pending',
//       timestamp: new Date().toISOString(),
//     };

//     orders.push(newOrder);
//     await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));

//     return Response.json({ success: true, orderId: newOrder.id });
//   } catch (error) {
//     console.error('Error saving order:', error);
//     return Response.json({ error: 'Failed to save order' }, { status: 500 });
//   }
// }

// // PUT /api/orders/[id] - Update order status
// export async function PUT(request, { params }) {
//   try {
//     const url = new URL(request.url);
//     const orderId = url.pathname.split('/').pop();

//     if (!orderId) {
//       return Response.json({ error: 'Order ID required' }, { status: 400 });
//     }

//     const { status } = await request.json();

//     if (!status || !['pending', 'confirmed', 'delivered', 'canceled', 'returned'].includes(status)) {
//       return Response.json({ error: 'Valid status required' }, { status: 400 });
//     }

//     await ensureOrdersFile();
//     const ordersData = await fs.readFile(ordersFilePath, 'utf8');
//     const orders = JSON.parse(ordersData);

//     const orderIndex = orders.findIndex(order => order.id === orderId);
//     if (orderIndex === -1) {
//       return Response.json({ error: 'Order not found' }, { status: 404 });
//     }

//     orders[orderIndex].status = status;
//     await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));

//     return Response.json({ success: true });
//   } catch (error) {
//     console.error('Error updating order:', error);
//     return Response.json({ error: 'Failed to update order' }, { status: 500 });
//   }
// }


import { google } from 'googleapis';

const SHEET_NAME = 'Sheet1';

async function getSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

// GET /api/orders
export async function GET() {
  try {
    const sheets = await getSheets();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A2:K`,
    });

    const rows = response.data.values || [];

    const orders = rows.map((row) => ({
      id: row[0],
      productId: row[1],
      productName: row[2],
      customerName: row[3],
      phone: row[4],
      address: row[5],
      size: row[6],
      quantity: row[7],
      deliveryCharge: row[8],
      status: row[9],
      timestamp: row[10],
    }));

    return Response.json(orders);
  } catch (error) {
    console.error('Error reading orders:', error);
    return Response.json({ error: 'Failed to read orders' }, { status: 500 });
  }
}

// POST /api/orders
export async function POST(request) {
  try {
    const orderData = await request.json();

    const requiredFields = ['productId', 'productName', 'customerName', 'phone', 'address', 'size', 'quantity', 'deliveryCharge'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return Response.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const sheets = await getSheets();
    const newId = Date.now().toString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:K`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          newId,
          orderData.productId,
          orderData.productName,
          orderData.customerName,
          orderData.phone,
          orderData.address,
          orderData.size,
          orderData.quantity,
          orderData.deliveryCharge,
          'pending',
          new Date().toISOString(),
        ]],
      },
    });

    return Response.json({ success: true, orderId: newId });
  } catch (error) {
    console.error('Error saving order:', error);
    return Response.json({ error: 'Failed to save order' }, { status: 500 });
  }
}

// PUT /api/orders?id=xxx
export async function PUT(request) {
  try {
    const url = new URL(request.url);
    const orderId = url.searchParams.get('id');
    const { status } = await request.json();

    const validStatuses = ['pending', 'confirmed', 'delivered', 'canceled', 'returned'];
    if (!orderId || !validStatuses.includes(status)) {
      return Response.json({ error: 'Valid order ID and status required' }, { status: 400 });
    }

    const sheets = await getSheets();

    // Find the row with this order ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === orderId);

    if (rowIndex === -1) {
      return Response.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update status column (column J = index 10, but Sheets uses 1-based + header row)
    const sheetRow = rowIndex + 1;
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!J${sheetRow}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[status]] },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error updating order:', error);
    return Response.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
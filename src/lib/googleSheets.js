import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const ORDERS_RANGE = 'Orders!A:L'; // Columns: A-L for order data
const USERS_RANGE = 'Users!A:G'; // Columns: A-G for user data

// Initialize Google Sheets API
async function getSheetsClient() {
  const credentials = {
    type: "service_account",
    project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
    private_key_id: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.GOOGLE_SHEETS_CLIENT_X509_CERT_URL,
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  return google.sheets({ version: 'v4', auth });
}

// Get all orders from Google Sheets
export async function getOrders() {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: ORDERS_RANGE,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return [];

    // Convert rows to objects (skip header row)
    const headers = rows[0];
    return rows.slice(1).map(row => {
      const order = {};
      headers.forEach((header, index) => {
        order[header] = row[index] || '';
      });
      return order;
    });
  } catch (error) {
    console.error('Error reading from Google Sheets:', error);
    throw new Error('Failed to read orders');
  }
}

// Add new order to Google Sheets
export async function addOrder(orderData) {
  try {
    const sheets = await getSheetsClient();

    // First, get existing data to determine next row
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: ORDERS_RANGE,
    });

    const rows = existingData.data.values || [];
    const nextRow = rows.length + 1;

    // Prepare order data as array
    const orderRow = [
      orderData.id,
      orderData.productId,
      orderData.productName,
      orderData.customerName,
      orderData.phone,
      orderData.address,
      orderData.size,
      orderData.quantity,
      orderData.deliveryCharge,
      orderData.status,
      orderData.timestamp,
    ];

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `Orders!A${nextRow}`,
      valueInputOption: 'RAW',
      resource: {
        values: [orderRow],
      },
    });

    return { success: true, orderId: orderData.id };
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    throw new Error('Failed to save order');
  }
}

// Update order status in Google Sheets
export async function updateOrderStatus(orderId, newStatus) {
  try {
    const sheets = await getSheetsClient();

    // Get all orders
    const orders = await getOrders();

    // Find the order
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }

    // Update status
    orders[orderIndex].status = newStatus;

    // Clear and rewrite the entire sheet (simplified approach)
    const headers = ['id', 'productId', 'productName', 'customerName', 'phone', 'address', 'size', 'quantity', 'deliveryCharge', 'status', 'timestamp'];
    const allRows = [headers, ...orders.map(order => [
      order.id,
      order.productId,
      order.productName,
      order.customerName,
      order.phone,
      order.address,
      order.size,
      order.quantity,
      order.deliveryCharge,
      order.status,
      order.timestamp,
    ])];

    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: ORDERS_RANGE,
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: ORDERS_RANGE,
      valueInputOption: 'RAW',
      resource: {
        values: allRows,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating order in Google Sheets:', error);
    throw new Error('Failed to update order');
  }
}

// Get all users from Google Sheets
export async function getUsers() {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: USERS_RANGE,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return [];

    // Convert rows to objects (skip header row)
    const headers = rows[0];
    return rows.slice(1).map(row => {
      const user = {};
      headers.forEach((header, index) => {
        user[header] = row[index] || '';
      });
      return user;
    });
  } catch (error) {
    console.error('Error reading users from Google Sheets:', error);
    throw new Error('Failed to read users');
  }
}

// Add or update user in Google Sheets
export async function addOrUpdateUser(userData) {
  try {
    const sheets = await getSheetsClient();

    // Get existing users
    const users = await getUsers();

    // Check if user exists
    const existingIndex = users.findIndex(user => user.uid === userData.uid || user.email === userData.email);

    if (existingIndex >= 0) {
      // Update existing user
      users[existingIndex] = { ...users[existingIndex], ...userData };
    } else {
      // Add new user
      users.push(userData);
    }

    // Clear and rewrite the entire sheet
    const headers = ['id', 'uid', 'name', 'email', 'photoURL', 'role', 'createdAt'];
    const allRows = [headers, ...users.map(user => [
      user.id,
      user.uid,
      user.name,
      user.email,
      user.photoURL,
      user.role,
      user.createdAt,
    ])];

    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: USERS_RANGE,
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: USERS_RANGE,
      valueInputOption: 'RAW',
      resource: {
        values: allRows,
      },
    });

    return existingIndex >= 0 ? users[existingIndex] : userData;
  } catch (error) {
    console.error('Error writing user to Google Sheets:', error);
    throw new Error('Failed to save user');
  }
}

// Update user role in Google Sheets
export async function updateUserRole(userId, newRole) {
  try {
    const sheets = await getSheetsClient();

    // Get all users
    const users = await getUsers();

    // Find the user
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Update role
    users[userIndex].role = newRole;

    // Clear and rewrite the entire sheet
    const headers = ['id', 'uid', 'name', 'email', 'photoURL', 'role', 'createdAt'];
    const allRows = [headers, ...users.map(user => [
      user.id,
      user.uid,
      user.name,
      user.email,
      user.photoURL,
      user.role,
      user.createdAt,
    ])];

    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: USERS_RANGE,
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: USERS_RANGE,
      valueInputOption: 'RAW',
      resource: {
        values: allRows,
      },
    });

    return { success: true, user: users[userIndex] };
  } catch (error) {
    console.error('Error updating user role in Google Sheets:', error);
    throw new Error('Failed to update user role');
  }
}
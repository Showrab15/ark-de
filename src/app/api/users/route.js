import { getUsers, addOrUpdateUser } from '../../../lib/googleSheets.js';

export async function GET() {
  try {
    const users = await getUsers();
    return Response.json(users);
  } catch (error) {
    console.error('Error reading users:', error);
    return Response.json({ error: 'Failed to read users' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { uid, name, email, photoURL } = payload;

    if (!uid || !email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userData = {
      id: Date.now().toString(),
      uid,
      name,
      email,
      photoURL,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    const result = await addOrUpdateUser(userData);
    return Response.json(result);
  } catch (error) {
    console.error('Error adding user:', error);
    return Response.json({ error: 'Failed to add user' }, { status: 500 });
  }
}

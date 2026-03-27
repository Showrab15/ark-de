import { promises as fs } from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');

async function ensureUsersFile() {
  try {
    await fs.access(usersFilePath);
  } catch {
    await fs.writeFile(usersFilePath, JSON.stringify([], null, 2));
  }
}

export async function GET() {
  try {
    await ensureUsersFile();
    const usersData = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(usersData);
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

    await ensureUsersFile();
    const usersData = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(usersData);

    const existing = users.find((user) => user.uid === uid || user.email === email);

    if (existing) {
      existing.name = name || existing.name;
      existing.photoURL = photoURL || existing.photoURL;
      existing.email = email || existing.email;
      await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
      return Response.json(existing);
    }

    const newUser = {
      id: Date.now().toString(),
      uid,
      name,
      email,
      photoURL,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    return Response.json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    return Response.json({ error: 'Failed to add user' }, { status: 500 });
  }
}

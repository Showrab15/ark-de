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

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const payload = await request.json();
    const { role } = payload;

    if (!role || !['user', 'admin'].includes(role)) {
      return Response.json({ error: 'Valid role required' }, { status: 400 });
    }

    await ensureUsersFile();
    const usersData = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(usersData);

    const idx = users.findIndex((user) => user.id === id);
    if (idx === -1) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    users[idx].role = role;
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    return Response.json({ success: true, user: users[idx] });
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

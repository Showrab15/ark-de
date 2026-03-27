import { updateUserRole } from '../../../lib/googleSheets.js';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const payload = await request.json();
    const { role } = payload;

    if (!role || !['user', 'admin'].includes(role)) {
      return Response.json({ error: 'Valid role required' }, { status: 400 });
    }

    const result = await updateUserRole(id, role);
    return Response.json(result);
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

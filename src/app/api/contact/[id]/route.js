import { promises as fs } from 'fs';
import path from 'path';

const contactsFilePath = path.join(process.cwd(), 'src', 'data', 'contacts.json');

async function ensureContactsFile() {
  try {
    await fs.access(contactsFilePath);
  } catch {
    await fs.writeFile(contactsFilePath, JSON.stringify([], null, 2));
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!status || !['unread', 'read', 'replied'].includes(status)) {
      return Response.json({ error: 'Valid status required' }, { status: 400 });
    }

    await ensureContactsFile();
    const contactsData = await fs.readFile(contactsFilePath, 'utf8');
    const contacts = JSON.parse(contactsData);

    const contactIndex = contacts.findIndex(contact => contact.id === id);
    if (contactIndex === -1) {
      return Response.json({ error: 'Contact not found' }, { status: 404 });
    }

    contacts[contactIndex].status = status;
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error updating contact:', error);
    return Response.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}
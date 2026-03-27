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

export async function GET() {
  try {
    await ensureContactsFile();
    const contactsData = await fs.readFile(contactsFilePath, 'utf8');
    const contacts = JSON.parse(contactsData);
    return Response.json(contacts);
  } catch (error) {
    console.error('Error reading contacts:', error);
    return Response.json({ error: 'Failed to read contacts' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const contactData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'description'];
    for (const field of requiredFields) {
      if (!contactData[field] || contactData[field].trim() === '') {
        return Response.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return Response.json({ error: 'Invalid email format' }, { status: 400 });
    }

    await ensureContactsFile();
    const contactsData = await fs.readFile(contactsFilePath, 'utf8');
    const contacts = JSON.parse(contactsData);

    const newContact = {
      id: Date.now().toString(),
      ...contactData,
      status: 'unread',
      timestamp: new Date().toISOString(),
    };

    contacts.push(newContact);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));

    return Response.json({ success: true, contactId: newContact.id });
  } catch (error) {
    console.error('Error saving contact:', error);
    return Response.json({ error: 'Failed to save contact' }, { status: 500 });
  }
}
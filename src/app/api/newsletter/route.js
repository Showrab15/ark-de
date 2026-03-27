import { promises as fs } from 'fs';
import path from 'path';

const newsletterFilePath = path.join(process.cwd(), 'src', 'data', 'newsletter.json');

async function ensureNewsletterFile() {
  try {
    await fs.access(newsletterFilePath);
  } catch {
    await fs.writeFile(newsletterFilePath, JSON.stringify([], null, 2));
  }
}

export async function GET() {
  try {
    await ensureNewsletterFile();
    const newsletterData = await fs.readFile(newsletterFilePath, 'utf8');
    const subscribers = JSON.parse(newsletterData);
    return Response.json(subscribers);
  } catch (error) {
    console.error('Error reading newsletter subscribers:', error);
    return Response.json({ error: 'Failed to read newsletter subscribers' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 });
    }

    await ensureNewsletterFile();
    const newsletterData = await fs.readFile(newsletterFilePath, 'utf8');
    const subscribers = JSON.parse(newsletterData);

    // Check if email already exists
    const existing = subscribers.find(sub => sub.email === email);
    if (existing) {
      return Response.json({ message: 'Already subscribed' });
    }

    const newSubscriber = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
      active: true,
    };

    subscribers.push(newSubscriber);
    await fs.writeFile(newsletterFilePath, JSON.stringify(subscribers, null, 2));

    return Response.json({ success: true, message: 'Successfully subscribed' });
  } catch (error) {
    console.error('Error adding newsletter subscriber:', error);
    return Response.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
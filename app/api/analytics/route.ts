import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Analytics from '@/models/Analytics';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { path, referrer, event } = body;

        const userAgent = req.headers.get('user-agent') || '';
        const ip = req.headers.get('x-forwarded-for') || 'unknown';

        // Create an anonymous daily hash for unique visitor counting
        const today = new Date().toISOString().split('T')[0];
        const hash = crypto.createHash('sha256');
        hash.update(`${ip}-${userAgent}-${today}`);
        const sessionIdentifier = hash.digest('hex');

        await connectDB();

        await Analytics.create({
            path,
            referrer,
            userAgent,
            sessionIdentifier,
            event: event || 'page_view'
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Analytics tracking failed:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

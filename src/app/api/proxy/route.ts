// /app/api/proxy/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
        });

        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const mimeType = response.headers['content-type'];

        return NextResponse.json({
            dataUrl: `data:${mimeType};base64,${base64Image}`,
        }, { status: 200 });
    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}

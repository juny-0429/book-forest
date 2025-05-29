import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return new Response('Missing URL', { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return new Response('Failed to fetch the file.', { status: response.status });
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const filename = url.split('/').pop() || 'download';

    return new Response(Buffer.from(arrayBuffer), {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    return NextResponse.json({ ok: false, error: 'Instagram not configured' }, { status: 501 });
  }

  // TODO: Fetch media from Instagram Graph API in Phase 2.
  return NextResponse.json({ ok: false, error: 'Instagram integration pending implementation' }, { status: 501 });
}

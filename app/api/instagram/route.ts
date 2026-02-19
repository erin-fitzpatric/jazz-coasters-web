import { NextResponse } from 'next/server';
import type { InstagramMediaItem } from '@/src/types/instagram';

const REFRESH_CHECK_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 hours
const REFRESH_WINDOW_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

let runtimeAccessToken: string | null = null;
let tokenExpiresAtMs: number | null = null;
let lastRefreshCheckMs = 0;

type MediaApiResponse = {
  data?: Array<{
    id: string;
    media_type: InstagramMediaItem['media_type'];
    media_url?: string;
    thumbnail_url?: string;
    permalink: string;
    caption?: string;
    children?: {
      data?: Array<{ media_url?: string; thumbnail_url?: string }>;
    };
  }>;
  error?: { message?: string };
};

type RefreshResponse = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: { message?: string };
};

async function maybeRefreshInstagramToken(accessToken: string): Promise<string> {
  const now = Date.now();
  if (now - lastRefreshCheckMs < REFRESH_CHECK_INTERVAL_MS) {
    return runtimeAccessToken ?? accessToken;
  }

  // Skip refresh if we recently received a token expiry far in the future.
  if (tokenExpiresAtMs && tokenExpiresAtMs - now > REFRESH_WINDOW_MS) {
    lastRefreshCheckMs = now;
    return runtimeAccessToken ?? accessToken;
  }

  lastRefreshCheckMs = now;

  try {
    const refreshResponse = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(accessToken)}`,
      { cache: 'no-store' }
    );
    const refreshData = (await refreshResponse.json()) as RefreshResponse;

    if (!refreshResponse.ok || !refreshData.access_token) {
      return runtimeAccessToken ?? accessToken;
    }

    runtimeAccessToken = refreshData.access_token;
    if (typeof refreshData.expires_in === 'number') {
      tokenExpiresAtMs = now + refreshData.expires_in * 1000;
    }
    return runtimeAccessToken;
  } catch {
    return runtimeAccessToken ?? accessToken;
  }
}

function mapMediaItems(data: MediaApiResponse['data']): InstagramMediaItem[] {
  const items: InstagramMediaItem[] = [];
  for (const item of data ?? []) {
      const child = item.children?.data?.[0];
      const mediaUrl = item.media_url ?? child?.media_url;
      const thumbnailUrl = item.thumbnail_url ?? child?.thumbnail_url;

      if (!mediaUrl && !thumbnailUrl) {
        continue;
      }

      items.push({
        id: item.id,
        media_type: item.media_type,
        media_url: mediaUrl ?? thumbnailUrl ?? '',
        thumbnail_url: thumbnailUrl,
        permalink: item.permalink,
        caption: item.caption
      });
  }
  return items;
}

async function fetchMediaFromInstagramMe(accessToken: string): Promise<InstagramMediaItem[] | null> {
  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const mediaResponse = await fetch(
    `https://graph.instagram.com/me/media?fields=${encodeURIComponent(fields)}&access_token=${encodeURIComponent(accessToken)}&limit=18`,
    { next: { revalidate: 900 } }
  );
  const mediaData = (await mediaResponse.json()) as MediaApiResponse;

  if (!mediaResponse.ok || !mediaData.data) {
    return null;
  }

  return mapMediaItems(mediaData.data);
}

export async function GET() {
  const configuredToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!configuredToken) {
    return NextResponse.json({ ok: false, error: 'Instagram access token is not configured' }, { status: 501 });
  }

  try {
    const accessToken = await maybeRefreshInstagramToken(runtimeAccessToken ?? configuredToken);

    let items: InstagramMediaItem[] | null = null;

    // Fallback path: direct Instagram token flow (graph.instagram.com/me/media).
    if (!items) {
      items = await fetchMediaFromInstagramMe(accessToken);
    }

    if (!items) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Unable to load Instagram media. Ensure token scopes are valid and the Instagram account is connected correctly.'
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, items }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Instagram request failed' }, { status: 502 });
  }
}

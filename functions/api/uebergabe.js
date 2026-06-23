/* Cloudflare Pages Function – speichert Übergabeprotokoll in KV */

export async function onRequestGet({ env }) {
  try {
    const raw = await env.UEBERGABE_KV.get('handoff');
    const data = raw ? JSON.parse(raw) : { current: {}, sessions: [] };
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ current: {}, sessions: [] }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const raw = await env.UEBERGABE_KV.get('handoff');
    const existing = raw ? JSON.parse(raw) : { current: {}, sessions: [] };

    // Aktuellen Stand als neuen Log-Eintrag sichern
    if (body.gemacht || body.stand) {
      existing.sessions.unshift({
        ts: body.ts || new Date().toISOString(),
        stand: body.stand || '',
        gemacht: body.gemacht || '',
        naechste: body.naechste || '',
        blocker: body.blocker || '',
      });
      if (existing.sessions.length > 20) existing.sessions.pop();
    }

    existing.current = {
      ts: body.ts,
      stand: body.stand || '',
      gemacht: body.gemacht || '',
      naechste: body.naechste || '',
      blocker: body.blocker || '',
    };

    await env.UEBERGABE_KV.put('handoff', JSON.stringify(existing));
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

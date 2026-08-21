export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const allowedOrigins = new Set([
      "https://dwg4577-ai.github.io"
    ]);
    const origin = request.headers.get("Origin") || "";
    const allowed = allowedOrigins.has(origin);

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": allowed ? origin : "null",
      "Vary": "Origin",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: allowed ? 204 : 403, headers });
    }
    if (!allowed) {
      return new Response(JSON.stringify({ error: "허용되지 않은 사이트입니다." }), { status: 403, headers });
    }
    if (!env.ALADIN_TTB_KEY) {
      return new Response(JSON.stringify({ error: "알라딘 API 키가 설정되지 않았습니다." }), { status: 500, headers });
    }

    const normalize = item => ({
      title: item?.title || "",
      author: item?.author || "",
      publisher: item?.publisher || "",
      pubDate: item?.pubDate || "",
      description: item?.description || "",
      isbn: item?.isbn || "",
      isbn13: item?.isbn13 || "",
      cover: (item?.cover || "").replace(/^http:/, "https:"),
      link: item?.link || "",
      pages: Number(
        item?.bookinfo?.itemPage ||
        item?.subInfo?.itemPage ||
        item?.subInfo?.paperBookList?.[0]?.itemPage ||
        item?.itemPage ||
        0
      )
    });

    try {
      if (url.pathname === "/search") {
        const q = url.searchParams.get("q")?.trim();
        if (!q) return new Response(JSON.stringify({ error: "검색어가 없습니다." }), { status: 400, headers });

        const params = new URLSearchParams({
          ttbkey: env.ALADIN_TTB_KEY,
          Query: q,
          QueryType: "Keyword",
          MaxResults: "10",
          start: "1",
          SearchTarget: "Book",
          output: "js",
          Version: "20131101",
          Cover: "Big"
        });

        const r = await fetch("https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?" + params);
        if (!r.ok) throw new Error("Aladin search HTTP " + r.status);
        const data = await r.json();
        return new Response(JSON.stringify({ books: (data.item || []).map(normalize) }), { headers });
      }

      if (url.pathname === "/detail") {
        const isbn = url.searchParams.get("isbn")?.trim();
        if (!isbn) return new Response(JSON.stringify({ error: "ISBN이 없습니다." }), { status: 400, headers });

        const params = new URLSearchParams({
          ttbkey: env.ALADIN_TTB_KEY,
          itemIdType: "ISBN13",
          ItemId: isbn,
          output: "js",
          Version: "20131101",
          Cover: "Big",
          OptResult: "ebookList,usedList,reviewList"
        });

        const r = await fetch("https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?" + params);
        if (!r.ok) throw new Error("Aladin detail HTTP " + r.status);
        const data = await r.json();
        const item = (data.item || [])[0] || {};
        return new Response(JSON.stringify({ book: normalize(item) }), { headers });
      }

      return new Response(JSON.stringify({ ok: true, message: "책책책 Worker v1.7" }), { headers });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "알라딘 요청에 실패했습니다.", detail: String(error) }),
        { status: 500, headers }
      );
    }
  }
};
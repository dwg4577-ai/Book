export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const allowedOrigins = new Set([
      "https://dwg4577-ai.github.io"
    ]);

    const origin = request.headers.get("Origin") || "";
    const allowed = allowedOrigins.has(origin);

    const corsHeaders = {
      "Access-Control-Allow-Origin": allowed ? origin : "null",
      "Vary": "Origin",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      if (!allowed) return new Response(null, { status: 403 });
      return new Response(null, { headers: corsHeaders });
    }

    if (!allowed) {
      return new Response(
        JSON.stringify({ error: "허용되지 않은 사이트입니다." }),
        {
          status: 403,
          headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders }
        }
      );
    }

    if (url.pathname !== "/search") {
      return new Response(
        JSON.stringify({ ok: true, message: "Book Search Worker is running" }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders }
        }
      );
    }

    const query = url.searchParams.get("q")?.trim();
    if (!query) {
      return new Response(
        JSON.stringify({ error: "검색어가 없습니다." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders }
        }
      );
    }

    if (!env.ALADIN_TTB_KEY) {
      return new Response(
        JSON.stringify({ error: "알라딘 API 키가 설정되지 않았습니다." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders }
        }
      );
    }

    const params = new URLSearchParams({
      ttbkey: env.ALADIN_TTB_KEY,
      Query: query,
      QueryType: "Keyword",
      MaxResults: "10",
      start: "1",
      SearchTarget: "Book",
      output: "js",
      Version: "20131101",
      Cover: "Big"
    });

    try {
      const response = await fetch(
        "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?" + params.toString()
      );

      if (!response.ok) throw new Error(`Aladin HTTP ${response.status}`);
      const data = await response.json();

      const books = (data.item || []).map(item => ({
        title: item.title || "",
        author: item.author || "",
        publisher: item.publisher || "",
        pubDate: item.pubDate || "",
        description: item.description || "",
        isbn: item.isbn || "",
        isbn13: item.isbn13 || "",
        cover: (item.cover || "").replace(/^http:/, "https:"),
        link: item.link || "",
        pages: Number(item.subInfo?.itemPage || item.itemPage || 0)
      }));

      return new Response(
        JSON.stringify({ books }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders }
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "알라딘 검색에 실패했습니다.", detail: String(error) }),
        {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders }
        }
      );
    }
  }
};
module.exports = async (req, res) => {
  const now = new Date().toISOString();

  console.log("========== ZALO WEBHOOK ==========");
  console.log("TIME:", now);
  console.log("METHOD:", req.method);
  console.log("HEADERS:", JSON.stringify(req.headers));
  console.log("BODY:", JSON.stringify(req.body));
  console.log("==================================");

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed"
    });
  }

  return res.status(200).json({
    ok: true,
    received: true,
    timestamp: now,
    method: req.method,
    hasBody: !!req.body
  });
};

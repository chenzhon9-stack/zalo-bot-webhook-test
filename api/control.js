const { zaloPost, adminOK } = require("./zalo");

module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed"
    });
  }

  if (!adminOK(req)) {
    return res.status(403).json({
      ok: false,
      error: "Invalid admin key"
    });
  }

  try {

    const action = String(
      (req.body && req.body.action) || ""
    ).trim();

    // =========================
    // GET ME
    // =========================
    if (action === "getMe") {

      const result = await zaloPost("getMe");

      return res.status(200).json(result);
    }

    // =========================
    // GET WEBHOOK INFO
    // =========================
    if (action === "getWebhookInfo") {

      const result = await zaloPost("getWebhookInfo");

      return res.status(200).json(result);
    }

    // =========================
    // DELETE WEBHOOK
    // =========================
    if (action === "deleteWebhook") {

      const result = await zaloPost("deleteWebhook");

      return res.status(200).json(result);
    }

    // =========================
    // SET WEBHOOK
    // =========================
    if (action === "setWebhook") {

      const base = String(
        process.env.PUBLIC_BASE_URL || ""
      ).replace(/\/$/, "");
    
      if (!base.startsWith("https://")) {
        return res.status(400).json({
          ok: false,
          error: "PUBLIC_BASE_URL phải là https://"
        });
      }
    
      const webhookUrl = base + "/api/webhook";
    
      const secret = String(
        process.env.WEBHOOK_SECRET || ""
      ).trim();
    
      if (!secret) {
        return res.status(400).json({
          ok: false,
          error: "Thiếu WEBHOOK_SECRET. Zalo yêu cầu secret_token khi setWebhook."
        });
      }
    
      const body = {
        url: webhookUrl,
        secret_token: secret
      };
    
      const result = await zaloPost(
        "setWebhook",
        body
      );
    
      return res.status(200).json({
        ...result,
        requestedWebhookUrl: webhookUrl,
        secretConfigured: true
      });
    }

    // =========================
    // INVALID ACTION
    // =========================
    return res.status(400).json({
      ok: false,
      error: "Action không hợp lệ",
      action: action
    });

  } catch (e) {

    console.error(e);

    return res.status(500).json({
      ok: false,
      error: String(e.message || e)
    });
  }
};

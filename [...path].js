// pages/api/replicate.js
// هذا الملف يعمل كـ proxy بين المتصفح و Replicate API
// يحل مشكلة CORS نهائياً لأن الطلب يخرج من السيرفر مش من المتصفح

export default async function handler(req, res) {
  // السماح بطلبات من أي مكان
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { path } = req.query;
  if (!path) {
    return res.status(400).json({ error: "missing path param" });
  }

  const replicateKey = req.headers["x-replicate-key"];
  if (!replicateKey || !replicateKey.startsWith("r8_")) {
    return res.status(401).json({ error: "Invalid or missing Replicate API key" });
  }

  const url = `https://api.replicate.com/v1/${Array.isArray(path) ? path.join("/") : path}`;

  try {
    const fetchOptions = {
      method: req.method,
      headers: {
        Authorization: `Bearer ${replicateKey}`,
        "Content-Type": "application/json",
        ...(req.method === "POST" ? { Prefer: "wait=5" } : {}),
      },
    };

    if (req.method === "POST" && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const upstream = await fetch(url, fetchOptions);
    const data = await upstream.json();

    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

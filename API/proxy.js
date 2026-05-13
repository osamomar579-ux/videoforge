module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-replicate-key, x-replicate-path");

  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const replicateKey = req.headers["x-replicate-key"] || process.env.REPLICATE_API_KEY;
  if (!replicateKey || !replicateKey.startsWith("r8_")) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  const replicatePath = req.headers["x-replicate-path"] || "";
  if (!replicatePath) return res.status(400).json({ error: "Missing path" });

  const url = `https://api.replicate.com/v1/${replicatePath}`;

  try {
    const options = {
      method: req.method,
      headers: {
        Authorization: `Bearer ${replicateKey}`,
        "Content-Type": "application/json",
        ...(req.method === "POST" ? { Prefer: "wait=5" } : {}),
      },
    };
    if (req.method === "POST" && req.body) options.body = JSON.stringify(req.body);

    const upstream = await fetch(url, options);
    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

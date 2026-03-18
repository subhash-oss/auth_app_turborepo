const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const BASE_PORT = Number(process.env.PORT) || 3001;
const MAX_TRIES = 30;

/** User API (auth, etc.). Start user app first, or set USER_API_URL. */
const USER_API_URL = process.env.USER_API_URL || "http://127.0.0.1:4000";

app.use(
  "/api",
  createProxyMiddleware({
    target: USER_API_URL,
    changeOrigin: true,
  })
);

app.get("/", (req, res) => {
  res.send("Customer App Running 🚀 — API proxied to " + USER_API_URL);
});

function listen(port, attempt = 0) {
  const server = app.listen(port, () => {
    if (port !== BASE_PORT) {
      console.log(
        `Port ${BASE_PORT} was busy; Customer app running on port ${port} instead`
      );
    } else {
      console.log(`Customer app running on port ${port}`);
    }
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && attempt < MAX_TRIES) {
      listen(port + 1, attempt + 1);
      return;
    }
    if (err.code === "EADDRINUSE") {
      console.error(
        `Could not find a free port after trying ${BASE_PORT}–${port}. Free a port or set PORT.`
      );
    } else {
      console.error(err);
    }
    process.exit(1);
  });
}

listen(BASE_PORT);

const app = require("./app");

const BASE_PORT = Number(process.env.PORT) || 4000;
const MAX_TRIES = 30;

function listen(port, attempt = 0) {
  const server = app.listen(port, () => {
    if (port !== BASE_PORT) {
      console.log(
        `Port ${BASE_PORT} was busy; User service running on port ${port} instead`
      );
    } else {
      console.log(`User service running on port ${port}`);
    }
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && attempt < MAX_TRIES) {
      listen(port + 1, attempt + 1);
      return;
    }
    if (err.code === "EADDRINUSE") {
      console.error(
        `Could not find a free port after trying ${BASE_PORT}–${port}. Set PORT or free a port.`
      );
    } else {
      console.error(err);
    }
    process.exit(1);
  });
}

listen(BASE_PORT);

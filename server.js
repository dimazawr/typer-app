const express = require("express");
const app = express();
const http = require("http").createServer(app);

const path = require("path");

require("./chatConnection")(http);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;

process.on("SIGINT", () => {
  console.log("Bye bye!");
  process.exit();
});

http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

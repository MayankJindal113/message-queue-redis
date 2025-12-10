import express from "express";
import { createClient } from "redis";
const app = express();
app.use(express.json());

const client = createClient();

(async () => {
  await client.connect();
})();

app.post("/submit", async (req, res) => {
  const { pId, uId, code, lang } = req.body;
  await client.lPush("submissions", JSON.stringify({ pId, uId, code, lang }));
  res.json({ status: "success", message: "Submission received" });
});

app.get("/", async (req, res) => {
  return res.json({ status: "success", message: "Hello World" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

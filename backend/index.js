import "dotenv/config";

import express from "express";
import router from './routes/index.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/api', router);

app.get("/", (req, res) => res.send("Hello World !"));

app.listen(PORT, () => {
  console.log(`🚀 Server ready: http://localhost:${PORT}`);
});
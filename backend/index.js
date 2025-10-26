import "dotenv/config";
import express from "express";
import cors from "cors"; // <-- Ajouter cors
import router from './routes/index.js';
import expressJSDocSwagger from "express-jsdoc-swagger";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port= process.env.PORT || 3000;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173' 
}));

app.use(express.json());
app.use('/api', router);

app.get("/", (req, res) => res.send("Hello World !"));

expressJSDocSwagger(app)({
  info: {
    version: "1.0.0",
    title: "ExLibrisDomus API",
    description: "API pour gérer une bibliothèque personnelle, permettant de suivre livres, auteurs, genres, étagères, notes et emprunts de manière simple et centralisée pour un utilisateur.",
    license: { 
      name: "MIT", 
      url: "https://opensource.org/licenses/MIT" 
    },
  },
  baseDir: __dirname,
  filesPattern: "./**/*.js",
  swaggerUIPath: "/api-docs",
});

app.listen(port, () => {
  console.log(`Api is listening on http://localhost:${port}`);
  console.log(`Swagger UI available on http://localhost:${port}/api-docs`);
});

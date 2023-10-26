import "reflect-metadata";
import myDataSource from "./app-data-source";
import express from "express";

import { funcionarioRoutes } from "./routes/FuncionarioRoutes";
import { holeriteRoutes } from "./routes/HoleriteRoutes";
import { proventoRoutes } from "./routes/ProventoRoutes";
import { descontoRoutes } from "./routes/DescontoRoutes";

import cors from "cors";

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.log("Error during Data Source initialization:", err);
  });

const app = express();
app.use(express.json());
app.use(cors());

funcionarioRoutes(app);
holeriteRoutes(app);
descontoRoutes(app);
proventoRoutes(app);
/*
app.get("/Funcionarios", async function (req: Request, res: Response) {
  const funcionarios = await myDataSource.getRepository(Funcionario).find();
  res.json(funcionarios);
});
*/

app.listen(3333, () => {
  console.log("Servidor Backend em execução...");
});
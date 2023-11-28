import "reflect-metadata";
import myDataSource from "./app-data-source";
import express from "express";
import cors from "cors";

import  funcionarioRoutes  from "./routes/FuncionarioRoutes";
import  holeriteRoutes  from "./routes/HoleriteRoutes";
import  proventoRoutes  from "./routes/ProventoRoutes";
import  descontoRoutes from "./routes/DescontoRoutes";
import  loginRoutes from "./routes/LoginRoutes";

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  methods: "GET, POST, PUT, DELETE",
};

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
app.use(cors(corsOptions));
app.use(funcionarioRoutes);
app.use(holeriteRoutes);
app.use(descontoRoutes);
app.use(proventoRoutes);
app.use(loginRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(3333, () => {
  console.log("Servidor Backend em execução...");
});
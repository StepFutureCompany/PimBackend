import { DataSource } from "typeorm";
import { Funcionario } from "./models/Funcionario";
import { Holerite } from "./models/Holerite";
import { Provento } from "./models/Provento";
import { Desconto } from "./models/Desconto";

const myDataSource = new DataSource({
    type: "postgres",
    "host": "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "pim_database",
    entities: [Funcionario, Holerite, Provento, Desconto],
    logging: true,
    synchronize: false,
})

export default myDataSource
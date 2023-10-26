import { DataSource } from "typeorm";
import { Funcionario } from "./models/Funcionario";
import { Holerite } from "./models/Holerite";
import { Provento } from "./models/Provento";
import { Desconto } from "./models/Desconto";

const myDataSource = new DataSource({
    type: "postgres",
    "host": "berry.db.elephantsql.com",
    port: 5432,
    username: "zvgodfxg",
    "password": "kR66oMes2dtQ8_n9xvqC0cDvTTcdTlCP",
    database: "zvgodfxg",
    entities: [Funcionario, Holerite, Provento, Desconto],
    logging: true,
    synchronize: false,
})

export default myDataSource
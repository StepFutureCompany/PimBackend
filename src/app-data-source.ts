import { DataSource } from "typeorm";
import { Funcionario } from "./models/Funcionario";
import { Holerite } from "./models/Holerite";
import { Provento } from "./models/Provento";
import { Desconto } from "./models/Desconto";
import { User } from "./models/User";

const myDataSource = new DataSource({
    type: "postgres",
    "host": "berry.db.elephantsql.com",
    port: 5432,
    "username": "zvgodfxg",
    "password": "kR66oMes2dtQ8_n9xvqC0cDvTTcdTlCP",
    "database": "zvgodfxg",
    entities: [Funcionario, Holerite, Provento, Desconto, User],
    logging: true,
    synchronize: true,
})

export default myDataSource
import { Router } from "express";
import jwt  from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import myDataSource from '../app-data-source';
import { User } from "../models/User";

const routes = Router()

routes.post("/users", async function (req, res) {
  try {
  const { email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 8);

  const user = await myDataSource.getRepository(User).create({
    email,
    password: encryptedPassword,
  })

  const savedUser = await myDataSource.getRepository(User).save(user);
  delete savedUser["password"];
  // @ts-ignore
  savedUser["access_token"] = jwt.sign({
    id: savedUser.id,
  }, "secret", {
    expiresIn: "1d",
  })
  return res.json(savedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: 'Erro ao cadastrar usuário' });
  }
});

routes.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: 'Email e senha são obrigatórios' });
    }

    const user = await myDataSource.getRepository(User).findOne({
      where: {
        email,
      }
    });

    if (!user) {
      return res.status(400).send({ message: 'Usuário não encontrado' });
    }

    if (!user.password) {
      return res.status(400).send({ message: 'Senha não cadastrada' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).send({ message: 'Senha inválida' });
    }

    delete user["password"];
    // @ts-ignore
    user["access_token"] = jwt.sign({
      id: user.id,
    }, "secret", {
      expiresIn: "1d",
    })
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: 'Erro ao realizar login' });
  }
});


export default routes;
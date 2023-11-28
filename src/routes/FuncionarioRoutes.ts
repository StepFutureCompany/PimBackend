import { Request, Response, Router } from 'express';
import myDataSource from '../app-data-source';
import { Funcionario } from '../models/Funcionario';

const routes = Router();

  routes.get("/funcionarios", async function (req: Request, res: Response) {
     try {
      const funcionarios = await myDataSource.getRepository(Funcionario).find();
      res.json(funcionarios);
      } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Erro ao listar funcionários' });
      }
  });

  routes.get("/funcionario/:ra", async function (req: Request, res: Response) {
    try {
    const results = await myDataSource.getRepository(Funcionario).findOneBy({
    ra: +req.params.ra as unknown as string,
    });
    return res.send(results);
    }
    catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao listar funcionário' });
    }
  });

  routes.post("/funcionario", async function (req: Request, res: Response) {
    try {
    const funcionario = await myDataSource.getRepository(Funcionario).create(req.body);
    const results = await myDataSource.getRepository(Funcionario).save(funcionario);
    return res.send(results);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao cadastrar funcionário' });
    }
  });

  routes.put("/funcionario/:ra", async function (req: Request, res: Response) {
    try {
    const funcionario = await myDataSource.getRepository(Funcionario).findOneBy({
        ra: +req.params.ra as unknown as string,
    });

    if (funcionario) {  
			myDataSource.getRepository(Funcionario).merge(funcionario, req.body);
			const results = await myDataSource.getRepository(Funcionario).save(funcionario);
			return res.send(results);
    } else {
			// Tratando o caso em que "funcionario" é null.
			res.status(404).send({ message: 'Funcionário não encontrado' });
    }
  }
  catch (err) {
    console.log(err);
    return res.status(400).send({ message: 'Erro ao atualizar funcionário' });
  }
	});  

	routes.delete("/funcionarios/:ra", async function (req: Request, res: Response) {
    try {
		const results = await myDataSource.getRepository(Funcionario).delete(req.params.ra);
		return res.send(results);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao deletar funcionário' });
    }
	});
		
export default routes;
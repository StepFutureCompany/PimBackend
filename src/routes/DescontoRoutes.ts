import { Express, Request, Response, Router } from 'express';
import myDataSource from '../app-data-source';
import { Desconto } from '../models/Desconto';

const routes = Router();

  routes.get("/descontos", async function (req: Request, res: Response) {
    try {
      const descontos = await myDataSource.getRepository(Desconto).find();
      res.json(descontos);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao listar descontos' });
    }
  });

  routes.get("/desconto/:id_desconto", async function (req: Request, res: Response) {
    try {
    const results = await myDataSource.getRepository(Desconto).findOneBy({
    id_desconto: +req.params.id_desconto as unknown as string,
    });
    return res.send(results);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao listar desconto' });
    }
  });

  routes.post("/desconto", async function (req: Request, res: Response) {
    try {
    const descontos = await myDataSource.getRepository(Desconto).create(req.body);
    const results = await myDataSource.getRepository(Desconto).save(descontos);
    return res.send(results);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao cadastrar desconto' });
    }
  });

  routes.put("/desconto/:id_desconto", async function (req: Request, res: Response) {
    try {
    const desconto = await myDataSource.getRepository(Desconto).findOneBy({
        id_desconto: +req.params.id_desconto as unknown as string,
    });

    if (desconto) {  
			myDataSource.getRepository(Desconto).merge(desconto, req.body);
			const results = await myDataSource.getRepository(Desconto).save(desconto);
			return res.send(results);
    } else {
			// Tratando o caso em que "desconto" é null.
			res.status(404).send({ message: 'desconto não encontrado' });
    }
  } catch (err) { 
    console.log(err);
    return res.status(400).send({ message: 'Erro ao atualizar desconto' });
  }
	});  

	routes.delete("/desconto/:id_desconto", async function (req: Request, res: Response) {
    try {
		const results = await myDataSource.getRepository(Desconto).delete(req.params.id_provento);
		return res.send(results);
    } catch (err) { 
      console.log(err);
      return res.status(400).send({ message: 'Erro ao deletar desconto' });
    }
	});

  export default routes;

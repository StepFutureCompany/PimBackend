import { Express, Request, Response, Router } from 'express';
import myDataSource from '../app-data-source';
import { Provento } from '../models/Provento';

const routes = Router();

  routes.get("/proventos", async function (req: Request, res: Response) {
    try {
    const proventos = await myDataSource.getRepository(Provento).find();
    res.json(proventos);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao listar proventos' });
    }
  });

  routes.get("/provento/:id_provento", async function (req: Request, res: Response) {
    try {
    const results = await myDataSource.getRepository(Provento).findOneBy({
    id_provento: +req.params.id_provento as unknown as string,
    });
    return res.send(results);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao listar provento' });
    }
  });

  routes.post("/proventos", async function (req: Request, res: Response) {
    try {
    const provento = await myDataSource.getRepository(Provento).create(req.body);
    const results = await myDataSource.getRepository(Provento).save(provento);
    return res.send(results); 
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao cadastrar provento' });
    }
  });

  routes.put("/provento/:id_provento", async function (req: Request, res: Response) {
    try {
    const provento = await myDataSource.getRepository(Provento).findOneBy({
        id_provento: +req.params.id_provento as unknown as string,
    });

    if (provento) {  
			myDataSource.getRepository(Provento).merge(provento, req.body);
			const results = await myDataSource.getRepository(Provento).save(provento);
			return res.send(results);
    } else {
			// Tratando o caso em que "provento" é null.
			res.status(404).send({ message: 'Provento não encontrado' });
    }
  } catch (err) { 
    console.log(err);
    return res.status(400).send({ message: 'Erro ao atualizar provento' });
  }
	});  

	routes.delete("/provento/:id_provento", async function (req: Request, res: Response) {
    try { 
		const results = await myDataSource.getRepository(Provento).delete(req.params.id_provento);
		return res.send(results);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao deletar provento' });
    }
	});
		
export default routes;
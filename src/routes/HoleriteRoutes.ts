import { Express, Request, Response, Router } from 'express';
import myDataSource from '../app-data-source';
import { Holerite } from '../models/Holerite';

const routes = Router();

  routes.get("/holerites", async function (req: Request, res: Response) {
    try {
      const holerites = await myDataSource.getRepository(Holerite).find();
      res.json(holerites);
      }
      catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Erro ao listar holerites' });
      }
  });

  routes.get("/holerite/:id_holerite", async function (req: Request, res: Response) {
    try {
    const results = await myDataSource.getRepository(Holerite).findOneBy({
    id_holerite: +req.params.id_holerite as unknown as string,
    });
    return res.send(results);
    }
    catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao listar holerite' });
    }
  });

  routes.post("/holerites", async function (req: Request, res: Response) {
    try {
    const holerite = await myDataSource.getRepository(Holerite).create(req.body);
    const results = await myDataSource.getRepository(Holerite).save(holerite);
    return res.send(results);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao cadastrar holerite' });
    }
  });

  routes.put("/holerite/:id_holerite", async function (req: Request, res: Response) {
    try {
    const holerite = await myDataSource.getRepository(Holerite).findOneBy({
        id_holerite: +req.params.id_holerite as unknown as string,
    });

    if (holerite) {  
			myDataSource.getRepository(Holerite).merge(holerite, req.body);
			const results = await myDataSource.getRepository(Holerite).save(holerite);
			return res.send(results);
    } else {
			// Tratando o caso em que "holerite" é null.
			res.status(404).send({ message: 'holerite não encontrado' });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: 'Erro ao atualizar holerite' });
  }
	});  

	routes.delete("/holerites/:id_holerite", async function (req: Request, res: Response) {
    try {
		const results = await myDataSource.getRepository(Holerite).delete(req.params.id_holerite);
		return res.send(results);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Erro ao deletar holerite' });
    }
	});
		
export default routes;
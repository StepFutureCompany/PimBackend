import { Express, Request, Response } from 'express';
import myDataSource from '../app-data-source';
import { Holerite } from '../models/Holerite';

export function holeriteRoutes(app: Express) {
  
  app.get("/holerites", async function (req: Request, res: Response) {
      const holerites = await myDataSource.getRepository(Holerite).find();
      res.json(holerites);
  });

  app.get("/holerite/:id_holerite", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Holerite).findOneBy({
    id_holerite: +req.params.id_holerite as unknown as string,
    });
    return res.send(results);
  });

  app.post("/holerites", async function (req: Request, res: Response) {
    const holerite = await myDataSource.getRepository(Holerite).create(req.body);
    const results = await myDataSource.getRepository(Holerite).save(holerite);
    return res.send(results);
  });

  app.put("/holerite/:id_holerite", async function (req: Request, res: Response) {
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
	});  

	app.delete("/holerites/:id_holerite", async function (req: Request, res: Response) {
		const results = await myDataSource.getRepository(Holerite).delete(req.params.id_holerite);
		return res.send(results);
	});
		
}

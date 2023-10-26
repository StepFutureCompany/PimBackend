import { Express, Request, Response } from 'express';
import myDataSource from '../app-data-source';
import { Provento } from '../models/Provento';

export function proventoRoutes(app: Express) {
  
  app.get("/proventos", async function (req: Request, res: Response) {
    const proventos = await myDataSource.getRepository(Provento).find();
    res.json(proventos);
  });

  app.get("/provento/:id_provento", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Provento).findOneBy({
    id_provento: +req.params.id_provento as unknown as string,
    });
    return res.send(results);
  });

  app.post("/proventos", async function (req: Request, res: Response) {
    const provento = await myDataSource.getRepository(Provento).create(req.body);
    const results = await myDataSource.getRepository(Provento).save(provento);
    return res.send(results);
  });

  app.put("/provento/:id_provento", async function (req: Request, res: Response) {
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
	});  

	app.delete("/provento/:id_provento", async function (req: Request, res: Response) {
		const results = await myDataSource.getRepository(Provento).delete(req.params.id_provento);
		return res.send(results);
	});
		
}

import { Express, Request, Response } from 'express';
import myDataSource from '../app-data-source';
import { Desconto } from '../models/Desconto';

export function descontoRoutes(app: Express) {
  
  app.get("/descontos", async function (req: Request, res: Response) {
      const descontos = await myDataSource.getRepository(Desconto).find();
      res.json(descontos);
  });

  app.get("/desconto/:id_desconto", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Desconto).findOneBy({
    id_desconto: +req.params.id_desconto as unknown as string,
    });
    return res.send(results);
  });

  app.post("/desconto", async function (req: Request, res: Response) {
    const descontos = await myDataSource.getRepository(Desconto).create(req.body);
    const results = await myDataSource.getRepository(Desconto).save(descontos);
    return res.send(results);
  });

  app.put("/desconto/:id_desconto", async function (req: Request, res: Response) {
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
	});  

	app.delete("/desconto/:id_desconto", async function (req: Request, res: Response) {
		const results = await myDataSource.getRepository(Desconto).delete(req.params.id_provento);
		return res.send(results);
	});
		
}

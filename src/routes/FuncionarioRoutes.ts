import { Express, Request, Response } from 'express';
import myDataSource from '../app-data-source';
import { Funcionario } from '../models/Funcionario';

export function funcionarioRoutes(app: Express) {
  
  app.get("/funcionarios", async function (req: Request, res: Response) {
      const funcionarios = await myDataSource.getRepository(Funcionario).find();
      res.json(funcionarios);
  });

  app.get("/funcionario/:ra", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Funcionario).findOneBy({
    ra: +req.params.ra as unknown as string,
    });
    return res.send(results);
  });

  app.post("/funcionario", async function (req: Request, res: Response) {
    const funcionario = await myDataSource.getRepository(Funcionario).create(req.body);
    const results = await myDataSource.getRepository(Funcionario).save(funcionario);
    return res.send(results);
  });

  app.put("/funcionario/:ra", async function (req: Request, res: Response) {
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
	});  

	app.delete("/funcionarios/:ra", async function (req: Request, res: Response) {
		const results = await myDataSource.getRepository(Funcionario).delete(req.params.ra);
		return res.send(results);
	});
		
}

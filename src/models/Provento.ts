import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Funcionario } from "./Funcionario";

@Entity('proventotest', { schema: 'stepfuturetest' })
export class Provento {

  @PrimaryGeneratedColumn()
  id_provento: string;

  @Column({ type: 'varchar', nullable: false })
  mes_ref: string;

  @Column({ type: 'varchar', nullable: false })
  descricao: string;

  @Column({ type: 'varchar', nullable: false })
  valor: string;

  @Column({ type: 'text', nullable: false })
  ra?: string | null;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'ra' })
  funcionario: Funcionario;

}
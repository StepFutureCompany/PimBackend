import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Funcionario } from "./Funcionario";

@Entity('desconto')
export class Desconto {

  @PrimaryGeneratedColumn()
  id_desconto: string;

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
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Funcionario } from "./Funcionario";

@Entity('holeritetest', { schema: 'stepfuturetest' })
export class Holerite {

  @PrimaryGeneratedColumn()
  id_holerite: string;

  @Column({ type: 'varchar', nullable: false })
  mes_ref: string;

  @Column({ type: 'varchar', nullable: true })
  periodo_trabalhado?: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  vl_bruto?: number | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  vl_liquido?: number | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  insalubridade?: number | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  auxilio_maternidade?: number | null;

  @Column({ type: 'varchar', nullable: true })
  ad_noturno?: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  salario_base?: number | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  periculosidade?: number | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  ferias?: number | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  decimo_terceiro?: number | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  horas_extras?: number | null;

  @Column({ type: 'integer', nullable: true })
  inss?: string | null;

  @Column({ type: 'integer', nullable: true })
  fgts?: string | null;

  @Column({ type: 'integer', nullable: true })
  imposto_de_renda?: string | null;

  @Column({ type: 'integer', nullable: true })
  vale_transporte?: string | null;

  @Column({ type: 'integer', nullable: true })
  "vale_refeição"?: string | null;

  @Column({ type: 'integer', nullable: true })
  vale_alimentacao?: string | null;

  @Column({ type: 'integer', nullable: true })
  faltas?: string | null;

  @Column({ type: 'varchar', nullable: true })
  ra?: string | null;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'ra' })
  funcionario: Funcionario;

}
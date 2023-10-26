import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from "typeorm";

@Entity('funcionariotest', { schema: 'stepfuturetest' })
export class Funcionario extends BaseEntity {

  @PrimaryGeneratedColumn()
  ra: string;

  @Column({ type: 'varchar', nullable: true })
  nome?: string | null;

  @Column({ type: 'varchar', nullable: true })
  cpf?: string | null;

  @Column({ type: 'date', nullable: true })
  dt_nascimento?: Date | null;

  @Column({ type: 'varchar', nullable: true })
  cargo?: string | null;

  @Column({ type: 'varchar', nullable: true })
  email?: string | null;

  @Column({ type: 'varchar', nullable: true })
  "endereço"?: string | null;

  @Column({ type: 'varchar', nullable: true })
  bairro?: string | null;

  @Column({ type: 'varchar', nullable: true })
  cep?: string | null;

  @Column({ type: 'varchar', nullable: true })
  cidade?: string | null;

  @Column({ type: 'varchar', nullable: true })
  celular?: string | null;

  @Column({ type: 'varchar', nullable: true })
  rg?: string | null;

  @Column({ type: 'varchar', nullable: true })
  sl_liquido?: string | null;

  @Column({ type: 'varchar', nullable: true })
  sl_base?: string | null;

  @Column({ type: 'varchar', nullable: true })
  ct_de_trabalho?: string | null;

  @Column({ type: 'varchar', nullable: true })
  pis?: string | null;

  @Column({ type: 'varchar', nullable: true })
  id_permissao?: string | null;

}
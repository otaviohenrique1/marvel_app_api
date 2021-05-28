import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export default class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;
  
  @Column()
  email: string;
  
  @Column()
  senha: string;
}
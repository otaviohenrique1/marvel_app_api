import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('favoritos')
export default class Favorito {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;
  
  @Column()
  item_id: number;

  @Column()
  name: string;
  
  @Column()
  favorite: boolean;
  
  @Column()
  category: string;
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ZMESSAGE")
export class Credentials {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  code!: string;

  @Column()
  scopes!: string;
}

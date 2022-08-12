import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

/** This entity is an extension of Google Credentials Library Entity, Only extra fields are id and createdOn */
@Entity()
export class GoogleCredentials {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  refresh_token?: string;

  @Column({ nullable: true })
  expiry_date?: number;

  @Column({ nullable: true })
  access_token?: string;

  @Column({ nullable: true })
  token_type?: string;

  @Column({ nullable: true })
  id_token?: string;

  @Column({ nullable: true })
  scope?: string;

  @CreateDateColumn()
  createdOn!: Date;
}

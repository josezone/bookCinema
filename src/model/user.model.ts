import {Column, Entity} from 'typeorm';
import {Base} from './base.model';

@Entity()
export class User extends Base {
  @Column({unique: true})
  email!: string;

  @Column({nullable: true})
  password!: string;

  @Column()
  name!: string;

  @Column({default: true})
  status!: boolean;
}

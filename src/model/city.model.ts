import {Column, Entity} from 'typeorm';
import {Base} from './base.model';

@Entity()
export class City extends Base {
  @Column({unique: true})
  city!: string;
}

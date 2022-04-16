import {Column, Entity, ManyToOne} from 'typeorm';
import {Base} from './base.model';
import {City} from './city.model'

@Entity()
export class Cinemas extends Base {
  @Column({unique: true})
  cinemas!: string;

  @Column()
  description!: string;

  @ManyToOne(() => City, city => city.id)
  city!: string;
}

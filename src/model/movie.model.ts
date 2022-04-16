import {Column, Entity} from 'typeorm';
import {Base} from './base.model';

@Entity()
export class Movie extends Base {
  @Column({unique: true})
  movie!: string;

  @Column()
  movieDuration!: string;

  @Column()
  movieDescription!: string;

  @Column()
  movieUrl!: string;

  @Column()
  movieStartDate!: Date;

  @Column()
  movieEndDate!: Date;
}

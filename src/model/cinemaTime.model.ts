import {Column, Entity, ManyToOne} from 'typeorm';
import {Base} from './base.model';
import {Cinemas} from './cinemas.model';

@Entity()
export class CinemaTime extends Base {
  @Column("time")
  cinemaTimes!: Date;

  @ManyToOne(() => Cinemas, cinema => cinema.id)
  cinemas!: string;
}

import {Column, Entity, ManyToOne} from 'typeorm';
import {Base} from './base.model';
import {Cinemas} from './cinemas.model';

@Entity()
export class CinemaSeats extends Base {
  @Column({unique: true})
  seatNumber!: string;

  @Column()
  class!: string;

  @Column()
  cost!: string;

  @ManyToOne(() => Cinemas, cinema => cinema.id)
  cinemas!: string;
}

import {Entity, ManyToOne} from 'typeorm';
import {Base} from './base.model';
import {Cinemas} from './cinemas.model';
import {Movie} from './movie.model';

@Entity()
export class CinemaMovie extends Base {
  @ManyToOne(() => Cinemas, cinema => cinema.id)
  cinemas!: string;

  @ManyToOne(() => Movie, movie => movie.id)
  movie!: string;
}

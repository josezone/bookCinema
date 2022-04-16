import {Column, Entity, ManyToOne} from 'typeorm';
import {Base} from './base.model';
import {CinemaSeats} from './cinemaSeats.model';
import {User} from './user.model';
import {Movie} from './movie.model';
import {CinemaTime} from './cinemaTime.model';

@Entity()
export class UserBooking extends Base {
  @ManyToOne(() => CinemaSeats, cinemaSeats => cinemaSeats.id)
  cinemaSeats!: string;

  @ManyToOne(() => User, user => user.id)
  user!: string;

  @ManyToOne(() => Movie, movie => movie.id)
  movie!: string;

  @ManyToOne(() => CinemaTime, cinemaTime => cinemaTime.id)
  cinemaTime!: string;

  @Column()
  transactionId!: string;

  @Column()
  bookingTimeStart!: Date;

  @Column('boolean', {default: false})
  bookingDone!: Boolean;

  @Column('boolean', {default: false})
  refundInitiated!: Boolean;

  @Column()
  refundTime!: Date;
}

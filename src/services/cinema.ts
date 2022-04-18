import {getConnection} from 'typeorm';
import {UserBooking} from '../model/userBooking.model';

export function getCinemaSeatsService(
  movieId: number,
  cinemasId: number,
  cinemaTimeId: number
) {
  const query =
    'SELECT `cs`.`id` AS `seatId`, `cs`.`seatNumber`, `cs`.`class`, `cs`.`cost`, `ub`.`bookingDone` FROM `user_booking` `ub` RIGHT JOIN `cinema_seats` `cs` ON `ub`.`cinemaTimeId` = `cs`.`id` AND `ub`.`createdAt` >= @activityDateMidnight AND `ub`.`createdAt` < (@activityDateMidnight + 1) LEFT JOIN `cinemas` `c` ON `c`.`id` = `cs`.`cinemasId` LEFT JOIN `cinema_time` `ct` ON `ct`.`cinemasId` = `c`.`id` LEFT JOIN `cinema_movie` `cm` ON `cm`.`cinemasId` = `c`.`id` LEFT JOIN `movie` `mv` ON `mv`.`id` = `cm`.`movieId` WHERE `ct`.`id` = ' +
    cinemaTimeId +
    ' AND `mv`.`id` = ' +
    movieId +
    ' AND `c`.`id` = ' +
    cinemasId;
  const connection = getConnection();
  return connection.query(query);
}

export async function bookTicketService(
  movie: string,
  cinemaTime: string,
  cinemaSeats: string,
  user: string
) {
  const datasource = getConnection();
  const queryRunner = getConnection().createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const bookingDone = await datasource
      .createQueryBuilder(UserBooking, 'order_record', queryRunner)
      .where('order_record.cinemaTimeId = :cinemaTime', {cinemaTime})
      .andWhere('order_record.movieId = :movie', {movie})
      .andWhere('order_record.cinemaSeatsId = :cinemaSeats', {cinemaSeats})
      .execute();
    if (bookingDone.length) {
      await queryRunner.commitTransaction();
      throw 409;
    }
    const result = await datasource
      .createQueryBuilder(UserBooking, 'order_record', queryRunner)
      .insert()
      .into(UserBooking)
      .values({
        cinemaTime,
        cinemaSeats,
        movie,
        user,
        bookingDone: true,
      })
      .execute();
    await queryRunner.commitTransaction();
    return result;
  } catch (err) {
    if (err === 409) {
      throw err;
    }
    if (queryRunner.isTransactionActive) {
      await queryRunner.rollbackTransaction();
    }
    throw 500;
  }
}

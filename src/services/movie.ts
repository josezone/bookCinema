import {getRepository} from 'typeorm';

export function getMovieService(
  cityId: number,
  movieSearch: string | undefined,
  limit: number | undefined,
  offset: number | undefined
) {
  let movieRepo = getRepository('Movie')
    .createQueryBuilder('movie')
    .leftJoinAndSelect('cinema_movie', 'cm', 'cm.movieId = movie.id')
    .leftJoinAndSelect('cinemas', 'cin', 'cin.id = cm.cinemasId')
    .leftJoinAndSelect('cinema_time', 'ct', 'ct.cinemasId = cin.id')
    .leftJoinAndSelect('city', 'cty', 'cty.id = cin.cityId')
    .select([
      'movie.movie AS movie',
      'movie.id AS movieId',
      'cin.cinemas AS cinemas',
      'cin.id AS cinemaId',
      'ct.cinemaTimes AS showTime',
      'ct.id AS showTimeId',
      'cty.id AS cityId',
      'cty.city AS city',
    ])
    .where('cty.id = :id', {id: cityId});
  if (movieSearch) {
    movieRepo = movieRepo.where('movie.movie like :movie', {
      movie: `%${movieSearch}%`,
    });
  }
  movieRepo = movieRepo.orderBy('movie.id');
  if (limit) {
    movieRepo = movieRepo.limit(limit);
  }
  if (offset) {
    movieRepo = movieRepo.offset(offset);
  }

  return movieRepo.execute();
}

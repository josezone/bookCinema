import {getRepository} from 'typeorm';

export function getCityService(
  citySearch: string | undefined,
  limit: number | undefined,
  offset: number | undefined
) {
  let cityRepo = getRepository('City')
    .createQueryBuilder('city')
    .select(['city.id', 'city.city']);
  if (citySearch) {
    cityRepo = cityRepo.where('city.city like :city', {
      city: `%${citySearch}%`,
    });
  }
  cityRepo = cityRepo.orderBy('city.id');
  if (limit) {
    cityRepo = cityRepo.limit(limit);
  }
  if (offset) {
    cityRepo = cityRepo.offset(offset);
  }
  return cityRepo.execute();
}

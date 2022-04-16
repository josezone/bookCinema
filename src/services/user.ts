import {getRepository} from 'typeorm';

export function getUserService(email: string) {
  const userRepo = getRepository('User');
  return userRepo.findOne({where: {email}});
}

export function insertUserService(
  email: string,
  name: string,
  encryptedPassword: string
) {
  const userRepo = getRepository('User');
  const user = userRepo.create() as {
    name: string;
    email: string;
    password: string;
    status: boolean;
  };
  user.name = name;
  user.email = email;
  user.password = encryptedPassword;
  user.status = true;
  return userRepo.save(user);
}

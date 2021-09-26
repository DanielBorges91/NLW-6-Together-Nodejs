import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest {
 name: string;
 email: string;
 admin?: boolean;
}

class CreateUserService {

 async execute ({ name, email, admin }: IUserRequest) {
  const usersRepository = getCustomRepository(UsersRepositories);

  // Não permite cadastrar usuário sem e-mail
  if (!email) {
   throw new Error("Email incorrect");
  };

  // Não permite duplicar usuários existentes identificados com o mesmo e-mail.
  const userAlreadyExists = await usersRepository.findOne({ email });

  if (userAlreadyExists) {
   throw new Error ("User already exits");
  };

  // Cria um novo usuário
  const user = usersRepository.create({
   name,
   email,
   admin,
  });
 
  // Salva o novo usuário criado no banco de dados.
  await usersRepository.save(user);
 
  return user;
 }
}

export { CreateUserService }

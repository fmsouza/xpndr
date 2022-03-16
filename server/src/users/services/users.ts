import { Service } from "typedi";

import { sha256 } from "../../shared/utils";
import { UsersRepository } from "../repository";
import { User } from "../types";

@Service()
export class UsersService {

  public constructor(private readonly usersRepository: UsersRepository) { }

  public async createUser(input: { name: string, email: string, password: string }): Promise<User> {
    const { name, email, password } = input;

    if (await this.usersRepository.getUserByEmail(email)) {
      throw new Error('This user already exists');
    }

    const hashedPassword = sha256(password);

    return this.usersRepository.createUser({
      name,
      email,
      password: hashedPassword
    });
  }
}
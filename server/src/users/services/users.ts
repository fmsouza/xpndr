import { Service } from "typedi";

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

    return this.usersRepository.createUser({
      name,
      email,
      password,
    });
  }

  public async getUserById(id: number): Promise<User | null> {
    return this.usersRepository.getUserById(id);
  }
}
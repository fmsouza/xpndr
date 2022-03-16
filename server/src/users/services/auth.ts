import { Service } from "typedi";

import { createJwt } from "../../shared/utils";
import { UsersRepository } from "../repository";
import { AuthenticationFailedError } from "../types";

@Service()
export class AuthService {

  public constructor(
    private readonly usersRepository: UsersRepository
  ) { }

  public async login(input: { email: string, password: string }): Promise<string> {
    const { email, password } = input;
    const user = await this.usersRepository.getUserByEmailAndPassword(email, password);
    if (!user) {
      throw new AuthenticationFailedError('The e-mail or password provided is invalid.');
    }
    return createJwt(user);
  }
}
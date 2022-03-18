import { Service } from "typedi";

import { createJwt, decodeJwt } from "~/shared/utils";

import { UsersRepository } from "../repository";
import { AuthenticationFailedError, User } from "../types";

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

  public async getUserByAccessToken(accessToken: string): Promise<User | null> {
    const decoded = decodeJwt<{ contents: User }>(accessToken);
    if (!decoded) {
      throw new AuthenticationFailedError('The auth token is invalid.');
    }
    return this.usersRepository.getUserByEmail(decoded.contents.email);
  }
}
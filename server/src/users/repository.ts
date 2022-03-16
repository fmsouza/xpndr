import { PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";

import { User } from "./types";

@Service()
export class UsersRepository {

  public constructor(@Inject('PRISMA') private readonly prisma: PrismaClient) { }

  public async createUser(input: { name: string, email: string, password: string }): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        password: input.password,
      },
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }
}
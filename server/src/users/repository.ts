import { PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";
import { sha256 } from "../shared/utils";

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

  public async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  public async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email_password: {
          email,
          password: sha256(password)
        }
      }
    });
  }
}
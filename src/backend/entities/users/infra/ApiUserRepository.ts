import { TOKEN_STATUS, UrlToken, User } from "@prisma/client";
import { UserRepository } from "../domain/UserRepository";
import {
  TTokens,
  UserDataCreate,
  UserUrlTokenDataUpdate,
} from "../domain/UserDomain";
import PrismaClient from "../../../utils/prisma";
const prisma = PrismaClient;

export function apiUserRepository(): UserRepository {
  async function get(sub: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        sub: sub,
      },
      include: {
        UrlTokens: true,
      },
    });
    return user;
  }

  async function getHighest(column: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      orderBy: {
        [column]: "desc", // Order by ID in descending order
      },
    });
    return user;
  }

  async function checkInvite(invitation: string): Promise<UrlToken | null> {
    const invite = await prisma.urlToken.findUnique({
      where: {
        token: invitation,
        status: TOKEN_STATUS.VALID,
      },
    });

    return invite;
  }

  async function updateUrlToken(
    urlTokenId: number,
    data: UserUrlTokenDataUpdate
  ): Promise<UrlToken | null> {
    const invite = await prisma.urlToken.update({
      where: {
        id: urlTokenId,
      },
      data: data,
    });

    return invite;
  }

  /* async function getAll(ids: number[]): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return users;
  } */

  async function getAll(count: number): Promise<User[]> {
    return prisma.$queryRaw`SELECT * FROM "User" ORDER BY RANDOM() LIMIT ${count}`;
    
  }
 


  async function create(user: UserDataCreate, tokens: TTokens): Promise<User> {
    const userCreated = await prisma.user.create({
      data: {
        ...user,

        UrlTokens: {
          createMany: {
            data: tokens.map((token) => {
              return { token: token };
            }),
          },
        },
      },
      include: {
        UrlTokens: true,
      },
    });
    return userCreated;
  }

  return {
    get,
    getAll,
    create,
    checkInvite,
    updateUrlToken,
    getHighest,
  };
}

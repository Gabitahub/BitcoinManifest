import { TInvite, TTokens, User, UserDataCreate, UserUrlTokenDataUpdate } from "./UserDomain";
export interface UserRepository {
  get: (sub: string) => Promise<User | null>;
  getHighest: (column: string) => Promise<User | null>;
  getAll: (count: number) => Promise<User[]>;
  create: (user: UserDataCreate, tokens: TTokens) => Promise<User>;
  checkInvite: (invite: string) => Promise<TInvite>;
  updateUrlToken: (urlTokenId: number, data: UserUrlTokenDataUpdate) => Promise<TInvite>;
}



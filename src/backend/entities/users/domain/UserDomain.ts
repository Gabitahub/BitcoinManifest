import { Prisma, User as US, UrlToken } from "@prisma/client";

export type UserDataCreate = Prisma.UserCreateInput;
export type User = US;
export type TTokens = string[];
export type TInvite = UrlToken | null;
export type UserUrlTokenDataUpdate = Prisma.UrlTokenUpdateInput;
export type UserSocialMedia = {
  id_str: string;
  screen_name: string;
  profile_image_url_https: string;
};

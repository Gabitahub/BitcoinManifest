import { UserSocialMedia } from "./UserDomain";
export interface SocialMediaRepository {
  getUsers: (usersId: string[]) => Promise<UserSocialMedia[]>;
}

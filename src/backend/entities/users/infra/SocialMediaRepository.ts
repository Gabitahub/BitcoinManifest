import socialMediaService from "@/backend/services/socialMedia";
import { SocialMediaRepository as SMRepository } from "../domain/SocialMediaRepository";
import { UserSocialMedia } from "../domain/UserDomain";

export function SocialMediaRepository(): SMRepository {
  async function getUsers(usersId: string[]): Promise<UserSocialMedia[]> {
    const socialm = await socialMediaService.getUsers(usersId);

    return [];
  }

  return {
    getUsers,
  };
}

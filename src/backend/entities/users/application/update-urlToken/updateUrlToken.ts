import { UserRepository } from "../../domain/UserRepository";
import { TInvite, UserUrlTokenDataUpdate } from "../../domain/UserDomain";

export function updateUrlToken(userRepository: UserRepository) {
  return async (urlTokenId: number, data: UserUrlTokenDataUpdate): Promise<TInvite> => {
    const inv = await userRepository.updateUrlToken(urlTokenId, data);
    return inv;
  };
}

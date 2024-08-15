import { UserRepository } from "../../domain/UserRepository";
import { TInvite } from "../../domain/UserDomain";

export function checkInvite(userRepository: UserRepository) {
  return async (invite: string): Promise<TInvite> => {
    const inv = await userRepository.checkInvite(invite);
	return inv
  };
}

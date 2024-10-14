import { removeLasOcurrenceWordFromString } from "@/lib/utils";
import { User, UserDataCreate } from "../../domain/UserDomain";
import { UserRepository } from "../../domain/UserRepository";

export function createUser(
  userRepository: UserRepository
): (user: UserDataCreate) => Promise<User | null> {
  return async (
    user: UserDataCreate,
  ): Promise<User | null> => {
    try {
      const hqImage = user.image
        ? removeLasOcurrenceWordFromString(user.image, "_normal")
        : "";
      const newUser = await userRepository.create(
        { ...user, image: hqImage },
        []
      );
      return newUser;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };
}

/* Solo se usa una vez para el primer user.
export function createUser(userRepository: UserRepository): (user: UserDataCreate, invitation: string) => Promise<User | null> {
    return async (user: UserDataCreate, invitation: string): Promise<User | null> => {
        try {
            const userInvitationTokens = Array(5).fill(null).map(() => createToken());
            const hqImage = user.image ? removeLasOcurrenceWordFromString(user.image, "_normal") : "";
            const newUser = await userRepository.create({ ...user, image: hqImage }, userInvitationTokens);
            return newUser;
        }
        catch (error) {
            console.log("error", error); 
            return null;
        }
    };
}
*/

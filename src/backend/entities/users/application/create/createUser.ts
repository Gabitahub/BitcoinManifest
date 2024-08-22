import { createToken } from "@/backend/utils";
import { User, UserDataCreate } from "../../domain/UserDomain";
import { UserRepository } from "../../domain/UserRepository";
import { TOKEN_STATUS } from "@prisma/client";
import { removeLasOcurrenceWordFromString } from "@/lib/utils";

export function createUser(
    userRepository: UserRepository
): (user: UserDataCreate, invitation: string) => Promise<User | null> {
    return async (
        user: UserDataCreate,
        invitation: string
    ): Promise<User | null> => {
        try {
            const urlToken = await userRepository.checkInvite(invitation);

            if (!!urlToken) {
                const userInvitationTokens = Array(5)
                    .fill(null)
                    .map(() => createToken());
                const hqImage = user.image
                    ? removeLasOcurrenceWordFromString(user.image, "_normal")
                    : "";
                const newUser = await userRepository.create(
                    { ...user, image: hqImage },
                    userInvitationTokens
                );
                const burnedToken = await userRepository.updateUrlToken(
                    urlToken?.id,
                    {
                        status: TOKEN_STATUS.INVALID,
                        TakenBy: {
                            connect: {
                                id: newUser.id,
                            },
                        },
                    }
                );
                return newUser;
            }
            return null;
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
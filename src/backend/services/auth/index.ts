import "server-only";
import { Claims, getSession } from "@auth0/nextjs-auth0";
import { UserRepository } from "@/backend/entities/users/domain/UserRepository";
import { getUser } from "@/backend/entities/users/application/get/getUser";
import { createUser } from "@/backend/entities/users/application/create/createUser";

export const getUserProfileData = async (): Promise<Claims | null> => {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const { user } = session;
  return user;
};

export interface UserCreateData {
  sid: string;
  sub: string;
  name: string;
  image: string;
  displayName: string;
}

export async function getOrCreateUser(
  userRepository: UserRepository,
  user: UserCreateData,
) {
  let currentUser = await getUser(userRepository)(user.sid);

  if (!currentUser) {
    currentUser = await createUser(userRepository)(user);
  }
  return currentUser;
}

import "server-only";
import { Claims, getSession } from "@auth0/nextjs-auth0";

export const getUserProfileData = async (): Promise<Claims | null> => {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const { user } = session;
  return user;
};

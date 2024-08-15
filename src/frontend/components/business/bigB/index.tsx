import React from "react";
import { getAllUsers } from "@/backend/entities/users/application/get-all/getAllUsers";
import { apiUserRepository } from "@/backend/entities/users/infra/ApiUserRepository";
import { SocialMediaRepository } from "@/backend/entities/users/infra/SocialMediaRepository";
import dynamic from "next/dynamic";
import { getUserProfileData } from "@/backend/services/auth";

const BigBDesktop = dynamic(() => import("./BigBDesktop"), {
  ssr: false,
});

const BigBMobile = dynamic(() => import("./BigBMobile"), {
  ssr: false,
});

const getUsers = async (me: any) => {
  const response = await getAllUsers(
    apiUserRepository(),
    SocialMediaRepository()
  )(me);
  return response;
};

const BigB = async () => {
  const user = await getUserProfileData();
  const dbUser: any = user?.dbUser;
  const users = await getUsers(dbUser);

  return (
    <>
      <BigBDesktop users={users} me={dbUser} />
      <BigBMobile users={users} />
    </>
  );
};

export default BigB;

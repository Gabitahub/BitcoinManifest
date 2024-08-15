import twitterCli from "../utils/twitter";

export const getUsers = async (subIds: string[]) => {
  try {
    /* const result = await twitterCli.request("/users/lookup.json", {
      user_id: ids.join(","),
    }); */
    await twitterCli.get(
      "users/lookup",
      { user_id: subIds.join(",") },
      (err, data, response) => {
        
        if (err) {
          console.error("Error al obtener usuarios:", err);
          return [];
        } else {
          //console.log("Usuarios filtrados:", data, response);
          return [];
        }
      }
    );

    /*  const result = await axios.get('https://api.twitter.com/2/users', {
      params: { ids: ids.join(','), "user.fields": 'id,screen_name,profile_image_url_https' },
      headers: {
        Authorization: `Bearer ${twitterConfig.accessToken}`,
      },
    }); */
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

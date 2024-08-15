import { SocialMediaRepository } from "../../domain/SocialMediaRepository";
import { User } from "../../domain/UserDomain";
import { UserRepository } from "../../domain/UserRepository";
//import { generateRandomNumbersArray } from "../../../../utils";
import { shuffleArray } from "@/lib/utils";
export function getAllUsers(
  userRepository: UserRepository,
  socialMediaRepository: SocialMediaRepository
) {
  return async (me: User | any): Promise<User[]> => {
    try {
      let finalUsers = [];
   
      finalUsers = await userRepository.getAll(700);
      shuffleArray(finalUsers);
     
      if (me) {
        const meIndex = finalUsers.findIndex((u) => u.id === me.id);
        finalUsers.splice(meIndex, 1);

        // Find the indices with rest (%) equal to 7
        const indicesToInsert = finalUsers.reduce((acc: any, _, index) => {
          const rest = index % 10; // Calculate the rest (%) for each index
          if (/* rest === 5 || */ rest === 4) {
            acc.push(index);
          }
          return acc;
        }, []);

        // Insert the user at the middle index among those with rest equal to 7
        if (indicesToInsert.length > 0) {
          const middleIndex = Math.floor(indicesToInsert.length / 2);
          const indexToInsert = indicesToInsert[middleIndex];
          finalUsers.splice(indexToInsert, 0, me);
        } else {
          // If no indices with rest (%) equal to 7, insert at the end
          finalUsers.push(me);
        }
      }

      return finalUsers;
    } catch (error) {
      console.log("error", error);
      return [];
    }
  };
}

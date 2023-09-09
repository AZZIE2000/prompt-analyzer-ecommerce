import axios from "axios";
import { EntityInteface } from "../types";

export const ExtractionService = async <T>(
  prompt: string,
  entities: EntityInteface[]
): Promise<T | undefined> => {
  let response;
  try {
    response = await axios.post(
      "https://ai-textraction.p.rapidapi.com/textraction",
      {
        text: prompt,
        entities: entities,
      },
      {
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "ccb59b6600msh48f48edd5904e9ap1a446fjsn053cc7497999",
          "X-RapidAPI-Host": "ai-textraction.p.rapidapi.com",
        },
      }
    );

    return response.data.results as T;
  } catch (error) {
    console.log(error);
  }
};

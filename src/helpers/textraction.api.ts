import axios from "axios";

interface EntityInteface {
  var_name: string;
  type:
    | "integer"
    | "float"
    | "string"
    | "boolean"
    | "array[integer]"
    | "array[float]"
    | "array[string]"
    | "array[boolean]";
  description: string;
  valid_values?: string[];
}

export const ExtractionService = async <T>(
  prompt: string,
  entities: EntityInteface[]
): Promise<T | undefined> => {
  let response;
  try {
    response = await axios.post(
      "https://www.textraction.ai/api/demo/extract",
      {
        text: prompt,
        entities: entities,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.results as T;
  } catch (error) {
    console.log(error);
  }
};

import { ExtractionService } from "./textraction.api";
type GetActionType = "buy" | "sell" | "rent";
export const getAction = async (
  prompt: string
): Promise<GetActionType[] | undefined> => {
  const res = await ExtractionService<{ action: GetActionType[] }>(prompt, [
    {
      description: "is the intent ? whether its one or more",
      type: "array[string]",
      var_name: "action",
      valid_values: ["sell", "buy", "rent"],
    },
  ]);
  if (res) return res.action;
};
 
type GetCategoryType = "car" | "real-estate";
export const getCategory = async (
  prompt: string
): Promise<GetCategoryType[] | undefined> => {
  const res = await ExtractionService<{ category: GetCategoryType[] }>(prompt, [
    {
      description: "what is the category ? whether its one or more",
      type: "array[string]",
      var_name: "category",
      valid_values: ["car", "real-estate"],
    },
  ]);
  if (res) return res.category;
};

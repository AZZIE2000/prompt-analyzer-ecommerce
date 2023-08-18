export interface EntityInteface {
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
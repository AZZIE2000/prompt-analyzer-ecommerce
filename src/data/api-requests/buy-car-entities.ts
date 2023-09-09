import { EntityInteface } from "../../types";

export const entities: EntityInteface[] = [
  {
    description:
      "what is the car brands in english ? if mentioned in the question or null",
    type: "array[string]",
    var_name: "car_brand",
  },
  {
    description:
      "what is the car model in english ? if mentioned in the question or null",
    type: "string",
    var_name: "car_model",
  },
  {
    description:
      "what is the car year from ? if mentioned in the question or null",
    type: "integer",
    var_name: "car_year_from",
  },
  {
    description:
      "what is the car year to ? if mentioned in the question or null",
    type: "integer",
    var_name: "car_year_to",
  },
  {
    description:
      "what is the car body type ? if mentioned in the question or null",
    type: "array[string]",
    var_name: "car_body_type",
    valid_values: [
      "Bus_MiniVan",
      "Convertible",
      "Coupe",
      "HatchBack",
      "PickUp",
      "SUV",
      "Sedan",
      "Truck",
    ],
  },
  {
    description:
      "what is the car price from ? if mentioned in the question or null",
    type: "integer",
    var_name: "car_price_from",
  },
  {
    description:
      "what is the car price to ? if mentioned in the question or null",
    type: "integer",
    var_name: "car_price_to",
  },
  {
    description:
      "what is the car regional specs ? if mentioned in the question or null",
    type: "string",
    var_name: "car_regional_specs",
  },
  {
    description:
      "what is the car transmission ? if mentioned in the question or null",
    type: "array[string]",
    var_name: "car_transmission",
    valid_values: ["automatic", "manual"],
  },
  // {
  //   description: "what is the car fuel ?",
  //   type: "array[string]",
  //   var_name: "car_fuel",
  //   valid_values: ["gasoline", "diesel", "electric", "hybrid"],
  // },
  {
    description:
      "what is the car colors mentioned ? if mentioned in the question or null",
    type: "array[string]",
    var_name: "car_color",
  },
  {
    description:
      "what is the car interior options ? if mentioned in the question or null",
    type: "array[string]",
    var_name: "car_interior_options",
  },
  {
    description:
      "what is the car condition ? if mentioned in the question or null",
    type: "array[string]",
    var_name: "car_condition",
    valid_values: ["new", "used"],
  },
  {
    description:
      "what is the car used kilometers ? if mentioned in the question or null",
    type: "string",
    var_name: "car_used_kilometers",
  },
  {
    description:
      "what is the car paint condition ? if mentioned in the question or null",
    type: "string",
    var_name: "car_paint_condition",
  },
  {
    description:
      "what is the car body condition ? if mentioned in the question or null",
    type: "string",
    var_name: "car_body_condition",
  },
  {
    description:
      "what is the car license status ? if mentioned in the question or null",
    type: "string",
    var_name: "car_license_status",
  },
  {
    description:
      "what is the car insurance status ? if mentioned in the question or null",
    type: "string",
    var_name: "car_insurance_status",
  },
  {
    description:
      "what is the car payment method ? if mentioned in the question or null",
    type: "array[string]",
    var_name: "car_payment_method",
    valid_values: ["cash", "installments", "cash or installments"],
  },
  {
    description:
      "the country that the car was manufactured in? if mentioned in the question or null",
    type: "string",
    var_name: "car_manufacture_country",
  },
  {
    description:
      "what is the car listing city in english ? if mentioned in the question or null",
    type: "string",
    var_name: "car_listing_city",
  },
  {
    description:
      "which city in jordan the car listed in in english ? if mentioned in the question or null",
    type: "string",
    var_name: "car_listing_region",
    valid_values: [
      "amman",
      "irbid",
      "zarqa",
      "mafraq",
      "ajloun",
      "jerash",
      "balqa",
      "madaba",
      "karak",
      "tafilah",
      "maan",
      "aqaba",
    ],
  },
  {
    description: "what is the language of the text",
    type: "string",
    var_name: "lang",
    valid_values: ["ar", "en"],
  },
];

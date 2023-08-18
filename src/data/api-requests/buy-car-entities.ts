import { EntityInteface } from "../../types";

export const entities: EntityInteface[] = [
  {
    description: "what is the car brand in english ?",
    type: "string",
    var_name: "car_brand",
  },
  {
    description: "what is the car model in english ?",
    type: "string",
    var_name: "car_model",
  },
  {
    description: "what is the car year from ?",
    type: "integer",
    var_name: "car_year_from",
  },
  {
    description: "what is the car year to ?",
    type: "integer",
    var_name: "car_year_to",
  },
  {
    description: "what is the car body type ?",
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
    description: "what is the car price from ?",
    type: "integer",
    var_name: "car_price_from",
  },
  {
    description: "what is the car price to ?",
    type: "integer",
    var_name: "car_price_to",
  },
  {
    description: "what is the car regional specs ?",
    type: "string",
    var_name: "car_regional_specs",
  },
  {
    description: "what is the car transmission ?",
    type: "array[string]",
    var_name: "car_transmission",
    valid_values: ["automatic", "manual"],
  },
  {
    description: "what is the car fuel ?",
    type: "array[string]",
    var_name: "car_fuel",
    valid_values: ["gasoline", "diesel", "electric", "hybrid"],
  },
  {
    description: "what is the car color ?",
    type: "string",
    var_name: "car_color",
  },
  {
    description: "what is the car interior options ?",
    type: "string",
    var_name: "car_interior_options",
  },
  {
    description: "what is the car condition ?",
    type: "string",
    var_name: "car_condition",
  },
  {
    description: "what is the car used kilometers ?",
    type: "string",
    var_name: "car_used_kilometers",
  },
  {
    description: "what is the car paint condition ?",
    type: "string",
    var_name: "car_paint_condition",
  },
  {
    description: "what is the car body condition ?",
    type: "string",
    var_name: "car_body_condition",
  },
  {
    description: "what is the car license status ?",
    type: "string",
    var_name: "car_license_status",
  },
  {
    description: "what is the car insurance status ?",
    type: "string",
    var_name: "car_insurance_status",
  },
  {
    description: "what is the car payment method ?",
    type: "string",
    var_name: "car_payment_method",
  },
  {
    description: "what is the car manifacture country ?",
    type: "string",
    var_name: "car_manifacture_country",
  },
  {
    description: "what is the car listing city ?",
    type: "string",
    var_name: "car_listing_city",
  },
  {
    description: "what is the car listing region ?",
    type: "string",
    var_name: "car_listing_region",
  },
];

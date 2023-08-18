import { carsFuelType } from "../constants/fuel";
import { carsBrandType } from "../constants/cars-brands";
interface BuyCarInterface {
  car_brand: carsBrandType | string | null;
  car_model: string | null;
  car_year_from: number | null;
  car_year_to: number | null;
  car_body_type: string | null;
  car_price_from: number | null;
  car_price_to: number | null;
  car_regional_specs: string | null;
  car_transmission: "automatic" | "manual" | string | null;
  car_fuel: carsFuelType | string | null;
  car_color: string | null;
  car_interior_options: string | null;
  car_condition: string | null;
  car_used_kilometers: string | null;
  car_paint_condition: string | null;
  car_body_condition: string | null;
  car_license_status: string | null;
  car_insurance_status: string | null;
  car_payment_method: string | null;
  car_manifacture_country: string | null;
  car_listing_city: string | null;
  car_listing_region: string | null;
}

export const formToFill = {
  car_brand: null,
  car_model: null,
  car_year_from: null,
  car_year_to: null,
  car_type: null,
  car_price_from: null,
  car_price_to: null,
  car_regional_specs: null,
  car_transmission: null,
  car_fuel: null,
  car_color: null,
  car_interior_options: null,
  car_condition: null,
  car_used_kilometers: null,
  car_paint_condition: null,
  car_body_condition: null,
  car_license_status: null,
  car_insurance_status: null,
  car_payment_method: null,
  car_manifacture_country: null,
  car_listing_city: null,
  car_listing_region: null,
};

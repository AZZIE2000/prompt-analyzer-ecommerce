import similarity from "similarity";
import { ExtractionService } from "../helpers/textraction.api";
import { getAction, getCategory } from "./../helpers/search.helpers";
import {
  colorsWithIds,
  CarsBrandWithIds,
  transmitionWithIds,
  conditionsWithIds,
  paymentMethodsWitIds,
} from "../data/constants/cars";
abstract class Builder {
  constructor(protected text: string) {}
  protected abstract preparePrompt(): void; // STEP 1
  protected abstract getForm(): Promise<void>; // STEP 2
  protected abstract fillForm(): Promise<void>; // STEP 3
  protected abstract generateURL(): any; // STEP 4
  public async build(): Promise<any> {
    this.preparePrompt();
    await this.getForm();
    await this.fillForm();
    return this.generateURL();
  }
}

// TODO : need to add form interface

export class FormBuilder extends Builder {
  preparePrompt(): void {
    this.text = this.text;
  }
  protected form = {} as Record<string, any>;

  private async getActions(): Promise<void> {
    const actions = await getAction(this.text);
    this.form.action = actions[0]; // FIXME : for now use the first one , when the UI is ready as the user to choose one
  }

  private async getCategories(): Promise<void> {
    const categories = await getCategory(this.text);
    this.form.category = categories[0]; // FIXME : for now use the first one , when the UI is ready as the user to choose one
  }

  async getForm(): Promise<void> {
    await this.getActions();
    await this.getCategories();
    const action = this.form.action;
    const category = this.form.category;
    const { formToFill } = require(`../data/forms/${action}-${category}`);
    if (formToFill) {
      this.form = { ...this.form, ...formToFill };
    }
  }

  async fillForm(): Promise<void> {
    // TODO fill from the url
    const formToFill = { ...this.form }; // Create a copy of the form object
    const formEntries = Object.entries(formToFill);
    const nullValueEntries = formEntries.filter(
      ([key, value]) => value === null
    );

    const entitiesPath = `../data/api-requests/${this.form.action}-${this.form.category}-entities`;

    const { entities } = require(entitiesPath);

    console.log("🔴🔴🔴🔴 lllll");
    console.log(entities.length);
    console.log("🔴🔴🔴🔴 lllll");
    let lastSlicedIndex = 0;
    const batchSize = 12;

    while (lastSlicedIndex * batchSize < nullValueEntries.length) {
      const startIdx = lastSlicedIndex * batchSize;
      const endIdx = Math.min(startIdx + batchSize, nullValueEntries.length);

      const slicedFormEntities = nullValueEntries.slice(startIdx, endIdx);
      const fieldsToFill = Object.fromEntries(slicedFormEntities);

      const entitiesToFill = Object.keys(fieldsToFill).map((key) => {
        const entity = entities.find((entity) => entity.var_name === key);
        return entity;
      });

      const getAnswer = await ExtractionService<{ [key: string]: any }>(
        this.text,
        entitiesToFill.filter((entity) => entity)
      );
      console.log("🔴🔴🔴🔴");

      console.log(getAnswer);

      // Process the response and fill the form
      // for (const [key, value] of Object.entries(getAnswer)) {
      //   formToFill[key] = value;
      // }
      this.form = { ...this.form, ...getAnswer };

      lastSlicedIndex++;
    }

    // Now the form is filled, you can use the filled formToFill for your further operations
  }

  generateURL(): any {
    const URL = new GenerateCarsUrl(this.form).getURL();
    console.log("generateURL");
    console.log(URL);

    return URL;
  }
}

class CarMethods {
  protected langFun = (lang: string) => {
    //FIXME : return lang === "ar" ? "ar/" : "en/";
    return "en/";
  };
  protected getCarAction = (action: string) => {
    switch (action) {
      case "buy":
        return "cars/cars-for-sale/";
      case "rent":
        return "cars/cars-for-rent/";
      default:
        return "";
    }
  };
  protected getCarBrands = (brands: string[]) => {
    if (!brands && brands.length === 0) return "";
    let brand = "&Brand=";
    let brandsFound = [];
    let idsFound = [];
    const brandsNames = Object.keys(CarsBrandWithIds);
    brands.forEach((brandName) => {
      const brandFound = brandsNames.find(
        (brand) => similarity(brand, brandName) > 0.7
      );
      if (brandFound) brandsFound.push(brandFound);
    });
    brandsFound.forEach((brandName) => {
      idsFound.push(CarsBrandWithIds[brandName]);
    });
    return (brand += idsFound.join(","));
  };

  protected getCarManufactureYear = (from: number, to: number) => {
    if (from && to) {
      return `&Car_Year_from=${from}&Car_Year_to=${to}`;
    } else {
      const year = from ?? to;
      if (!year) return "";
      return `&Car_Year_from=${year}&Car_Year_to=${year}`;
    }
  };

  protected getPriceRange = (from: number, to: number) => {
    if (from || to) {
      // FIXME : this needs to be fixed based on the location
      let base = `&price_currency=10`;
      if (from && to) {
        return base + `&priceFrom=${from}&priceTo=${to}`;
      } else {
        const price = from ?? to;
        if (!price) return "";
        return base + `&priceFrom=${price}&priceTo=${price}`;
      }
    } else {
      return "";
    }
  };

  protected getColor = (colors: string[]) => {
    if (!colors || colors.length === 0) return "";

    const colorIdsMap = {};
    const colorsNames = Object.keys(colorsWithIds);

    colorsNames.forEach((colorName) => {
      colorIdsMap[colorName] = colorsWithIds[colorName];
    });

    const colorsFound = [];
    colors.forEach((colorToFind) => {
      const similarColor = colorsNames.find(
        (colorName) => similarity(colorToFind, colorName) > 0.7
      );
      if (similarColor) colorsFound.push(similarColor);
    });

    const idsFound = colorsFound.map((colorName) => colorIdsMap[colorName]);
    return "&Car_Color=" + idsFound.join(",");
  };
  protected getCarTransmission = (transmission: string[]) => {
    if (!transmission || transmission.length === 2) return "";
    const id = transmitionWithIds[transmission[0]];
    if (!id) return "";
    return `&Tramsmission_Cars=${id}`;
  };

  protected getCarCondition = (condition: string[]) => {
    if (!condition || condition.length === 2) return "";
    const id = conditionsWithIds[condition[0]];
    if (!id) return "";
    return `&ConditionUsed=${id}`;
  };
  protected getCarPaymentMethod = (paymentMethod: string[]) => {
    if (!paymentMethod || paymentMethod.length === 3) return "";
    const id = paymentMethodsWitIds[paymentMethod[0]];
    if (!id) return "";
    return `&Payment_Method=${id}`;
  };
}

class GenerateCarsUrl extends CarMethods {
  constructor(
    private form: Record<string | "action" | "category" | "lang", any>
  ) {
    super();
  }
  protected filterdLink = "";
  private baseLink = "https://jo.opensooq.com/";

  private generateURL(): any {
    // TODO : rewrite this in const url = new CarMethods().getCarAction(this.form.action).getEtc(...).geturl()
    this.baseLink += this.langFun(this.form.lang);
    this.baseLink +=
      this.form.car_listing_city
        .toLowerCase()
        .replace("'", "-")
        .replace("al-", "") + "/";
    this.baseLink += this.getCarAction(this.form.action);
    if (this.form.car_brand && this.form.car_brand.length === 1) {
      this.baseLink += this.form.car_brand[0].toLowerCase() + "/";
      this.baseLink +=
        this.form.car_model.toLowerCase() === "cephia"
          ? "sephia"
          : this.form.car_model.toLowerCase();
    }
    this.baseLink += "?search=true";
    if (this.form.car_brand && this.form.car_brand.length > 1)
      this.baseLink += this.getCarBrands(this.form.car_brand);
    this.baseLink += this.getCarManufactureYear(
      this.form.car_year_from,
      this.form.car_year_to
    );
    this.baseLink += this.getPriceRange(
      this.form.car_price_from,
      this.form.car_price_to
    );
    this.baseLink += this.getColor(this.form.car_color);
    this.baseLink += this.getCarTransmission(this.form.car_transmission);
    this.baseLink += this.getCarCondition(this.form.car_condition);
    this.baseLink += this.getCarPaymentMethod(this.form.car_payment_method);

    console.log("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
    console.log(this.baseLink);
    console.log("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
  }
  public getURL(): any {
    this.generateURL();
    return this.baseLink;
  }
}

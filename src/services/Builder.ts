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
import { jordanCities } from "../data/constants/base";
let savedConvData = {};
abstract class Builder {
  constructor(protected text: string, protected convId: string) {}
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
    console.log("1 💜💜 preparePrompt");
    this.text = this.text;
    const savedForm = savedConvData[this.convId];

    if (savedForm) {
      this.form = savedForm;
    }
  }
  protected form = {} as Record<string, any>;
  private saveFormConv(): void {
    savedConvData[this.convId] = this.form;
  }
  private async getActions(): Promise<void> {
    console.log("2.1 💜💜 getActions");

    // const actions = await getAction(this.text);
    // console.log(actions);

    // this.form.action = actions.action[0] || "buy";
    // this.form.category = actions.category[0] || "cars";
    this.form.action = "buy";
    this.form.category = "car";
  }

  async getForm(): Promise<void> {
    console.log("2 💜💜 getForm");

    console.log("this.form");
    console.log(this.form);
    console.log("this.form");

    if (Object.keys(this.form).length > 0) return;

    await this.getActions();

    const action = this.form.action;
    const category = this.form.category;
    const { formToFill } = require(`../data/forms/${action}-${category}`);
    if (formToFill) {
      this.form = { ...this.form, ...formToFill };
    }
  }

  async fillForm(): Promise<void> {
    const entitiesPath = `../data/api-requests/${this.form.action}-${this.form.category}-entities`;
    const { entities } = require(entitiesPath);

    const batchSize = 12;
    const formToFill = { ...this.form };
    let lastSlicedIndex = 0;
    let responseData = {};

    while (true) {
      // Infinite loop to keep asking about all fields
      const startIdx = lastSlicedIndex * batchSize;
      const endIdx = Math.min(
        startIdx + batchSize,
        Object.keys(formToFill).length
      );

      const slicedFormEntities = Object.entries(formToFill).slice(
        startIdx,
        endIdx
      );
      const fieldsToFill = Object.fromEntries(slicedFormEntities);

      const entitiesToFill = Object.keys(fieldsToFill).map((key) => {
        const entity = entities.find((entity) => entity.var_name === key);
        return entity;
      });

      const getAnswer = await ExtractionService<{ [key: string]: any }>(
        this.text,
        entitiesToFill.filter((entity) => entity)
      );

      console.log("getAnswer", lastSlicedIndex);
      console.log(getAnswer);
      console.log("getAnswer", lastSlicedIndex);

      responseData = { ...responseData, ...getAnswer };

      lastSlicedIndex++;

      // Exit the loop if all fields have been filled
      if (
        startIdx + slicedFormEntities.length >=
        Object.keys(formToFill).length
      ) {
        break;
      }
    }

    console.log("🟢🟢🟢🟢 this.form");
    console.log(this.form);

    console.log("🟢🟢🟢🟢 responseData");
    console.log(responseData);
    this.form = { ...this.form, ...responseData };
    // for (let key of Object.keys(responseData)) {
    //   const existingValue = this.form[key];
    //   const newIncomingValue = responseData[key];

    //   if (
    //     Array.isArray(existingValue) &&
    //     newIncomingValue &&
    //     Array.isArray(newIncomingValue)
    //   ) {
    //     // If the existing value is an array, append the new value(s)
    //     this.form[key] = existingValue.concat(newIncomingValue);
    //   } else if (
    //     newIncomingValue &&
    //     newIncomingValue !== "null" &&
    //     newIncomingValue !== "unknown"
    //   ) {
    //     this.form[key] = responseData[key];
    //   }
    // }

    console.log("🟢🟢🟢🟢 this.form");
    console.log(this.form);
  }

  generateURL(): any {
    this.saveFormConv();
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
    if (!paymentMethod || paymentMethod.length >= 2) return "";
    const id1 = paymentMethodsWitIds[paymentMethod[0]];
    const id2 = paymentMethodsWitIds[paymentMethod[1]];
    if (!id1 && !id2) return "";
    return `&Payment_Method=${id1}${id2 ? "," + id2 : ""}`;
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
    if (
      this.form.car_listing_city &&
      jordanCities.includes(this.form.car_listing_city.toLowerCase())
    ) {
      this.baseLink +=
        this.form.car_listing_city
          .toLowerCase()
          .replace("'", "-")
          .replace("al-", "") + "/";
    }
    this.baseLink += this.getCarAction(this.form.action);
    if (this.form.car_brand && this.form.car_brand.length === 1) {
      this.baseLink += this.form.car_brand[0].toLowerCase() + "/";
      if (this.form.car_model) {
        this.baseLink +=
          this.form.car_model.toLowerCase() === "cephia"
            ? "sephia"
            : this.form.car_model.toLowerCase();
      }
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

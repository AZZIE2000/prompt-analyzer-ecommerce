import { ExtractionService } from "../helpers/textraction.api";
import { entities } from "./../data/api-requests/buy-car-entities";
import { getAction, getCategory } from "./../helpers/search.helpers";
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
    let formToFill = this.form;
    let formArr = Object.entries(formToFill);
    const filteredValues = formArr.filter(([key, value]) => value === null);
    formToFill = Object.fromEntries(filteredValues);

    // while (Object.keys(formToFill).length > 0) {
    const maxSlice =
      Object.keys(formToFill).length > 12 ? 12 : Object.keys(formToFill).length;
    const silcedFormEntities = Object.entries(formToFill).slice(0, maxSlice);
    const fieldsToFill = Object.fromEntries(silcedFormEntities);
    // get the entities
    const {
      entities,
    } = require(`../data/api-requests/${this.form.action}-${this.form.category}-entities`);
    // map the to the entities for the api call
    console.log("entities", entities);

    const entitiesToFill = Object.keys(fieldsToFill).map((key) => {
      const entity = entities.find((entity) => entity.var_name === key);
      return entity;
    });
    console.log("entitiesToFill number", entitiesToFill.length);

    const getAswer = await ExtractionService<{ [key: string]: any }>(
      this.text,
      entitiesToFill
    );

    // break;
    // get the response
    // fill the form
    // remove the filled form from the formToFill
    // repeat
    // }
  }

  generateURL(): any {
    return this.form;
  }
}

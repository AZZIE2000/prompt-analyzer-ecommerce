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
    console.log("this.form: =>");
    console.log(this.form);
  }

  async fillForm(): Promise<void> {}
  
  generateURL(): any {
    return this.form;
  }
}

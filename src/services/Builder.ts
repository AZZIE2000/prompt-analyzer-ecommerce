import { getAction, getCategory } from "./../helpers/search.helpers";
abstract class Builder {
  constructor(protected text: string) {}
  protected abstract preparePrompt(): void;
  protected abstract getForm(): void;
  protected abstract fillForm(): void;
  public build(): any {
    this.preparePrompt();
    this.getForm();
    this.fillForm();
    return this.generateURL();
  }
  protected abstract generateURL(): any;
}

// TODO : need to add form interface

export class FormBuilder extends Builder {
  preparePrompt(): void {
    this.text = this.text;
  }
  protected form = {} as Record<string, any>;

  private async getActions(): Promise<void> {
    this.form.action = await getAction(this.text);
  }

  private async getCategories(): Promise<void> {
    this.form.category = await getCategory(this.text);
  }

  async getForm(): Promise<void> {
    await this.getActions();
    await this.getCategories();
    const action = this.form.action[0];
    const category = this.form.category[0];
    // const formToFill = require(`../data/forms/but-car.ts`);
    const formToFill = require(`../data/forms/${action}-${category}`);
    console.log(formToFill);

    if (formToFill) {
      this.form = { ...this.form, ...formToFill };
    }
  }
  fillForm(): void {}
  generateURL(): any {}
}

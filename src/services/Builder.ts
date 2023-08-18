abstract class Builder {
  constructor(protected text: string) {}
  protected abstract preparePrompt(): void;
  protected abstract fillJSON(): void;
  public build(): any {
    this.preparePrompt();
    this.fillJSON();
    return this.generateURL();
  }
  protected abstract generateURL(): any;
}

abstract class CarsBuilder extends Builder {
  preparePrompt(): void {
    this.text = this.text;
  }
  protected fillJSON(): void {
    this.text = "cars";
  }
}

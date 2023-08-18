abstract class Builder {
  constructor(protected text: string) {}
  protected abstract preparePrompt(): void;
  protected abstract fst(): void;
  protected abstract filterBuild(): void;
  public build(): any {}
}

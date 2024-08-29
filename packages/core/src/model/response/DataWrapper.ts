export abstract class DataWrapper {
  static className = 'DataWrapper'

  public abstract getData(dto: any): any;

  public abstract getClassName(): string;
}

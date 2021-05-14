
/**
 * A simple class that can be used to define a key/value pair of objects.
 */
export class KeyValuePair<T, U> {
  public key: T;
  public value: U | any; /** TODO should be undefiend but it foes not seem to work */

  constructor(key: T, value?: U) {
    this.key = key;
    this.value = value;
  }
}

export class EnumUtils {

  /** Returns an array of names in an enum */
  static getEnumNames(e: any): string[] {
    return this.getObjectValues(e).filter(v => typeof v === 'string') as string[];
  }

  static getEnumValues(e: any): number[] {
    return this.getObjectValues(e).filter(v => typeof v === 'number') as number[];
  }

  private static getObjectValues(e: any): (number | string)[] {
    return Object.keys(e).map(k => e[k]);
  }
}

export class InstanceLoader {
  static getInstance<T>(context: any,
    className: string, ...args: any[]): T {
    const instance: any = Object.create(context[className].prototype);
    instance.constructor.apply(instance, args);
    return instance as T;
  }
}

export function assertExists<A>(value: A | null | undefined): A {
  if (!value) {
    throw new Error(' doesnt exist');
  } else {
    return value;
  }
}

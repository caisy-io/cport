import { Maybe } from "../types/util";

/**
 * Converts a Maybe<T> to T with a default value
 */
export function maybeToValue<T>(value: Maybe<T>, defaultValue: T): T {
  return value ?? defaultValue;
}

/**
 * Converts a Maybe<string> to string with empty string default
 */
export function maybeToString(value: Maybe<string>): string {
  return value ?? "";
}

/**
 * Converts a Maybe<string> to string, throwing if null/undefined
 */
export function requireString(value: Maybe<string>, fieldName: string): string {
  if (value == null) {
    throw new Error(`Required field '${fieldName}' is null or undefined`);
  }
  return value;
}

/**
 * Safely converts Maybe<T> to T | undefined (removes null)
 */
export function maybeToOptional<T>(value: Maybe<T>): T | undefined {
  return value ?? undefined;
}

/**
 * Type guard to check if a Maybe value is defined
 */
export function isDefined<T>(value: Maybe<T>): value is T {
  return value != null;
}

/**
 * Filters out null/undefined values from an array
 */
export function filterDefined<T>(array: Maybe<T>[]): T[] {
  return array.filter(isDefined);
}

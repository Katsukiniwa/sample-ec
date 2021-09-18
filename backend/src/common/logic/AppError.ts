/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Result } from "./Result";
import { UseCaseError } from "./UseCaseError";

export class UnexpectedError extends Result<UseCaseError> {
  public constructor (err: any) {
    super(false, {
      message: `An unexpected error occurred.`,
      error: err
    } as UseCaseError)
    console.error(err);
  }

  public static create (error: any): UnexpectedError {
    return new UnexpectedError(error);
  }
}

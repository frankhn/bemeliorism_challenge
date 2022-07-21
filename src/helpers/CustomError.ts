export class CustomError extends Error {
  public status;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }
}

export class ApplicationError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// const e = new ApplicationError(200, "Good Evening");
// if (e instanceof Error) {
// }
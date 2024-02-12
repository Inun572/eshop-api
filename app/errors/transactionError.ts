class TransactionError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}

export default TransactionError;

class InvalidRequest extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.status = "fail";
    this.message = message;
  }
}

export default InvalidRequest;

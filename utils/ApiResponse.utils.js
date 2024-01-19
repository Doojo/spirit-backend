class ApiResponse {
    constructor(
        statusCode,
        message = "Something went wrong",
        data = [],
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.succes = statusCode < 400;
    }
}

export { ApiResponse };
class ApiResponse {
    constructor(
        statusCode,
        data = [],
        message = "Something went wrong",
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse };
export const errorHandler = (statusCode: any, message: string) => {

    const error = new Error();

    // error.statusCode = statusCode
    error.message = message
    return error
}
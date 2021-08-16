export default class ResponseFormat {
    static createResponse(data: object, success = true) {
        return {
            success,
            ...data,
        };
    }
}

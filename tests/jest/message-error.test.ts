import { MessageException } from "../../src/index";

describe("MessageError", () => {
    test("InstanceMessage Error", () => {
        const exception = new MessageException("anything");
        expect(exception).toBeInstanceOf(MessageException);
        expect(exception.message).toStrictEqual("anything");
        expect(exception.request).toBeUndefined();
        expect(exception.response).toBeUndefined();
        expect(exception.code).toBeUndefined();
    });

    test("Test Fake Request", () => {
        const requestData = { url: "http://localhost" };
        const responseData = {
            status: 200,
            data: "response data",
            headers: { },
            request: requestData,
        };
        const exception = new MessageException(
            "anything1",
            undefined,
            undefined,
            requestData,
            responseData,
        );
        expect(exception).toBeInstanceOf(MessageException);
        expect(exception.message).toStrictEqual("anything1");
        expect(exception.request?.url).toStrictEqual("http://localhost");
        expect(exception.response?.status).toStrictEqual(200);
        expect(exception.response?.data).toStrictEqual("response data");
    });
});

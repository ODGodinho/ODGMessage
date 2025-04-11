import { ODGMessage, MessageException, MessageUnknownException } from "../../src/index";

describe.each([
    MessageUnknownException,
    MessageException,
])("MessageError", (MyException) => {
    test("InstanceMessage Error", () => {
        const exception = new MyException("anything");
        expect(exception).toBeInstanceOf(MyException);
        expect(exception.message).toStrictEqual("anything");
        expect(exception.request).toBeUndefined();
        expect(exception.response).toBeUndefined();
        expect(exception.code).toBeUndefined();
        expect(exception.getMessage()).toBeUndefined();
    });

    test("Test Fake Request", () => {
        const requestData = { url: "http://localhost" };
        const responseData = {
            status: 200,
            data: "response data",
            headers: {},
            request: requestData,
        };
        const exception = new MyException(
            "anything1",
            undefined,
            undefined,
            requestData,
            responseData,
        );
        expect(exception).toBeInstanceOf(MyException);
        expect(exception.message).toStrictEqual("anything1");
        expect(exception.request?.url).toStrictEqual("http://localhost");
        expect(exception.response?.status).toStrictEqual(200);
        expect(exception.response?.data).toStrictEqual("response data");
        expect(exception.getMessage()).toBeDefined();
    });

    test("Is Message Error test", () => {
        expect(ODGMessage.isMessageError(null)).toBeFalsy();
        expect(ODGMessage.isMessageError(new MessageException("anything"))).toBeTruthy();
        expect(ODGMessage.isMessageError(new MessageUnknownException("anything"))).toBeTruthy();

        const error1 = new Error("example");
        error1.name = "MessageException";
        expect(ODGMessage.isMessageError(error1)).toBeTruthy();

        const error2 = new Error("example");
        error2.name = "MessageUnknownException";
        expect(ODGMessage.isMessageError(error2)).toBeTruthy();
    });
});

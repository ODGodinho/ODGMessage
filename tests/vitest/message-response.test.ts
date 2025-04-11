import { MessageResponse, Methods } from "../../src";

describe("Teste MessageResponse class", () => {
    test("Teste Instance", () => {
        const message = new MessageResponse({}, { data: {}, headers: {}, status: 200 });
        expect(message).toHaveProperty("response.status", 200);
        expect(message).toHaveProperty("status", 200);
    });
    test("Teste Status isOK", () => {
        const message = new MessageResponse({
            validateStatus: (status): boolean => status === 200,
        }, { data: {}, headers: {}, status: 200 });
        expect(message.isOk()).toBeTruthy();
    });
    test("Teste invalid Status isOK", () => {
        const message = new MessageResponse({
            validateStatus: (status): boolean => status === 200,
            method: Methods.GET,
        }, { data: {}, headers: {}, status: 500 });
        expect(message.isOk()).toBeFalsy();
    });
    test("Teste getStatus", () => {
        const message = new MessageResponse({
            method: Methods.GET,
        }, { data: {}, headers: {}, status: 500 });
        expect(message.getStatus()).toBe(500);
    });
    test("Teste getMessage", () => {
        const message = new MessageResponse({
            method: Methods.GET,
        }, { data: {}, headers: {}, status: 500 });
        expect(message.getMessage()).toBe(message);
    });
    test("Teste getBody", () => {
        const message = new MessageResponse({
            method: Methods.GET,
        }, {
            data: {
                "ok": true,
            },
            headers: {},
            status: 500,
        });
        expect(message.getResponseBody()).toHaveProperty("ok", true);
    });

    test("isMessage Response instanceof", () => {
        expect(
            MessageResponse.isMessageResponse(new MessageResponse({}, { data: {}, headers: {}, status: 200 })),
        ).toBeTruthy();
        expect(
            MessageResponse.isMessageResponse({
                ...new MessageResponse({}, { data: {}, headers: {}, status: 200 }),
            }),
        ).toBeTruthy();
        expect(
            MessageResponse.isMessageResponse(null),
        ).toBeFalsy();
    });
});

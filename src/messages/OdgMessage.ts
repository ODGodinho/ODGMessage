import { MessageException } from "./MessageException";
import { MessageResponse } from "./MessageResponse";
import { MessageUnknownException } from "./MessageUnknownException";

export abstract class ODGMessage {

    public static isMessageResponse(
        message: unknown,
    ): message is MessageResponse {
        if (!message) return false;

        if (message instanceof MessageResponse) return true;

        const isMessageResponseField = "IS_ODG_MESSAGE_RESPONSE";

        return typeof message === "object"
            && isMessageResponseField in message
            && "request" in message
            && "response" in message
            && !!message[isMessageResponseField];
    }

    public static isMessageError(
        message: unknown,
    ): message is MessageException<unknown> | MessageUnknownException<unknown> {
        if (!message) return false;

        // eslint-disable-next-line no-restricted-syntax
        const isError = message instanceof Error;

        const isMessageUnknownException = isError && message.name.endsWith("MessageUnknownException");
        const isMessageException = isError && message.name.endsWith("MessageException");

        return message instanceof MessageUnknownException
            || message instanceof MessageException
            || isMessageUnknownException
            || isMessageException;
    }

    public static isMessage(
        message: unknown,
    ): message is MessageException<unknown> | MessageResponse | MessageUnknownException<unknown> {
        return ODGMessage.isMessageError(message)
            || ODGMessage.isMessageResponse(message);
    }

}

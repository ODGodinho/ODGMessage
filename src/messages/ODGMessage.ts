import { MessageException } from "./MessageException";
import { MessageUnknownException } from "./MessageUnknownException";

export abstract class ODGMessage {

    public static isMessageError(
        message: unknown,
    ): message is MessageException<unknown> | MessageUnknownException<unknown> {
        if (!message) return false;

        const isMessageUnknownException = message instanceof Error && message.name.endsWith("MessageUnknownException");
        const isMessageException = message instanceof Error && message.name.endsWith("MessageException");

        return message instanceof MessageUnknownException
            || message instanceof MessageException
            || isMessageUnknownException
            || isMessageException;
    }

}

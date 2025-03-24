import { type MessageInterface } from "../interfaces/MessageInterface";

import { MessageException } from "./MessageException";
import { MessageUnknownException } from "./MessageUnknownException";

export abstract class ODGMessage {

    public static isMessageError(message: unknown): message is MessageInterface {
        if (!message) return false;

        const isMessageUnknownException = message instanceof Error && message.name === "MessageUnknownException";
        const isMessageException = message instanceof Error && message.name === "MessageException";

        return message instanceof MessageUnknownException
            || message instanceof MessageException
            || isMessageUnknownException
            || isMessageException;
    }

}

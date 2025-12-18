import React, { useState, useEffect } from 'react';
import { getConversationMessagesRequest } from '../api/chat';
import { IMessage } from 'react-native-gifted-chat';
import { GetMessagesPayload } from './types';

interface WithMessagesProps {
    conversationId: string;
}

export const withMessages = <P extends object>(
    WrappedComponent: React.ComponentType<P & WithMessagesProps>
) => {
    return (props: P & WithMessagesProps) => {
        const [messages, setMessages] = useState<IMessage[]>([]);
        const [page, setPage] = useState<number>(1);
        const [loading, setLoading] = useState<boolean>(false);
        const [allDataLoaded, setAllDataLoaded] = useState<boolean>(false);

        useEffect(() => {
            const getMessages = () => {
                if (loading || allDataLoaded) return;

                setLoading(true);

                const payload: GetMessagesPayload = {
                    convId: props.conversationId,
                    page: page,
                };

                getConversationMessagesRequest(payload, (res: IMessage[]) => {
                    setLoading(false);
                    if (res.length === 0) {
                        setAllDataLoaded(true);
                    } else {
                        setMessages((prev) => [...prev, ...res]);
                    }
                });
            };

            getMessages();
        }, [page]);

        return (
            <WrappedComponent
                {...props}
                messages={messages}
                setMessages={setMessages}
                setPage={setPage}
                loading={loading}
                allDataLoaded={allDataLoaded}
            />
        );
    };
};

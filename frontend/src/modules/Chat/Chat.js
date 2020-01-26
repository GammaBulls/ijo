import React from "react";
import DefaultLayout from "../shared/layouts/DefaultLayout";
import {
  ContentSection,
  Header,
  Title,
  Description,
  Conversations,
} from "./Chat.components";
import useGetConversations from "../../services/Chat/useGetConversations";
import Conversation from "./Conversation";
import useAuthorizedOnly from "../../common/helpers/useAuthorizedOnly";

const Chat = () => {
  useAuthorizedOnly();
  const { data } = useGetConversations();

  const hasMessages = !!(data && data.length);

  return (
    <DefaultLayout>
      <ContentSection>
        <Header>
          <Title>Wiadomości</Title>
          <Description>Konwersacje z użytkownikami portalu</Description>
        </Header>
        <Conversations>
          {hasMessages &&
            data.map((conversationData, i) => (
              <Conversation key={i} data={conversationData} />
            ))}
          {!hasMessages && "Brak wiadomości"}
        </Conversations>
      </ContentSection>
    </DefaultLayout>
  );
};

export default Chat;

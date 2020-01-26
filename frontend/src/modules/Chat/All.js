import React from "react";
import useGetConversations from "../../services/Chat/useGetConversations";
import { Conversations, Description, Header, Title } from "./Chat.components";
import Conversation from "./Conversation";

const All = () => {
  const { data } = useGetConversations();

  const hasMessages = !!(data && data.length);

  return (
    <>
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
    </>
  );
};

export default All;

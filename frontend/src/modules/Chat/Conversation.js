import React, { useMemo } from "react";
import { useAppContext } from "../App/AppContext";
import { Wrapper, ChatBubble, Name } from "./Conversation.components";

const Conversation = ({ data }) => {
  const { userInfo } = useAppContext();
  //"id", "person_a", "person_b"
  const otherPerson = useMemo(
    () => [data.person_a, data.person_b].find(id => id !== userInfo.id),
    [data.person_a, data.person_b, userInfo.id],
  );

  return (
    <Wrapper>
      <ChatBubble />
      <Name>{otherPerson}</Name>
    </Wrapper>
  );
};

export default Conversation;

import React, { useMemo, useEffect } from "react";
import { useAppContext } from "../App/AppContext";
import { Wrapper, ChatBubble, Name } from "./Conversation.components";
import useGetAuthor from "../../services/Ads/useGetAuthor";
import { generatePath } from "react-router";
import { routesPaths } from "../Routing/routesPaths";

const Conversation = ({ data }) => {
  const { userInfo } = useAppContext();
  //"id", "person_a", "person_b"
  const otherPerson = useMemo(
    () => [data.person_a, data.person_b].find(id => id !== userInfo.id),
    [data.person_a, data.person_b, userInfo.id],
  );

  const [getAuthor, { data: userData }] = useGetAuthor();

  useEffect(() => {
    getAuthor({ id: otherPerson });
  }, [getAuthor, otherPerson]);

  return (
    <Wrapper>
      <ChatBubble />
      <Name
        to={generatePath(routesPaths.CHAT, { conversationId: otherPerson })}
      >
        {userData && userData.name}
      </Name>
    </Wrapper>
  );
};

export default Conversation;

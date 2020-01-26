import React from "react";
import { useParams } from "react-router";
import useAuthorizedOnly from "../../common/helpers/useAuthorizedOnly";
import DefaultLayout from "../shared/layouts/DefaultLayout";
import All from "./All";
import { ContentSection } from "./Chat.components";
import SingleConversation from "./SingleConversation";

const Chat = () => {
  const unauth = useAuthorizedOnly();
  const { conversationId } = useParams();

  if (unauth) {
    return null;
  }

  return (
    <DefaultLayout>
      <ContentSection>
        {!conversationId && <All />}
        {conversationId && <SingleConversation />}
      </ContentSection>
    </DefaultLayout>
  );
};

export default Chat;

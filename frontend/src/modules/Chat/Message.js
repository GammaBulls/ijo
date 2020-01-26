import React from "react";
import { formatDistanceToNow, addHours } from "date-fns";
import { pl } from "date-fns/locale";
import { Wrapper, MessageText, Date as Datez } from "./Message.components";

const Message = ({ data }) => {
  const formattedDate = formatDistanceToNow(
    addHours(new Date(data.message_date), 1),
    {
      locale: pl,
      addSuffix: true,
    },
  );

  return (
    <Wrapper direction={data.direction}>
      <MessageText>{data.message_text}</MessageText>
      <Datez>{formattedDate}</Datez>
    </Wrapper>
  );
};

export default Message;

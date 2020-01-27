import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import styled from "styled-components";
import useInputState from "../../common/helpers/useInputState";
import useGetConv from "../../services/Chat/useGetConv";
import useSendMsg from "../../services/Chat/useSendMsg";
import Button from "../shared/components/Button";
import Input from "../shared/components/Input";
import Message from "./Message";

const Messages = styled.div`
  display: flex;
  flex-direction: column-reverse;

  flex-grow: 1;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  ${Input} {
    width: 100%;
    margin-right: 20px;
  }
`;

const SingleConversation = () => {
  const { conversationId } = useParams();
  //"id", "person_a", "person_b"
  const [getMessages, { data: conversationData }] = useGetConv();

  const [msg, setMsg] = useInputState();

  const [sendMsg, { loading: sendingMessage }] = useSendMsg();

  const submitHandler = useCallback(async () => {
    if (!msg || !msg.trim()) return;
    try {
      await sendMsg({ convId: conversationId, msg });
      toast.success("Message sent.");
      getMessages({ id: conversationId });
      setMsg({ target: { value: "" } });
    } catch (e) {
      toast.error(e.message);
    }
  }, [conversationId, getMessages, msg, sendMsg, setMsg]);

  useEffect(() => {
    getMessages({ id: conversationId });
  }, [conversationId, getMessages]);

  if (!conversationData) {
    return "Loading...";
  }

  return (
    <>
      <h3>Wiadomości</h3>
      <Messages>
        {!conversationData.length && <h4>Brak wiadomości</h4>}
        {!!conversationData.length && (
          <>
            {conversationData.map((msg, i) => (
              <Message key={i} data={msg} />
            ))}
          </>
        )}
      </Messages>
      <InputBox>
        <Input
          placeholder="Wpisz wiadomość..."
          onChange={setMsg}
          value={msg}
          disabled={sendingMessage}
        />
        <Button onClick={submitHandler} disabled={sendingMessage}>
          Wyślij
        </Button>
      </InputBox>
    </>
  );
};

export default SingleConversation;

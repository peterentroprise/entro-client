import React, { Fragment, useState, useEffect, useRef } from "react";
import { useSubscription, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, List, Button } from "@material-ui/core";
import { Waypoint } from "react-waypoint";

import MessageItem from "./MessageItem";

const useStyles = makeStyles((theme) => ({
  list: {
    height: "60vh",
    overflow: "auto",
  },
}));

const MessageList = ({ latestMessage }) => {
  const classes = useStyles();
  const client = useApolloClient();
  const [state, setState] = useState({
    olderMessagesAvailable: latestMessage ? true : false,
    newMessagesCount: 0,
    error: false,
    messages: [],
  });

  let numMessages = state.messages.length;

  let oldestMessageId = numMessages
    ? state.messages[numMessages - 1].id
    : latestMessage
    ? latestMessage.id + 1
    : 0;

  let newestMessageId = numMessages
    ? state.messages[0].id
    : latestMessage
    ? latestMessage.id
    : 0;

  useEffect(() => {
    loadOlder();
  }, []);

  useEffect(() => {
    if (latestMessage && latestMessage.id > newestMessageId) {
      setState((prevState) => {
        return {
          ...prevState,
          newMessagesCount: prevState.newMessagesCount + 1,
        };
      });
      newestMessageId = latestMessage.id;
      loadNew();
    }
  }, [latestMessage]);

  const loadOlder = async () => {
    const GET_OLD_MESSAGES = gql`
      query getOldMessages($oldestMessageId: Int!) {
        messages(
          where: { id: { _lt: $oldestMessageId } }
          limit: 5
          order_by: { created_at: desc }
        ) {
          id
          body
          created_at
          user {
            name
          }
        }
      }
    `;

    const { error, data } = await client.query({
      query: GET_OLD_MESSAGES,
      variables: { oldestMessageId: oldestMessageId },
    });

    if (data.messages.length) {
      setState((prevState) => {
        return {
          ...prevState,
          messages: [...prevState.messages, ...data.messages],
        };
      });
      oldestMessageId = data.messages[data.messages.length - 1].id;
    } else {
      setState((prevState) => {
        return { ...prevState, olderMessagesAvailable: false };
      });
    }
    if (error) {
      console.error(error);
      setState((prevState) => {
        return { ...prevState, error: true };
      });
    }
  };

  const loadNew = async () => {
    const GET_NEW_MESSAGES = gql`
      query getNewMessages($latestVisibleId: Int) {
        messages(
          where: { id: { _gt: $latestVisibleId } }
          order_by: { created_at: desc }
        ) {
          id
          body
          user {
            name
          }
        }
      }
    `;

    const { error, data } = await client.query({
      query: GET_NEW_MESSAGES,
      variables: {
        latestVisibleId: state.messages.length ? state.messages[0].id : null,
      },
    });

    if (data) {
      setState((prevState) => {
        return {
          ...prevState,
          messages: [...data.messages, ...prevState.messages],
          newMessagesCount: 0,
        };
      });
      newestMessageId = data.messages[0].id;
    }
    if (error) {
      console.error(error);
      setState((prevState) => {
        return { ...prevState, error: true };
      });
    }
  };

  return (
    <div className={classes.list}>
      <Waypoint onEnter={loadOlder} />
      <List className="message-list">
        {state.messages &&
          state.messages
            .map((message, index) => {
              return (
                <MessageItem
                  className="message"
                  key={index}
                  index={index}
                  message={message}
                />
              );
            })
            .reverse()}
      </List>
    </div>
  );
};

const NOTIFY_NEW_MESSAGES = gql`
  subscription notifyNewMessages {
    messages(limit: 1, order_by: { created_at: desc }) {
      id
      created_at
    }
  }
`;

const MessageListSubscription = () => {
  const { loading, error, data } = useSubscription(NOTIFY_NEW_MESSAGES);
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography>Error {JSON.stringify(error)}</Typography>;
  }
  return (
    <MessageList
      latestMessage={data.messages.length ? data.messages[0] : null}
    />
  );
};
export default MessageListSubscription;
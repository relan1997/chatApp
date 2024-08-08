import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { checkOnline, getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";

const ChatContainer = ({ currChat, currUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineChat, setOnlineChat] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      if (currChat) {
        try {
          const response = await axios.post(getAllMessageRoute, {
            from: currUser._id,
            to: currChat._id,
          });
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [currChat, currUser]);

  const handleSendMsg = async (msg) => {
    if (currUser && currChat) {
      socket.current.emit("send-msg", {
        to: currChat._id,
        from: currUser._id,
        message: msg,
      });

      await axios.post(sendMessageRoute, {
        from: currUser._id,
        to: currChat._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-received", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });

      socket.current.on("disconnect", () => {
        // Update the chat status to offline when disconnected
        setOnlineChat(false);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const checkIfOnline = async () => {
      if (currChat) {
        try {
          const response = await axios.post(checkOnline, {
            chat: currChat._id,
          });
          setOnlineChat(response.data.status);
        } catch (error) {
          console.error("Error checking online status:", error);
        }
      }
    };
    checkIfOnline();
  }, [currChat]);

  return (
    <>
      {currChat && currUser && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currChat.username}</h3>
                <span className={`online-status ${onlineChat ? "online" : "offline"}`}>
                  {onlineChat ? "Online" : "Offline"}
                </span>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div ref={scrollRef} key={msg._id}>
                <div className={`message ${msg.fromSelf ? "sended" : "received"}`}>
                  <div className="content">
                    <p>{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        h3 {
          color: white;
        }
        .online-status {
          margin-left: 10px;
          font-size: 0.9rem;
          &.online {
            color: #00ff00;
          }
          &.offline {
            color: #ff0000;
          }
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer;

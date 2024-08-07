import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";

const ChatContainer = ({ currChat, currUser }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (currUser && currChat) {
        console.log(currUser);
        try {
          const response = await axios.post(getAllMessageRoute, {
              from: currUser._id,
              to: currChat._id,
          });
          console.log(response.data);
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
      try {
        //console.log(currUser._id,currChat._id)
        await axios.post(sendMessageRoute, {
          from: currUser._id,
          to: currChat._id,
          message: msg,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

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
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg._id}>
                <div
                  className={`message ${msg.fromSelf ? "sended" : "recieved"}`}
                >
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
  padding-top: 1rem;
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
        h3 {
          color: white;
        }
      }
    }
  }
`;

export default ChatContainer;

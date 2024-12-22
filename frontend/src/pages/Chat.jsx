import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const [currUser, setCurrUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [currChat, setCurrChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (currUser) {
      socket.current = io(host, {
        withCredentials: true,
      });
      socket.current.emit("add-user", currUser._id);
      socket.current.on("connect", () => {
        console.log("Socket connected:", socket.current.id);
      });

      socket.current.on("get-users", (users) => {
        console.log("incoming from the backend:", users);
        setOnlineUsers(users);
      });
    }
  }, [currUser]);

  useEffect(() => {
    console.log("Event Run in frontend");
    if (socket.current) {
      socket.current.on("get-users", (users) => {
        console.log("incoming from the backend:", users);
        setOnlineUsers(users);
      });
    }
  }, []);

  useEffect(() => {
    console.log("Updated onlineUsers:", onlineUsers);
  }, [onlineUsers]);

  // useEffect(() => {
  //     if (socket.current) {
  //       socket.current.on("get-users", (users) => {
  //         console.log("incoming from the backend:",users)
  //         setOnlineUsers(users);
  //       });
  //     }
  //   },[socket]);

  useEffect(() => {
    //console.log("from chat:",socket)
    const helper = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        // socket.current.emit('add-user',currUser._id)
        setIsLoaded(true);
      }
    };
    helper();
  }, [navigate]);

  useEffect(() => {
    const helper = async () => {
      if (currUser) {
        if (currUser.isAvatarImageSet) {
          const { data } = await axios.get(`${allUsersRoute}/${currUser._id}`);
          setContacts(data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    helper();
  }, [currUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currUser={currUser}
            changeChat={handleChatChange}
          />
          {isLoaded && currChat === undefined ? (
            <Welcome currUser={currUser} />
          ) : (
            <ChatContainer
              currChat={currChat}
              currUser={currUser}
              socket={socket}
              status={
                currChat &&
                onlineUsers.some((user) => user.userId === currChat._id)
              }
            />
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;

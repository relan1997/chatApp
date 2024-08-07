import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
const Chat = () => {
  const [currUser, setCurrUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [currChat, setCurrChat] = useState(undefined);
  const [isLoaded,setIsLoaded]=useState(false);
  useEffect(() => {
    const helper = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true)
      }
    };
    helper();
  }, []);

  useEffect(() => {
    const helper = async () => {
      if (currUser) {
        if (currUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    helper();
  }, [currUser]);
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
          {
           isLoaded && currChat===undefined? <Welcome currUser={currUser}/>:<ChatContainer currChat={currChat} currUser={currUser}/>
          }
         
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

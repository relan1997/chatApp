import React, { useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import { io } from "socket.io-client";

const Logout = ({socket}) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    // Log localStorage content
    const localStorageContent = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      localStorageContent[key] = localStorage.getItem(key);
    }
    console.log("Local Storage Content before logout:", localStorageContent);
    if (socket.current) {
        socket.current.disconnect(); // This triggers the backend "disconnect" event
      }
    // Clear localStorage and navigate to login
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default Logout;

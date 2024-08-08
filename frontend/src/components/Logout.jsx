import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';
import styled from 'styled-components';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      socket.emit('disconnect', { userId });
    }
    localStorage.clear();
    navigate('/login');
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

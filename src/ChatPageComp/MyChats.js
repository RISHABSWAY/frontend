import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/chatProvider'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogics.js';
import GroupChatModal from '../config/GroupChatModal.js';


const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const {user, selectedChat, setSelectedChat, chats, setChats} = ChatState();

  const toast = useToast();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }
      const { data } = await axios.get('/api/chat', config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Failed to Load the Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      })
    }
  }
  

  useEffect(()=> {
    setLoggedUser(JSON.parse(localStorage.getItem("user-info")));
    fetchChats();
  },[fetchAgain])
  return (
    <Box
    display={{base: selectedChat ? "none": "flex", md: "flex"}}
    flexDirection='column'
    alignItems='center'
    p={3}
    bg='transparent'
    w={{base: '100%', md: "31%"}}
    borderRadius='lg'
    borderWidth='1px'>
      <Box
      pb={3}
      px={3}
      fontSize={{ base: "28px", md: "30px" }}
      fontFamily="Work sans"
      display="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      >
        My Chats
        <GroupChatModal>
        <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
          </GroupChatModal>
      </Box>
      <Box
      display="flex"
      flexDir="column"
      p={3}
      bg='transparent'
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden">
        {chats ? (
          <Stack overflowY='scroll'>
            {chats.map((chat)=> (
              <Box
              onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupchat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ): (
          <ChatLoading/>
        )}
      </Box>
    </Box>
  )
}

export default MyChats
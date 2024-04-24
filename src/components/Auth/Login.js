import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack , useToast} from '@chakra-ui/react';
import React, { useState } from 'react'
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();


  const handleClick = ()=> setShow(!show);


  const submitHandler = async()=> {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill All the Details",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        {
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      
      // Assuming `data` contains the token
      localStorage.setItem('user-info', JSON.stringify(data));
  
      // Add the token to the Authorization header for subsequent requests
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${data.token}`
        },
      };
  
      // Set the token in axios config for subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      });
  
      setLoading(false);
      navigate('/chat');
    } catch(error) {
      toast({
        title: "Error Occurred",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      });
      setLoading(false);
    }
  };
  
  return (
    <VStack spacing='5px'>
        <FormControl id='email' isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder='Eg:- name@gmail.com'
          onChange={(e)=> setEmail(e.target.value)}
          />
        </FormControl>
        
        <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>



        <Button 
        colorScheme='blue'
        width="100%"
        style={{marginTop: 15}}
        onClick={submitHandler}
        isLoading={loading}>
            Login
        </Button>
        
    </VStack>
)}

export default Login
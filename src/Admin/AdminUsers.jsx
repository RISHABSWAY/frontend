import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/chatProvider.js';
import axios from 'axios';

const AdminUsers = () => {
  const { user } = ChatState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsersData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get('/api/admin/users', config);
        const data = response.data;
        console.log('users', data);
        setUsers(data); // Set the entire data array
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getAllUsersData();
  }, [user.token]); // Include user.token in the dependency array

  return (
    <>
      {users && users.map((curUser, index) => {
        return <h2 key={index}>{curUser.name}</h2>;
      })}
    </>
  );
};

export default AdminUsers;

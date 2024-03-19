'use client'
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const usernameFromQuery = searchParams.get('username') || '';

    // Update the state with the username
    setUsername(usernameFromQuery);
    console.log(usernameFromQuery);
    // Fetch user data from the JSON file
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/getAccounts`);
        const data = await response.json();
        var u;
        data.forEach((user)=>{
          if(user.username === usernameFromQuery){
            u = user
          }
        });
        console.log('Fetched Accounts:', u);
        setUserData(u || {});
        
         // Set the data in state
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className='Profile'>
      <h2>User Profile</h2>
      
          <p>Username: {username}</p>
          <p>Email: {userData.email}</p>
    
      <Link to={'/createMemo?username='+username+''} className='buttonLink'>Create Memo</Link>
      <Link to={'/dashboard?username='+username+''} className='buttonLink'>Dashboard</Link>
      <Link to={'/lens?username='+username+''} className='buttonLink'>Lens</Link>

    </main>
  );
};

export default Profile;

import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './auth0.css';

export function Auth0Component() {
  const [showAuthInput, setShowAuthInput] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const CLIENT_ID = 'dj0yJmk9NDdJQUtNWVJKUE9RJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWU3';

  const requestAuth = async () => {
      await fetch(`https://api.login.yahoo.com/oauth2/request_auth?client_id=${CLIENT_ID}&redirect_uri=oob&response_type=code`)
        .then(data => getToken(data))
        .catch(err => console.error(err))
  }

  const requestAccess = async () => {
    let request = {
        grant_type: 'authorization_code',
        redirect_uri: 'oob',
        code: authCode
    };
    const response = await fetch('/api/authorize', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    window.localStorage.setItem('refreshToken', data.refresh_token);
    window.localStorage.setItem('accessToken', data.access_token);
    console.log(data);
  }

  const getToken = (data: any) => {
    window.open(data.url, '_blank');
    setShowAuthInput(true);
  }

  return (
    <div className="auth">
        {!showAuthInput && <Button variant="contained" onClick={() => requestAuth()}>Authenticate</Button>}
        { showAuthInput &&
          <div>
            <TextField id="standard-basic" label="Code" variant="standard" onChange={(e) => setAuthCode(e.target.value)} />
            <Button variant="contained" onClick={() => requestAccess()}>Authorize</Button>
          </div>
        }
    </div>
  );
}
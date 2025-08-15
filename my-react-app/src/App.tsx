import './App.css'

// App.jsx
import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import S3FileUploader from './S3FileUploader';

function App({ signOut, user }) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {user.username}</h1>
      <button onClick={signOut}>Sign Out</button>
      <S3FileUploader />
    </div>
  );
}

export default withAuthenticator(App);

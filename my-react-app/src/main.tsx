// src/index.js or App.jsx
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

createRoot(document.getElementById('root')).render(<App />);

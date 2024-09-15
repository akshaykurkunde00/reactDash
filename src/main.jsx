import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store  from './store';


// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root for rendering
const root = createRoot(container);

// Render the App component wrapped with the Redux provider
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

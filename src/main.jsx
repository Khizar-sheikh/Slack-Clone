import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { StateProvider } from './Components/Provider/StateProvider.jsx'; // Import the StateProvider
import { initialState, reducer } from './Components/Provider/Reducer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}> {/* Pass initialState and reducer as props */}
      <App />
    </StateProvider>
  </React.StrictMode>,
);

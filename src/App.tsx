import './App.css';
import { Main } from 'src/components/Main';
import React from 'react';

import { AppContextProvider } from 'src/context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Main />
      </div>
    </AppContextProvider>
  );
}

export default App;

import React, { FC } from 'react';
import ThemeProvider from './theme';
import Router from './Router';

const App: FC = () => {
  return (
    <ThemeProvider>
        <Router />
    </ThemeProvider>
  );
}

export default App;

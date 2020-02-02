import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
    colors: {
        red: '#9d2235',
        yellow: '#ffc72c',
    }
};

export type Theme = typeof theme

const AppTheme: FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default AppTheme;

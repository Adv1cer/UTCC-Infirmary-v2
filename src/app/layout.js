import "./globals.css";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

// Define Mantine theme
const theme = {
  colorScheme: 'light',
  fontFamily: 'IBM Plex Sans Thai, sans-serif',
};

// Load Google Font
const inter = IBM_Plex_Sans_Thai({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
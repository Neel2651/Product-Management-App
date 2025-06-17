import "./styles/globals.css";
import { ReactNode } from "react";
import Providers from "./providers";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

// Metadata for the application
export const metadata = {
  title: "Product Dashboard",
  description: "Manage your products easily",
};

// Root layout component for the application
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}> {/* Apply custom theme */}
          {/* CssBaseline provides a consistent baseline for styles across browsers */}
          <CssBaseline />
          <Providers>{children}</Providers> {/* Wrap children with Providers for context and state management of tanstack query*/}
        </ThemeProvider>
      </body>
    </html>
  );
}

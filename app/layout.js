import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientProvider from "./ClientProvider"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./components/theme-provider";

export const metadata = {
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <ToastContainer position="top-left" autoClose={2000} />
            <Footer />
          </ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  );
}

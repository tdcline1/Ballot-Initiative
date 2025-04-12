import "./App.css";

import Layout from "@/Layout";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout></Layout>
    </ThemeProvider>
  );
}

export default App;

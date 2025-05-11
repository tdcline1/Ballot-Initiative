import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar, items } from "@/components/sidebar";
import { ModeToggle } from "./components/theme-provider/mode-toggle";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useLocation } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="text-left flex">
          <SidebarTrigger /> | {""}
          {items.find((item) => item.url === location.pathname)?.title}
        </header>
        {children}
        <ModeToggle />
        <Toaster />
        <footer>
          <Markdown
            rehypePlugins={[rehypeRaw]}
            components={{
              a(props) {
                const { node, ...rest } = props;
                return <a className="text-blue-400 underline" {...rest}></a>;
              },
            }}
          >
            {`
<div style='text-align: center; color: #666;'>
© 2024 Ballot Initiative Project | <a href='#'>Privacy Policy</a> | <a href='#'>Terms of Use</a>
</div>`}
          </Markdown>
        </footer>
      </main>
    </SidebarProvider>
  );
}

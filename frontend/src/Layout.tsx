import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { ModeToggle } from "./components/theme-provider/mode-toggle";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>{children}</main>
      <ModeToggle />
    </SidebarProvider>
  );
}

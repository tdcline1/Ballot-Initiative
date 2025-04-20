import { FileCheck, Home, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSidebar } from "@/components/ui/sidebar";
import { useMatchRoute } from "@tanstack/react-router";
// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Petition Validation",
    url: "petition",
    icon: FileCheck,
  },
];

const instructions = [
  {
    title: "1️⃣ Upload Voter Records",
    content: (
      <ul className="list-disc list-inside">
        <li>CSV format required</li>
        <li>Must include:</li>
        <ul className="list-disc list-inside">
          <li className="ml-4">First_Name</li>
          <li className="ml-4">Last_Name</li>
          <li className="ml-4">Street_Number</li>
          <li className="ml-4">Street_Name</li>
          <li className="ml-4">Street_Type</li>
          <li className="ml-4">Street_Dir_Suffix</li>
        </ul>
        <i>Example: Download a sample of fake voter records here.</i>
      </ul>
    ),
  },
  {
    title: "2️⃣ Upload Signatures",
    content: (
      <ul className="list-disc list-inside">
        <li>PDF format only</li>
        <li>Clear, legible scans</li>
        <li>One signature per line</li>
        <i>Example: Download a sample of fake signed petitions here.</i>
      </ul>
    ),
  },
  {
    title: "3️⃣ Process & Review",
    content: (
      <ul className="list-disc list-inside">
        <li>Click 'Process Files'</li>
        <li>Review matches</li>
        <li>Download CSV results</li>
        <i>Note: Moving to the 'Home' page will restart processing.</i>
      </ul>
    ),
  },
  {
    title: "4️⃣ Clear Files",
    content: "Clear temporary files when done",
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const matchRoute = useMatchRoute();
  const isPetitionRoute = matchRoute({ to: "/petition" });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="hover:overflow-y-visible overflow-hidden [&::-webkit-scrollbar-track]:bg-black-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar]:w-2 h-full">
        <SidebarGroup>
          <SidebarGroupLabel>Ballot Initiative</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {state === "expanded" && isPetitionRoute && (
          <SidebarGroup className="border-t dark:border-gray-500 border-black text-left p-5">
            <h1 className="mb-5">📝 Instructions</h1>
            <Accordion type="single" collapsible>
              {instructions.map((instruction) => (
                <AccordionItem
                  key={instruction.title}
                  value={instruction.title}
                  className="px-4 mb-5 dark:border-gray-500 border-black border-1 rounded-sm"
                >
                  <AccordionTrigger>{instruction.title}</AccordionTrigger>
                  <AccordionContent>{instruction.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="flex flex-row">
        <SidebarMenuItem key="Settings">
          <SidebarMenuButton asChild>
            <a href="/settings">
              <Settings />
              <span>{"Settings"}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}

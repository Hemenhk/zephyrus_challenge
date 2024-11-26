import SidebarProvider from "@/components/sidebar/SidebarProvider";

export default function Home() {
  return (
   <main className="h-screen w-full flex justify-center items-center">
    <SidebarProvider />
   </main>
  );
}

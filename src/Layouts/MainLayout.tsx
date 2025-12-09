import Header from "@/_components/Header";
import Sidebar from "@/_components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#FCF5EE] min-h-screen">
      <Header />

      <div className="flex">
        {/* FIXED SIDEBAR WITH WIDTH */}
        <div className="fixed left-0  h-[calc(100vh-80px)] w-64">
          <Sidebar />
        </div>

        {/* MAIN CONTENT WITH LEFT MARGIN */}
        <main className="flex-1 p-6 ml-64 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}


// components/Header.tsx
import { UserButton } from "@clerk/clerk-react";
import { Link2 } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-[#FFC4C4] sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-linear-to-br from-[#EE6983] to-[#850E35] rounded-lg flex items-center justify-center">
            <Link2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-[#850E35]">Link Shift</span>
        </div>

        {/* User Button */}
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 border-2 border-[#FFC4C4]",
              userButtonPopoverCard: "border-2 border-[#FFC4C4]",
              userButtonPopoverActionButton: "hover:bg-[#FCF5EE]",
              userButtonPopoverActionButtonText: "text-[#850E35]",
              userButtonPopoverActionButtonIcon: "text-[#EE6983]",
            }
          }}
        />
      </div>
    </header>
  );
}
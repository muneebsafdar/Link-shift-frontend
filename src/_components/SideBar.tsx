import { Home, History, Settings, User,ChartSpline } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function Sidebar() {
  const { user } = useUser();

  const navItems = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/history", icon: History, label: "ALL Links" },
    { to: "/stats", icon: ChartSpline, label: "Stats" },
    { to: "/account", icon: User, label: "Account" },
  ];

  return (
    <aside className="w-64 bg-white border-r-2 border-[#FFC4C4] min-h-screen flex flex-col justify-between">
      
      {/* NAV ITEMS */}
      <nav className="space-y-2 p-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-linear-to-r from-[#EE6983] to-[#850E35] text-white shadow-lg"
                  : "text-[#850E35] hover:bg-[#FCF5EE] hover:text-[#EE6983]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* USER INFO (BOTTOM FIXED) */}
      <div className="flex fixed bottom-0 px-2 py-3 items-center border-t border-[#FFC4C4]">
        {/* Profile Image or Initials */}
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-[#EE6983] text-white rounded-full flex items-center justify-center font-bold">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
        )}

        {/* User Info */}
        <div className="px-2">
          <p className="font-medium text-[#850E35]">
            {user?.fullName || "User"}
          </p>
          <p className="text-sm text-gray-500">
            {user?.primaryEmailAddress?.emailAddress || ""}
          </p>
        </div>
      </div>

    </aside>
  );
}

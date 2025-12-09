import React from "react";
import { UserProfile } from "@clerk/clerk-react";

export default function AccountPage() {
  return (
    <div className="bg-[#FCF5EE] p-6">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#850E35] mb-2">
            Account Settings
          </h1>
          <p className="text-lg text-[#850E35]/70">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Clerk User Profile Component */}
        {/* <div className="bg-white rounded-2xl shadow-lg border-2 border-[#FFC4C4] p-8"> */}
          <UserProfile
            appearance={{
              elements: {
                // Root container
                rootBox: "w-full",
                card: "shadow-none border-0",
                
                // Header styling
                headerTitle: "text-[#850E35] font-bold text-2xl",
                headerSubtitle: "text-[#850E35]/70",
                
                // Navigation tabs
                navbar: "bg-[#FCF5EE] rounded-xl border-2 border-[#FFC4C4]",
                navbarButton: "text-[#850E35] hover:bg-white/80 data-[active]:bg-linear-to-r data-[active]:from-[#EE6983] data-[active]:to-[#850E35] data-[active]:text-white rounded-lg",
                navbarButtonIcon: "text-[#EE6983]",
                
                // Page sections
                pageScrollBox: "bg-white",
                page: "bg-white",
                
                // Form elements
                formFieldLabel: "text-[#850E35] font-medium",
                formFieldInput: "border-2 border-[#FFC4C4] focus:border-[#EE6983] rounded-lg",
                formFieldInputShowPasswordButton: "text-[#EE6983] hover:text-[#850E35]",
                
                // Buttons
                formButtonPrimary: "bg-linear-to-r from-[#EE6983] to-[#850E35] hover:shadow-lg transition-all",
                formButtonReset: "border-2 border-[#FFC4C4] text-[#850E35] hover:bg-[#FCF5EE]",
                
                // Profile section
                profileSection: "border-2 border-[#FFC4C4] rounded-xl bg-[#FCF5EE]",
                profileSectionTitle: "text-[#850E35] font-semibold",
                profileSectionPrimaryButton: "text-[#EE6983] hover:text-[#850E35]",
                profileSectionContent: "text-[#850E35]/70",
                
                // Avatar
                avatarBox: "border-4 border-[#FFC4C4]",
                avatarImageActions: "bg-[#850E35]",
                avatarImageActionsUpload: "text-white",
                
                // Account section
                accordionTriggerButton: "hover:bg-[#FCF5EE] text-[#850E35]",
                accordionContent: "text-[#850E35]/70",
                
                // Badge
                badge: "bg-[#FFC4C4] text-[#850E35]",
                
                // Breadcrumbs
                breadcrumbsItem: "text-[#850E35]/70",
                breadcrumbsItemDivider: "text-[#FFC4C4]",
                breadcrumbsItemCurrent: "text-[#850E35] font-semibold",
                
                // Menu
                menuButton: "hover:bg-[#FCF5EE] text-[#850E35]",
                menuItem: "hover:bg-[#FCF5EE] text-[#850E35]",
                
                // Footer actions
                footerAction: "bg-[#FCF5EE] border-t-2 border-[#FFC4C4]",
                footerActionLink: "text-[#EE6983] hover:text-[#850E35]",
                footerActionText: "text-[#850E35]/70",
                
                // Alert/Error messages
                alertText: "text-[#850E35]",
                formFieldErrorText: "text-[#EE6983]",
                
                // Divider
                dividerLine: "bg-[#FFC4C4]",
                dividerText: "text-[#850E35]/60",
                
                // Modal
                modalBackdrop: "bg-[#850E35]/20",
                modalContent: "border-2 border-[#FFC4C4] rounded-2xl",
                modalCloseButton: "text-[#850E35] hover:text-[#EE6983]",
                
                // OTP Input
                otpCodeFieldInput: "border-2 border-[#FFC4C4] focus:border-[#EE6983]",
                
                // Tags
                tagPrimaryButton: "bg-[#FFC4C4] text-[#850E35] hover:bg-[#EE6983] hover:text-white",
                
                // Security section
                identityPreviewText: "text-[#850E35]",
                identityPreviewEditButton: "text-[#EE6983] hover:text-[#850E35]",
              },
            }}
          />
        </div>

        {/* Additional Info Card (Optional) */}
        <div className="mt-6 bg-linear-to-r from-[#EE6983] to-[#850E35] rounded-2xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
          <p className="text-white/90 mb-4">
            If you have any questions about your account or need assistance, feel free to reach out to our support team.
          </p>
          <button className="px-6 py-2 bg-white text-[#850E35] rounded-lg font-semibold hover:bg-[#FCF5EE] transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    // </div>
  );
}
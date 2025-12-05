// SignInPage.tsx
import { SignIn } from "@clerk/clerk-react";
import { Link2 } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#FCF5EE] flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#EE6983] to-[#850E35] p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#850E35]/30 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Link2 className="w-7 h-7 text-[#850E35]" />
            </div>
            <span className="text-3xl font-bold text-white">Link Shift</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Welcome Back!
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Sign in to manage your shortened links, track analytics, and boost your online presence.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-0">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Lightning Fast</h3>
              <p className="text-white/80">Create and share links in seconds</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-0">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Advanced Analytics</h3>
              <p className="text-white/80">Track every click with detailed insights</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-0">
              <span className="text-2xl">🔒</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Secure & Reliable</h3>
              <p className="text-white/80">Enterprise-grade security for your links</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Clerk Sign In */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-linear-to-br from-[#EE6983] to-[#850E35] rounded-lg flex items-center justify-center">
              <Link2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#850E35]">Link Shift</span>
          </div>

          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-white shadow-xl border-2 border-[#FFC4C4] rounded-2xl",
                headerTitle: "text-[#850E35] font-bold",
                headerSubtitle: "text-[#850E35]/70",
                socialButtonsBlockButton: "border-2 border-[#FFC4C4] hover:border-[#EE6983] transition-colors",
                socialButtonsBlockButtonText: "text-[#850E35] font-medium",
                formButtonPrimary: "bg-gradient-to-r from-[#EE6983] to-[#850E35] hover:shadow-lg transition-all",
                formFieldInput: "border-2 border-[#FFC4C4] focus:border-[#EE6983] rounded-lg",
                formFieldLabel: "text-[#850E35] font-medium",
                footerActionLink: "text-[#EE6983] hover:text-[#850E35]",
                identityPreviewText: "text-[#850E35]",
                identityPreviewEditButton: "text-[#EE6983]",
                formHeaderTitle: "text-[#850E35]",
                formHeaderSubtitle: "text-[#850E35]/70",
                dividerLine: "bg-[#FFC4C4]",
                dividerText: "text-[#850E35]/60",
                otpCodeFieldInput: "border-2 border-[#FFC4C4] focus:border-[#EE6983]",
                formResendCodeLink: "text-[#EE6983] hover:text-[#850E35]",
                alertText: "text-[#850E35]",
                navbarButton: "text-[#850E35] hover:text-[#EE6983]",
              }
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/home"
          />

        </div>
      </div>
    </div>
  );
}
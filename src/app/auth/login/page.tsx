'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { loginUser } from '@/lib/services/auth-service';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await loginUser(email);
    setIsLoading(false);
    // Redirect to verify-login OTP for security verification
    router.push(`/auth/verify-login?email=${encodeURIComponent(email)}`);
  };

  return (
    <main className="min-h-screen bg-[#F4F6F9] text-[#0E1726] flex flex-col justify-center items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-xl overflow-hidden"
        >
          {/* Card Top Brand Banner */}
          <div className="bg-[#0B192C] px-8 py-8 text-center relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9BC800_1px,transparent_1px)] [background-size:16px_16px]" />
            <Link href="/" className="relative z-10 inline-block">
              <img
                src="/images/logo-footer.png"
                alt="ChimJoy Logistics Services Ltd"
                className="h-10 sm:h-12 w-auto object-contain mx-auto"
              />
            </Link>
          </div>

          {/* Form Content */}
          <div className="p-7 sm:p-9 space-y-6">
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="font-display text-2xl font-extrabold text-[#0E1726]">
                Sign In to Your Account
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] font-medium">
                Enter your credentials to continue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Address */}
              <div className="relative group">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#003366] mb-1.5">
                  Email Address
                </label>
                <div className="flex items-center gap-3 border border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-xl px-4 py-3 transition-all duration-200 bg-white shadow-sm">
                  <Mail className="w-4 h-4 text-[#003366] shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="chinedu.okonkwo@company.ng"
                    className="w-full text-sm font-medium text-[#0E1726] placeholder-[#475569]/40 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#003366]">
                    Password
                  </label>
                  <Link href="/auth/forgot-password" className="text-xs font-bold text-[#003366] hover:text-[#9BC800] transition-colors">
                    Forgot Password?
                  </Link>
                </div>
                <div className="flex items-center gap-3 border border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-xl px-4 py-3 transition-all duration-200 bg-white shadow-sm">
                  <Lock className="w-4 h-4 text-[#9BC800] shrink-0" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full text-sm font-medium text-[#0E1726] focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2.5 text-xs font-bold text-[#475569] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#0B192C]/20 text-[#0B192C] focus:ring-[#9BC800]"
                  />
                  <span>Remember me on this device</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <LuxuryButton
                  type="submit"
                  variant="lemon"
                  size="lg"
                  disabled={isLoading}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full justify-center"
                >
                  {isLoading ? 'Authenticating...' : 'Sign In to Your Account'}
                </LuxuryButton>

                {/* Google OAuth Button */}
                <button
                  type="button"
                  onClick={() => handleLogin({ preventDefault: () => {} } as any)}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full border border-[#0B192C]/15 bg-white text-xs font-bold text-[#0E1726] hover:bg-[#F8FAFC] transition-all duration-200 shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            </form>

            <div className="border-t border-[#0B192C]/10 pt-4 text-center text-xs text-[#475569] font-medium">
              Don't have an account?{' '}
              <Link href="/auth/register" className="font-extrabold text-[#003366] hover:text-[#9BC800] transition-colors">
                Create Account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

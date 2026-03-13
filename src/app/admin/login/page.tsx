import { signIn } from "@/auth";
import { ArrowRight, Lock, Mail, User } from "lucide-react";

export default function LoginPage() {
    async function handleLogin(formData: FormData) {
        "use server";
        await signIn("credentials", formData);
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-background via-secondary to-background flex items-center justify-center p-4 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
            </div>

            {/* Main Content */}
            <div className="relative w-full max-w-md">
                <div className="bg-secondary/40 border border-border rounded-2xl backdrop-blur-sm p-8 sm:p-10 shadow-2xl">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                            <User />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground text-center mb-2">
                            Al Faizan Admin
                        </h1>
                        <p className="text-muted-foreground text-center text-sm">
                            Secure access for authorized personnel
                        </p>
                    </div>

                    {/* Form */}
                    <form action={handleLogin} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="admin@alfaizan.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-foreground">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded accent-primary cursor-pointer"
                                />
                                <span className="text-muted-foreground hover:text-foreground transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <a
                                href="#"
                                className="text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group"
                        >
                            Sign In
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </button>
                    </form>

                    {/* Security Badge */}
                    <div className="mt-8 pt-6 border-t border-border">
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                            <Lock size={14} />
                            <span>Secure SSL Connection</span>
                        </div>
                    </div>
                </div>

                {/* Footer Text */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                    Only authorized administrators can access this area.
                </p>
            </div>
        </div>
    );
}

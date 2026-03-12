import { signIn } from "@/auth";
import { Lock } from "lucide-react";

export default function LoginPage() {

    // Server Action to handle the form submission
    async function handleLogin(formData: FormData) {
        "use server";
        await signIn("credentials", formData);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 absolute inset-0 z-50">
            <div className="max-w-md w-full bg-surface p-8 rounded-2xl border border-gray-800 shadow-2xl">

                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                        <Lock size={32} className="text-gold" />
                    </div>
                    <h1 className="text-3xl font-serif text-text-main">Admin Access</h1>
                    <p className="text-text-muted mt-2">Authorized personnel only</p>
                </div>

                <form action={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm text-text-muted mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-background border border-gray-800 rounded-lg px-4 py-3 text-text-main focus:border-gold outline-none transition-colors"
                            placeholder="admin@alfaizan.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-text-muted mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full bg-background border border-gray-800 rounded-lg px-4 py-3 text-text-main focus:border-gold outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gold hover:bg-gold-hover text-background font-bold text-lg py-3 rounded-xl transition-all"
                    >
                        Secure Login
                    </button>
                </form>
            </div>
        </div>
    );
}
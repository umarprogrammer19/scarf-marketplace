import { auth } from "@/auth";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnAdmin = req.nextUrl.pathname.startsWith('/admin');
    const isLoginPage = req.nextUrl.pathname === '/admin/login';

    // If trying to access admin without logging in, kick them to login page
    if (isOnAdmin && !isLoginPage && !isLoggedIn) {
        return Response.redirect(new URL('/admin/login', req.nextUrl));
    }

    // If already logged in and trying to view the login page, send to dashboard
    if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/admin', req.nextUrl));
    }
});

// Tell the middleware to only run on admin routes
export const config = {
    matcher: ["/admin/:path*"],
};
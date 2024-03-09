import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/categories",
		"/products",
		/^\/products\/\w+$/,
		"/pricing",
		"/contacts",
		"/api/webhook/clerk",
		"/not-found",
	],
	ignoredRoutes: ["/api/webhook/clerk"],
});

// Stop Middleware running on static files
export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
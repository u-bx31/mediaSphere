import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		/^\/(?!account$)[a-zA-Z0-9_-]+$/, 
		"/pricing",
		"/api/webhook/clerk",
		"/not-found",
		"/api/uploadthing"
	],
	ignoredRoutes: ["/api/webhook/clerk"],
});

// Stop Middleware running on static files
export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
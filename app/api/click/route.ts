import { AddEventAction } from "@/lib/actions/event.actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	console.log(url);
	const currentUrl = url.searchParams.get("rl");
	const currentUserName = url.searchParams.get("u") || '';
	const clickedLink = atob(currentUrl as string);

	try {
		await AddEventAction({
			userName: currentUserName,
			eventType: "click",
			eventTarget: clickedLink,
		});
		return NextResponse.json(true);
	} catch (e) {
		console.log(e);
		return new Response(null, { status: 400, statusText: "Bad Request" });
	}
}

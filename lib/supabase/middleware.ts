import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request,
  })

  try {
    const userSession = request.cookies.get("user_session")

    if (
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/tasks") ||
      request.nextUrl.pathname.startsWith("/task-types") ||
      request.nextUrl.pathname.startsWith("/profile")
    ) {
      if (!userSession || !userSession.value) {
        console.log("[v0] No user session found, redirecting to login")
        const url = request.nextUrl.clone()
        url.pathname = "/"
        return NextResponse.redirect(url)
      }

      try {
        JSON.parse(userSession.value)
        console.log("[v0] Valid user session found")
      } catch (error) {
        console.log("[v0] Invalid session cookie, redirecting to login")
        const url = request.nextUrl.clone()
        url.pathname = "/"
        return NextResponse.redirect(url)
      }
    }

    // Let the login form handle navigation after successful authentication
  } catch (error) {
    console.error("[v0] Middleware error:", error)
  }

  return response
}

import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request,
  })

  try {
    const userSession = request.cookies.get("user_session")

    // Check if user is trying to access protected routes
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

    if (request.nextUrl.pathname === "/" && userSession && userSession.value) {
      try {
        JSON.parse(userSession.value)
        console.log("[v0] User already logged in, redirecting to dashboard")
        const url = request.nextUrl.clone()
        url.pathname = "/dashboard"
        return NextResponse.redirect(url)
      } catch (error) {
        // Invalid session, let them stay on login page
      }
    }
  } catch (error) {
    console.error("[v0] Middleware error:", error)
  }

  return response
}

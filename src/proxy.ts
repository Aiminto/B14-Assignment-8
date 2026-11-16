import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

// Never gate static assets (e.g. /events/*.jpg). The image optimizer fetches
// them internally, and a redirect here breaks every <Image> on the page.
if (/\.[a-z0-9]+$/i.test(request.nextUrl.pathname)) {
  return NextResponse.next()
}

const session = await auth.api.getSession({
    headers: await headers()
    
})
const user = session?.user
if(!user){

 return NextResponse.redirect(new URL('/signup', request.url))

}

}
export const config = {
  matcher: ['/events', "/events/:path"],
}
 
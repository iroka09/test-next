
import { type NextRequest, NextResponse, NextFetchEvent } from "next/server"
import { createEdgeRouter } from "next-connect";


const router = createEdgeRouter<NextRequest, NextFetchEvent>();


router.use(async (request, event, next) => {
  console.log(`${request.method} ${request.url}`);
  return next();
});

router.use("/any", (request) => {
  return new NextResponse("any page")
});

router.post("/about", (request) => {
  return new NextResponse("MY ABOUT PAGE of post.")
});

router.post("*", (request) => {
  return new NextResponse("MY All routes of post.")
});

router.get("/about", (request) => {
  return new NextResponse("MY ABOUT PAGE of get.")
});

router.all(() => {
  return NextResponse.next();
});

export function middleware(request: NextRequest, event: NextFetchEvent) {
  return router.run(request, event);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ],
  runtime: "experimental-edge",
};


/*
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  console.log(pathname)
  return NextResponse.next();
  if (/^\/(?:_next|api|static).*$|^\/\w+\.\w{2,5}$/.test(pathname)) {
  }
  switch (pathname) {
    case "/":
      let response = NextResponse.next()
      response.cookies.set("author", "Iroka", { path: "/" })
      response.cookies.set({
        name: "age",
        value: 28 + "yrs",
        path: "/"
      })
      return response
    default:
      return NextResponse.rewrite(new URL("/error/404?message=Page Not Found", req.url))
  }
}

*/
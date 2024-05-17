
import { type NextRequest, NextResponse, NextFetchEvent } from "next/server"
import { createEdgeRouter } from "next-connect";


const router = createEdgeRouter<NextRequest, NextFetchEvent>();


router.use(async (request, event, next) => {
  console.log("one middleware");
  return next();
});

router.use("/any", (request) => {
  return new NextResponse("ONE page-1 oooo")
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
    "/((?!_next/static|_next/image|favicon).*)"
  ],
  // runtime: "experimental-edge",
};

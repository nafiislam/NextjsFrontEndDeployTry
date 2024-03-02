//for details: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
//more links: https://nextjs.org/docs/pages/building-your-application/authentication
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
export const dynamic = 'force-dynamic'
export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const username = formData.username;
    const password = formData.password;
    const accesstoken = request.cookies.get("accesstoken")?.value;

    const res = await fetch(`${process.env.BACKEND_API}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: accesstoken,
      },
      body: JSON.stringify({ username: username, password: password }),
      cache: "no-store",
    });

    if (res.status !== 200) {
      return Response.json({});
    }

    const setCookieHeaders = res.headers.getSetCookie() || [];
    const accessTokenCookie = setCookieHeaders
      .map(cookie => cookie.split(';')[0])
      .find(cookie => cookie.startsWith("accessToken"));

    console.log(accessTokenCookie?.split('=')[1]);

    const data = await res.json();
    console.log(data);

    const accessTokenReqHeader = accessTokenCookie?.split('=')[1]

    cookies().set({
      name: "accessToken",
      value: accessTokenReqHeader??'',
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({msg:data.msg});
  } catch (err) {
    return Response.json({});
  }
}
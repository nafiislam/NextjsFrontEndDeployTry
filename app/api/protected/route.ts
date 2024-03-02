import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { use } from "react";

export async function GET(request: NextRequest) {
  try {
    const accesstoken =  request.cookies.get("accessToken")?.value;
    console.log(accesstoken)

    const res = await fetch(`${process.env.BACKEND_API}/protected`, {
      method: "GET",
      credentials: "include",
      headers: {
        accessToken: accesstoken,
      },
      cache: "no-store",
    });

    if (res.status !== 200) {
        return Response.json({});
    }

    const data = await res.json();
    console.log(data);

    return Response.json({msg:data.msg});
  } catch (err) {
    return Response.json({});
  }
}

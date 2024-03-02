'use client'
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Home() {
  const [isAuthorized,setIsAuthorized] = useState(false)

  const buttonHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await fetch('/api/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: (event.target as HTMLFormElement).elements[0].value,
        password: (event.target as HTMLFormElement).elements[1].value
      })
    });
    const msg = await (res.json());
    console.log(msg);
  }
  const protectHandler = async () => {
    const res = await fetch('/api/protected', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) {
      console.error(`Failed to fetch protected data. Status: ${res.status}`);
      return;
    }
  
    const data = await res.json();
    console.log(data);
    const msg = data.msg;
    console.log(msg);
  
    if (msg === "Success") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  };
  
  return (
    <>
      <div>
        <h1>Home</h1>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        {/* <form method="POST" action="/api/login"> */}
        <form onSubmit={buttonHandler}>
          <label>Username</label>
          <input className="border  border-slate-800" type="text" name="username" id="1" /> <br />
          <label>Password</label>
          <input className="border  border-slate-800" type="text" name="password" id="2" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" type="submit">Login</button>
        </form>
      </div>
      <div>
        <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" onClick={protectHandler}>Click to check auth</button>
        {isAuthorized?<h1>Authorized</h1>:<h1>Unauthorized</h1>}
      </div>
    </>
  );
}

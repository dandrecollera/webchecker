"use client";

import Input from "@/ui/input";

export default function Login() {
  function test() {}

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50">
      <div className="flex flex-col gap-y-4 bg-white shadow p-10 rounded-xl w-96">
        <h1 className="text-xl">NextJS Site Checker</h1>
        <form onSubmit={test} className="w-full flex flex-col gap-y-4">
          <Input type="text" value="test" />
          <Input type="text" value="test" />
        </form>
      </div>
    </div>
  );
}

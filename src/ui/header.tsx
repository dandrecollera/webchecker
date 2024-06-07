import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 px-5 flex gap-x-5 items-center text-black">
      <div className="text-xl">
        <Link href="/">NextJS Checker</Link>
      </div>
      <div className="flex gap-x-4 text-sm">
        <Link href="/">Home</Link>
        <Link href="report">Reports</Link>
      </div>
    </header>
  );
}

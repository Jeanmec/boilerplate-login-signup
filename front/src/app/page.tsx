import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1>Homepage</h1>
      <div className="flex gap-4">
        <Link href="/login" className="btn btn-outline btn-info">
          Go to /login
        </Link>
      </div>
    </div>
  );
}

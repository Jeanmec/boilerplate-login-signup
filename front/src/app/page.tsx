import Link from "next/link";
import SignOutButton from "./components/signOutButton";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1>Homepage</h1>
      <div className="flex gap-4">
        <Link href="/login" className="btn btn-outline btn-info">
          Go to /login
        </Link>
        <Link href="dashboard/me" className="btn btn-outline btn-accent">
          Go to /me
        </Link>
      </div>
      <SignOutButton />
    </div>
  );
}

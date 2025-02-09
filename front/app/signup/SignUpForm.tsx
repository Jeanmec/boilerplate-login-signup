import Link from "next/link";

interface SignUpFormProps {
  name: string;
  email: string;
  password: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSignUp: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function SignUpForm({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  handleSignUp,
}: SignUpFormProps) {
  return (
    <>
      <h1 className="text-5xl font-bold">Sign up</h1>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-80">
        <label className="flex flex-col gap-1">
          <span>Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            autoComplete="username"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            autoComplete="email"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            autoComplete="new-password"
            required
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary py-2 mt-4 rounded bg-blue-500 text-white"
        >
          Sign up
        </button>
        <div className="flex gap-2">
          <span>Already have an account?</span>
          <Link href="/login" className="underline text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </>
  );
}

interface CodeVerificationProps {
  email: string;
  code: string;
  password: string;
  setCode: (code: string) => void;
  setPassword: (password: string) => void;
  handleResetPassword: (e: React.FormEvent) => void;
}

export default function ResetPasswordForm({
  password,
  setPassword,
  email,
  code,
  setCode,
  handleResetPassword,
}: CodeVerificationProps) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl font-bold">Reset your password</h1>
      <form onSubmit={handleResetPassword} className="flex flex-col gap-4 w-80">
        <p className="text-center">
          Enter the code you received in your email to reset your password.
        </p>
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="text"
            value={email}
            disabled
            className="input input-bordered"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Code</span>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input input-bordered"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>New password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered"
            autoComplete="new-password"
            required
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Reset my password
        </button>
      </form>
    </div>
  );
}

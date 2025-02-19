interface ForgotPasswordFormProps {
  email: string;
  setEmail: (email: string) => void;
  handleForgotPassword: (e: React.FormEvent) => void;
}

export default function ForgotPasswordForm({
  email,
  setEmail,
  handleForgotPassword,
}: ForgotPasswordFormProps) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl font-bold">Forgot your password?</h1>
      <form
        onSubmit={handleForgotPassword}
        className="flex flex-col gap-4 w-80"
      >
        <p className="text-center">
          If your email is in our database, you will receive an email with a
          code to reset your password.
        </p>
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered"
            required
          />
        </label>
        <button className="btn btn-primary">Reset my password</button>
      </form>
    </div>
  );
}

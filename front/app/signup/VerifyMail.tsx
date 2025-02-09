interface VerifyMailFormProps {
  code: string;
  setCode: (code: string) => void;
  handleVerifyEmail: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function VerifyEmail({
  code,
  setCode,
  handleVerifyEmail,
}: VerifyMailFormProps) {
  return (
    <>
      <h1 className="text-5xl font-bold">Verify your email</h1>
      <form onSubmit={handleVerifyEmail} className="flex flex-col gap-4 w-80">
        <label className="flex flex-col gap-1">
          <span>Code</span>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <button className="btn">Get a new code</button>
        <button
          type="submit"
          className="btn btn-primary py-2 mt-4 rounded bg-blue-500 text-white"
        >
          Verify
        </button>
      </form>
    </>
  );
}

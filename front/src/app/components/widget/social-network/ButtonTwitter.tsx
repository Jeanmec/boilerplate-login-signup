import { FaXTwitter } from "react-icons/fa6";

interface ButtonTwitterProps {
  onClick?: () => void;
  showText?: boolean;
}

export default function ButtonTwitter({
  onClick,
  showText,
}: ButtonTwitterProps) {
  return (
    <button className="btn bg-black text-white text-lg" onClick={onClick}>
      <FaXTwitter /> {showText && "Twitter"}
    </button>
  );
}

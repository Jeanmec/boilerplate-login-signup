import { FaFacebookSquare } from "react-icons/fa";

interface ButtonFacebookProps {
  onClick?: () => void;
  showText?: boolean;
}

export default function ButtonFacebook({
  onClick,
  showText,
}: ButtonFacebookProps) {
  return (
    <button
      className="btn bg-[#0166ff] text-white text-lg hover:bg-[#0134ff]"
      onClick={onClick}
    >
      <FaFacebookSquare /> {showText && "Facebook"}
    </button>
  );
}

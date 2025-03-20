"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { BiSolidWidget } from "react-icons/bi";
import TextLoop from "react-text-loop";

export default function Home() {
  const phrases = [
    {
      text: "widgets",
      color: "text-green-400",
    },
    {
      text: "chat bot",
      color: "text-yellow-200",
    },
    {
      text: "network links",
      color: "text-blue-400",
    },
  ];

  return (
    <Navbar>
      <div className="flex flex-col items-center">
        <div className="mt-8 md:w-8/12">
          <h1 className="text-7xl flex flex-col items-center justify-center">
            <span className="flex gap-4 w-full">
              <span className="flex w-1/2 justify-end">Add some</span>
              <TextLoop
                interval={2000}
                delay={3000}
                className="font-bold flex w-1/2"
              >
                {phrases.map(({ text, color }) => (
                  <span key={text} className={color}>
                    {text}
                  </span>
                ))}
              </TextLoop>
            </span>
            <span className="flex gap-2">in one click</span>
          </h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            blanditiis totam excepturi magnam debitis repellat vitae, iure nobis
            nihil sit architecto nesciunt illum eveniet voluptatem quos alias
            harum. Ratione, voluptatum.
          </h2>
          <div className="flex w-full justify-center gap-2">
            <Link href="/login" className="btn">
              Try it for free
            </Link>
            <Link href="/collection" className="btn btn-primary">
              <BiSolidWidget className="text-xl" /> Explore widgets
            </Link>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

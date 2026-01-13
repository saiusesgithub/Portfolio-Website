"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Manrope, Noto_Sans } from "next/font/google";

// const words = [
//   "Hello",
//   "Bonjour",
//   "Ciao",
//   "Olà",
//   "やあ",
//   "Hallå",
//   "Guten tag",
//   "হ্যালো",
// ];

const words = [
  "Hello",
  "Bonjour",
  "Salut",
  "Ciao",
  "Guten Tag",
  "Hej",
  "Hola",
  "Oi",
  "やあ",
  "नमस्ते",
  "你好",
  "안녕하세요",
];

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });



const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
};

const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

const MIN_DISPLAY_MS = 5000;

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (isExiting) return;

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, index === 0 ? 1000 : 300);

    return () => clearTimeout(timer);
  }, [index, isExiting]);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }, MIN_DISPLAY_MS);

    return () => clearTimeout(exitTimer);
  }, [onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${
    dimension.height + 300
  } 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${
    dimension.height
  } 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 z-[99999999999] flex h-screen w-screen items-center justify-center bg-black"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            className="absolute z-10 flex items-center text-4xl font-medium text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: `${manrope.style.fontFamily}, ${notoSans.style.fontFamily}, system-ui, sans-serif` }}
          >
            <span className="mr-2.5 block h-2.5 w-2.5 rounded-full bg-white" />
            {words[index]}
          </motion.p>
          <svg className="absolute top-0 h-[calc(100%+300px)] w-full">
            <motion.path
              variants={curve}
              initial="initial"
              animate={isExiting ? "exit" : "initial"}
              fill="#070b13"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}

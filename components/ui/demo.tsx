"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Preloader from "@/components/ui/preloader";

const DemoOne = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  const handleComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const handleReplay = useCallback(() => {
    setShowPreloader(true);
  }, []);

  return (
    <>
      {showPreloader && <Preloader onComplete={handleComplete} />}
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <motion.div className="max-w-3xl space-y-8 text-center" initial="hidden" animate="visible">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">Welcome</h1>
          <p className="text-xl text-muted-foreground">
            Your content has loaded successfully. The preloader animation has completed.
          </p>
          <button
            onClick={handleReplay}
            className="mt-6 transform rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-base font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 active:scale-95"
          >
            Replay Preloader
          </button>
        </motion.div>
      </main>
    </>
  );
};

export { DemoOne };

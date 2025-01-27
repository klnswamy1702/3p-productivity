// import Image from "next/image";

import { PomodoroTimer } from "@/components/PomodoroTimer";
import { ParetoPrinciple} from "@/components/ParetoPrinciple";
import { ParkinsonLaw } from "@/components/Parkinsonlaw";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   {/* <p>Hello there
    //   </p>
    //    */}
    // </div>
    <div className="p-6 space-y-10">
      <PomodoroTimer />
      <ParetoPrinciple />
      <ParkinsonLaw />
    </div>
  );
}

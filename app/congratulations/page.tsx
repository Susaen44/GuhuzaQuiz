"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Reward from "../reward/page";
import ShareButton from "../components/buttons/sharebtn";

type Reward = {
  id: number;
  name: string;
  description: string;
  requiredLevel: number;
  image: string;
};

export default function CongratulationsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const [score, setScore] = useState<number>(0);
  const searchParams = useSearchParams();
  const rewardName = searchParams.get("reward");
  const level = searchParams.get("level");

  useEffect(() => {
    async function fetchRewards() {
      try {
        const res = await fetch(`/api/rewards`);
        const data: Reward[] = await res.json();
        setRewards(data);

        const matched = data.find((r) => r.name === rewardName);
        setSelectedReward(matched || null);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    }

    fetchRewards();
  }, [rewardName]);

  const handleShareScore = () => {
    console.log(score, rewards);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-12 bg-[#b07a4b] text-center overflow-hidden font-sans shadow-lg rounded-lg max-w-3xl mx-auto">
      {/* Mascot and Badge */}
      <div className="relative flex items-center mb-10 z-20 gap-10">
        <img
          src="/mascot/greetingMascot.svg"
          alt="Mascot"
          className="w-72 h-72 drop-shadow-xl"
        />

        {selectedReward ? (
          <img
            src={selectedReward.image}
            alt={selectedReward.name}
            className="w-40 h-auto object-contain drop-shadow-md"
          />
        ) : null}
        <ShareButton />
      </div>
      <div>
        <br></br>
        <br></br>
      </div>

      {/* Congratulations text */}
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        🎉 Congratulations! 🎉
      </h1>

      {/* Reward section */}
      <div className="z-20 mb-10 flex flex-col items-center gap-4 max-w-md mx-auto">
        <p className="text-3xl text-white font-semibold drop-shadow-md">
          You have unlocked:
        </p>
        <div className=" flex item center">
          <p className="text-4xl font-bold text-yellow-200 drop-shadow-lg">
            {rewardName}
          </p>
        </div>
      </div>

      {/* Continue button */}
      <a
        href={`/quiz/${level}`}
        className="px-12 py-3 bg-green-600 hover:bg-green-700 rounded-full text-white text-xl font-semibold shadow-lg transition transform hover:scale-110 z-20"
      >
        Continue to Quiz
      </a>
    </div>
  );
}

"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Trophy, CheckCircle2, Lock } from "lucide-react";

type Reward = {
  id: number;
  name: string;
  description: string;
  requiredLevel: number;
  image: string;
};

export default function RenderRewardSidebar({ level }: { level: number }) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const prevLevelRef = useRef<number>(level);
  const router = useRouter();

  // Fetch rewards once on mount
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await fetch(`/api/rewards`);
        const data: Reward[] = await res.json();
        setRewards(data);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    };

    fetchRewards();
  }, []);

  // On level change, check if any new reward unlocked and navigate
  useEffect(() => {
    const newlyUnlocked = rewards.find(
      (r) => r.requiredLevel <= level && r.requiredLevel > prevLevelRef.current
    );

    if (newlyUnlocked) {
      router.push(
        `/congratulations?reward=${encodeURIComponent(
          newlyUnlocked.name
        )}&level=${level}`
      );
    }
    prevLevelRef.current = level;
  }, [level, rewards, router]);

  const allAchieved =
    rewards.length > 0 && rewards.every((r) => level >= r.requiredLevel);

  const getProgress = (requiredLevel: number) => {
    if (level >= requiredLevel) return 100;
    return Math.floor((level / requiredLevel) * 100);
  };

  return (
    <div
      className={`p-4 rounded-2xl shadow-xl w-full max-w-sm flex flex-col bg-gradient-to-br
        ${
          allAchieved
            ? "from-green-100 to-green-200 border-2 border-green-400"
            : "from-white to-gray-50 border border-gray-300"
        }`}
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <Trophy className="w-6 h-6 text-yellow-500" />
        Your Rewards
      </h2>

      <p
        className={`mb-4 font-semibold text-center ${
          allAchieved ? "text-green-700" : "text-gray-600"
        }`}
      >
        Level {level} / 50 Levels Achieved
      </p>

      <ul
        className="space-y-4 overflow-y-auto"
        style={{ maxHeight: "600px", paddingRight: "6px" }}
      >
        {rewards.map((reward) => {
          const achieved = level >= reward.requiredLevel;
          const progress = getProgress(reward.requiredLevel);

          const handleClick = () => {
            if (achieved) {
              router.push(
                `/congratulations?reward=${encodeURIComponent(
                  reward.name
                )}&level=${level}`
              );
            }
          };

          return (
            <li
              key={reward.id}
              onClick={handleClick}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 flex gap-4 items-center cursor-pointer
                ${
                  achieved
                    ? "bg-green-50 border-green-400 hover:bg-green-100"
                    : "bg-gray-100 border-gray-300 opacity-90 hover:opacity-100 cursor-default"
                }`}
              style={{ userSelect: achieved ? "auto" : "none" }}
            >
              <img
                src={reward.image}
                alt={reward.name}
                className="w-16 h-16 object-contain rounded-lg shadow-sm flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                  <h3 className="text-md font-semibold text-gray-800 flex items-center gap-3 break-words">
                    {achieved ? (
                      <CheckCircle2
                        className="w-8 h-8 text-green-500 drop-shadow-md flex-shrink-0"
                        aria-label="Achieved"
                      />
                    ) : (
                      <Lock
                        className="w-8 h-8 text-gray-400 drop-shadow-sm flex-shrink-0"
                        aria-label="Locked"
                      />
                    )}
                    {reward.name}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    Unlocks at level {reward.requiredLevel}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2 break-words">
                  {reward.description}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 rounded bg-gray-300 overflow-hidden">
                  <div
                    className={`h-2 rounded bg-black transition-width duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Badge {
  id: string;
  name: string;
  image: string;
  description: string;
}

const allBadges: Badge[] = [
  {
    id: "bronze",
    name: "Bronze Badge",
    image: "/images/rewards/bronze-badge.png",
    description: "Awarded for scoring 5–8/10.",
  },
  {
    id: "champion",
    name: "Champion Badge",
    image: "/images/rewards/champion-badge.png",
    description: "Awarded for 9–10/10 score.",
  },
  {
    id: "master",
    name: "Master Badge",
    image: "/images/rewards/master-badge.png",
    description: "Awarded for perfect score streaks.",
  },
  {
    id: "speedster",
    name: "Speedster Badge",
    image: "/images/rewards/speedster-badge.png",
    description: "Awarded for finishing under time limit.",
  },
  {
    id: "perseverance",
    name: "Perseverance Badge",
    image: "/images/rewards/perserverance-badge.png",
    description: "Awarded for retrying and passing.",
  },
];

function getEarnedBadge(score: number): Badge | null {
  if (score >= 9) return allBadges.find((b) => b.id === "champion") ?? null;
  if (score >= 5) return allBadges.find((b) => b.id === "bronze") ?? null;
  return null;
}

interface Props {
  score: number; // current user score (0-10 scale)
}

const BadgesDisplay: React.FC<Props> = ({ score }) => {
  const [earnedBadge, setEarnedBadge] = useState<Badge | null>(null);

  useEffect(() => {
    setEarnedBadge(getEarnedBadge(score));
  }, [score]);

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      {/* Section 1: All Badges */}
      <h2 className="text-3xl font-bold mb-4 text-center">
        🏅 Available Badges
      </h2>
      <p className="text-center text-gray-600 mb-8">
        These are all the badges you can earn by playing!
      </p>
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {allBadges.map((badge) => (
          <div
            key={badge.id}
            className="w-44 p-4 border rounded-lg shadow hover:shadow-lg transition duration-200 bg-white"
          >
            <Image
              src={badge.image}
              alt={badge.name}
              width={80}
              height={80}
              className="mx-auto mb-3"
            />
            <h3 className="text-center font-semibold">{badge.name}</h3>
            <p className="text-center text-sm text-gray-600">
              {badge.description}
            </p>
          </div>
        ))}
      </div>

      {/* Section 2: Earned Badge */}
      <h2 className="text-3xl font-bold mb-4 text-center">
        🏆 Your Earned Badge
      </h2>
      {earnedBadge ? (
        <div className="w-60 mx-auto p-6 border rounded-lg shadow-lg flex flex-col items-center bg-white">
          <Image
            src={earnedBadge.image}
            alt={earnedBadge.name}
            width={100}
            height={100}
            className="mb-4"
          />
          <h3 className="text-xl font-bold">{earnedBadge.name}</h3>
          <p className="text-center text-gray-700 mb-3">
            {earnedBadge.description}
          </p>
          <p className="font-bold text-yellow-600 text-lg">
            Your Points: {score}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No badges earned. Keep playing to unlock one!
        </p>
      )}
    </div>
  );
};

export default BadgesDisplay;

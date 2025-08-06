"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Badge {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface UserBadgeRecord {
  badgeId: string;
  count: number;
}

const staticCatalog: Badge[] = [
  {
    id: "bronze",
    name: "Bronze Badge",
    image: "/images/rewards/bronze-badge.png",
    description: "Awarded for scoring at least 5 out of 10",
  },
  {
    id: "champain",
    name: "Champain Badge",
    image: "/images/rewards/champion-badge.png",
    description: "Awarded for scoring at least 9 out of 10",
  },
  {
    id: "master",
    name: "Master Badge",
    image: "/images/rewards/master-badge.png",
    description: "Awarded for perfect score streaks",
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

export default function BadgesPage({ playerId }: { playerId: string | null }) {
  const [badgeCatalog, setBadgeCatalog] = useState<Badge[]>(staticCatalog);
  const [earnedCounts, setEarnedCounts] = useState<UserBadgeRecord[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!playerId) {
        // Anonymous user: show 2 badges automatically
        setEarnedCounts([
          { badgeId: "bronze", count: 2 },
          { badgeId: "champain", count: 3 },
        ]);
        return;
      }

      try {
        const earnedRes = await fetch(`/api/userBadges?playerId=${playerId}`);
        if (!earnedRes.ok) throw new Error("Failed to fetch earned badges");
        const earnedData = await earnedRes.json();
        setEarnedCounts(earnedData);
      } catch (err) {
        console.error("Error loading badges:", err);
      }
    }

    fetchData();
  }, [playerId]);

  // Quick lookup of counts
  const earnedMap = new Map(
    earnedCounts.map((rec) => [rec.badgeId, rec.count])
  );

  // Filter just earned
  const earnedBadges = badgeCatalog.filter((b) => earnedMap.has(b.id));

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-4 text-indigo-800">
        🎖️ My Badge Collection
      </h1>
      <p className="text-center text-gray-600 mb-12">
        See what you've earned so far!
      </p>

      {/* My Collection */}
      {earnedBadges.length === 0 ? (
        <p className="text-center text-gray-500 mb-16">
          You haven't earned any badges yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="relative border-2 border-green-400 rounded-xl shadow-lg p-6 text-center bg-white hover:-translate-y-2 transition-transform"
            >
              <Image
                src={badge.image}
                width={120}
                height={120}
                alt={badge.name}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg text-green-700">{badge.name}</h3>
              <p className="text-gray-500 text-sm mt-2">{badge.description}</p>
              <p className="mt-4 text-green-600 text-md font-semibold">
                {earnedMap.get(badge.id)}{" "}
                {earnedMap.get(badge.id)! > 1 ? "times earned" : "time earned"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* All Available Badges */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        📜 All Available Badges
      </h2>
      <p className="text-center text-gray-500 mb-10">
        See every badge you can collect!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {badgeCatalog.map((badge) => (
          <div
            key={badge.id}
            className="relative border border-gray-300 rounded-xl shadow p-6 text-center bg-white hover:-translate-y-2 transition-transform"
          >
            <Image
              src={badge.image}
              width={120}
              height={120}
              alt={badge.name}
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-800">
              {badge.name}
            </h3>
            <p className="text-gray-500 text-sm mt-2">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

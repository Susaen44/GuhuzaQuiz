// lib/rewards.ts
import prisma from "@/lib/prisma";

export const getRewardsForPlayer = async (levelId: number) => {
  const rewards = await prisma.reward.findMany({
    orderBy: { requiredLevel: "asc" },
  });

  return rewards.map((reward) => ({
    id: reward.id,
    name: reward.name,
    description: reward.description,
    requiredLevel: reward.requiredLevel,
    achieved: levelId >= reward.requiredLevel,
  }));
};

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const milestones = [
  {
    Milestone_Title: "Welcome Aboard",
    Milestone_description: "You've joined the journey!",
    UnlockingLevel: 1,
    Milestone_reward_message: "You're off to a great start!",
    Milestone_Link: "https://api-ghz-v2.azurewebsites.net/api/v2/quiz?level=1",
    Milestone_Button_CTA: "Start Quiz"
  },
  {
    Milestone_Title: "First Step",
    Milestone_description: "Completed 1 quiz.",
    UnlockingLevel: 2,
    Milestone_reward_message: "Keep it going!",
    Milestone_Link: "https://yourapp.com/milestone/2",
    Milestone_Button_CTA: "Next Quiz"
  },
  {
    Milestone_Title: "Rookie Learner",
    Milestone_description: "You've hit level 3!",
    UnlockingLevel: 3,
    Milestone_reward_message: "Building the habit!",
    Milestone_Link: "https://yourapp.com/milestone/3",
    Milestone_Button_CTA: "Claim Badge"
  },
  {
    Milestone_Title: "5 Streak Hero",
    Milestone_description: "5-day quiz streak.",
    UnlockingLevel: 4,
    Milestone_reward_message: "Consistency pays off!",
    Milestone_Link: "https://yourapp.com/milestone/4",
    Milestone_Button_CTA: "Unlock XP"
  },
  {
    Milestone_Title: "Brainstorm Beginner",
    Milestone_description: "You've answered 50 questions.",
    UnlockingLevel: 5,
    Milestone_reward_message: "Great start!",
    Milestone_Link: "https://yourapp.com/milestone/5",
    Milestone_Button_CTA: "View Stats"
  },
  {
    Milestone_Title: "Level 10 Achiever",
    Milestone_description: "Double digits!",
    UnlockingLevel: 10,
    Milestone_reward_message: "Milestone level unlocked!",
    Milestone_Link: "https://yourapp.com/milestone/10",
    Milestone_Button_CTA: "Collect Points"
  },
  {
    Milestone_Title: "Quiz Machine",
    Milestone_description: "Completed 25 quizzes.",
    UnlockingLevel: 12,
    Milestone_reward_message: "You're on fire!",
    Milestone_Link: "https://yourapp.com/milestone/12",
    Milestone_Button_CTA: "Keep Going"
  },
  {
    Milestone_Title: "Knowledge Collector",
    Milestone_description: "Scored 1000 total points.",
    UnlockingLevel: 14,
    Milestone_reward_message: "You're a star!",
    Milestone_Link: "https://yourapp.com/milestone/14",
    Milestone_Button_CTA: "Celebrate"
  },
  {
    Milestone_Title: "Halfway Hero",
    Milestone_description: "You've reached level 25!",
    UnlockingLevel: 25,
    Milestone_reward_message: "Halfway to glory!",
    Milestone_Link: "https://yourapp.com/milestone/25",
    Milestone_Button_CTA: "Unlock Bonus"
  },
  {
    Milestone_Title: "Consistent Learner",
    Milestone_description: "7-day streak.",
    UnlockingLevel: 27,
    Milestone_reward_message: "Discipline wins!",
    Milestone_Link: "https://yourapp.com/milestone/27",
    Milestone_Button_CTA: "Earn XP"
  },
  {
    Milestone_Title: "Quiz King",
    Milestone_description: "Completed 100 quizzes.",
    UnlockingLevel: 30,
    Milestone_reward_message: "Amazing progress!",
    Milestone_Link: "https://yourapp.com/milestone/30",
    Milestone_Button_CTA: "View Trophy"
  },
  {
    Milestone_Title: "Sharp Thinker",
    Milestone_description: "Earned 3000 points.",
    UnlockingLevel: 32,
    Milestone_reward_message: "You're on another level!",
    Milestone_Link: "https://yourapp.com/milestone/32",
    Milestone_Button_CTA: "Redeem"
  },
  {
    Milestone_Title: "Clutch Performer",
    Milestone_description: "Perfect quiz streak!",
    UnlockingLevel: 35,
    Milestone_reward_message: "Unstoppable!",
    Milestone_Link: "https://yourapp.com/milestone/35",
    Milestone_Button_CTA: "Unlock Theme"
  },
  {
    Milestone_Title: "Level 40 Conqueror",
    Milestone_description: "You've reached level 40.",
    UnlockingLevel: 40,
    Milestone_reward_message: "Just 10 to go!",
    Milestone_Link: "https://yourapp.com/milestone/40",
    Milestone_Button_CTA: "See Rewards"
  },
  {
    Milestone_Title: "Speed Demon",
    Milestone_description: "Completed 5 quizzes in 1 day.",
    UnlockingLevel: 42,
    Milestone_reward_message: "Fast and focused!",
    Milestone_Link: "https://yourapp.com/milestone/42",
    Milestone_Button_CTA: "Go Again"
  },
  {
    Milestone_Title: "Badge Collector",
    Milestone_description: "Earned 10 badges.",
    UnlockingLevel: 44,
    Milestone_reward_message: "You're racking them up!",
    Milestone_Link: "https://yourapp.com/milestone/44",
    Milestone_Button_CTA: "Show Off"
  },
  {
    Milestone_Title: "Ultimate Quizzer",
    Milestone_description: "Reached Level 50!",
    UnlockingLevel: 50,
    Milestone_reward_message: "YOU DID IT!",
    Milestone_Link: "https://yourapp.com/milestone/50",
    Milestone_Button_CTA: "Claim Crown"
  }
];
// BADGE SEED DATA
const badges = [
  {
    id: 'bronze',
    name: 'Bronze Badge',
    image: '/images/rewards/bronze-badge.png',
    description: 'Awarded for scoring 5–8/10.',
  },
  {
    id: 'champain',
    name: 'Champain Badge',
    image: '/images/rewards/champion-badge.png',
   
    description: 'Awarded for 9–10/10 score.',
  },
  {
    id: 'master',
    name: 'Master Badge',
    image: '/images/rewards/master-badge.png',

    description: 'Awarded for perfect score streaks.',
  },
  {
    id: 'speedster',
    name: 'Speedster Badge',
    image: '/images/rewards/speedster-badge.png',
 
    description: 'Awarded for finishing under time limit.',
  },
  {
    id: 'perseverance',
    name: 'Perseverance Badge',
    image: '/images/rewards/perserverance-badge.png',
   
    description: 'Awarded for retrying and passing.',
  },
];

await prisma.badge.createMany({
  data: badges,
  skipDuplicates: true,
});


const rewards = [
  {
    name: "Bronze Beginner Badge",
    description: "Awarded for reaching Level 5. You're getting started!",
    requiredLevel: 5,
    image: "/images/rewards/bronze-badge.png",
  },
  {
    name: "Read a Book",
    description: "Unlock exclusive content after reaching Level 15.",
    requiredLevel: 15,
    image: "/images/rewards/book.png",
  },
  {
    name: "Certificate of Completion",
    description: "Finish 30 levels to earn your certificate.",
    requiredLevel: 30,
    image: "/images/rewards/certificate.png",
  },
  {
    name: "Quiz Master Badge",
    description: "Awarded at Level 45. You’re a true quizzer!",
    requiredLevel: 45,
    image: "/images/rewards/master-badge.png",
  },
  {
    name: "Elite Quiz Champion Badge",
    description: "Reach the final Level 50 to become a legend!",
    requiredLevel: 50,
    image: "/images/rewards/champion-badge.png",
  },
];

async function main() {
  for (const reward of rewards) {
    await prisma.reward.upsert({
      where: { id: reward.requiredLevel },
      update: {},
      create: reward,
    });
  }

  // Existing level, player, and milestone seeding logic...
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

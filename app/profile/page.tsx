import React from "react";
import QuizLevelSections from "../components/quizLevelSections";
import LeaderBoard from "../components/leaderBoard";
import ProfileHerosection from "../components/profileHerosection";
import LeaderBoardSection from "../components/leaderBoardSection";
import { auth } from "@/auth";
import fetchUser from "@/utils/fUser";
import LoginButton from "../components/buttons/loginBtn";
import fetchRank from "@/utils/fRanking";

async function Profile() {
  const session = await auth();
  if (session) {
    const user = session?.user;
    const name = user?.firstName == null ? "Anonymous" : user?.firstName;

    const player = await fetchUser(
      Number(user?.memberId),
      name,
      user?.email || ""
    );
    const playerPoint: number = player ? player.Playerpoint : 0;
    const playerRank = player ? await fetchRank(Number(playerPoint)) : 100;
    const playerLevel = player?.Level_Id ?? 1;

    // Ensure Level_Id is always a number and Milestone_Id is never null
    const safePlayer = player
      ? {
          ...player,
          Level_Id: player.Level_Id ?? 1,
          Milestone_Id:
            player.Milestone_Id === null ? undefined : player.Milestone_Id,
          milestone:
            player.milestone === null && player.milestone !== undefined
              ? {
                  Milestone_Id: 0,
                  Milestone_Title: "",
                  Milestone_description: "",
                  UnlockingLevel: 0,
                  Milestone_reward_message: "",
                  Milestone_Link: "",
                  Milestone_Button_CTA: "",
                }
              : player.milestone,
        }
      : undefined;

    return (
      <div className="p-6 min-h-screen">
        {safePlayer && safePlayer.milestone && (
          <ProfileHerosection player={safePlayer} playerRank={playerRank} />
        )}
        <div className="mt-12">
          <QuizLevelSections playerLevel={playerLevel} />
        </div>
        {/* Leaderboard Section */}

        <div className=" mt-12 container">
          {/* <LeaderBoard  /> */}
          <LeaderBoardSection />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full">
      <div className="px-8 my-32 rounded py-8 border-2 mx-auto w-fit bg-white">
        <div className="">
          <h1 className="title mb-5 w-32">Log in Required</h1>
          <p>You have to login in order to acess this page</p>

          <div>
            <div className="mt-5 w-full">
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

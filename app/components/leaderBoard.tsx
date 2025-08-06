import { auth } from "@/auth";
import fetchPlayers from "@/utils/fPlayers";
import fetchRank from "@/utils/fRanking";
import fetchUser from "@/utils/fUser";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";

export default async function LeaderBoard() {
  const Players = (await fetchPlayers()) || [];
  const session = await auth();
  const user = session?.user;
  const name =
    user?.firstName == null
      ? "Anonymous"
      : user?.firstName + " " + user?.lastName;

  const player = session
    ? await fetchUser(Number(user?.memberId), name, user?.email || "")
    : null;

  const playerId = session ? player?.Player_ID : null;
  const rank = player ? await fetchRank(player.Playerpoint) : 100;

  let sortedPlayers = [...Players]?.sort(
    (a, b) => b?.Playerpoint - a?.Playerpoint
  );
  let topPlayers = sortedPlayers?.slice(0, 3);

  const isPlayerInTop = topPlayers?.some((p) => p?.Player_ID === playerId);
  if (!isPlayerInTop) {
    const currentPlayer = Players?.find((p) => p?.Player_ID === playerId);
    if (currentPlayer) {
      // Remove currentPlayer if it's already in the list to avoid duplicates
      sortedPlayers = sortedPlayers.filter((p) => p?.Player_ID !== playerId);
      // Then insert them at 4th position
      sortedPlayers.splice(3, 0, currentPlayer);
    }
  }
  return (
    <div className="py-24">
      <div className="container">
        <h2 className="px-4 py-1 text-center bg-blue-400 text-4xl w-fit rounded font-bold text-gray-900 m-auto">
          Guhuza Brain Boost
        </h2>
        <p className="text-center text-lg text-gray-700">
          Level up your job search skills
        </p>
        <p className="w-96 m-auto text-center mt-6 mb-10">
          Check our top performers
        </p>
      </div>

      {/* Top 3 User Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-10">
        {topPlayers.map((player, index) => (
          <div key={player.Player_ID} className="text-center">
            <div
              className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-lg font-bold text-white
                ${
                  index === 0
                    ? "bg-yellow-400"
                    : index === 1
                    ? "bg-gray-400"
                    : "bg-amber-400"
                }`}
            >
              {player.Player_name.substring(0, 2)}
            </div>
            <p className="font-semibold text-gray-900 mt-2">
              {player.Player_name}
            </p>
            <p className="text-sm text-gray-600">{player.Playerpoint} pts</p>
            <p className="text-sm text-gray-500">
              {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"} Place
            </p>
          </div>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="border rounded-lg overflow-hidden max-w-4xl mx-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Levels
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPlayers.slice(0, 4).map((userData, index) => {
              const isCurrentUser = userData.Player_ID === playerId;
              const displayRank = isCurrentUser ? rank : index + 1;

              return (
                <tr
                  key={userData.Player_ID}
                  className={`${isCurrentUser ? "bg-blue-50" : ""} ${
                    displayRank <= 3 ? "font-medium" : ""
                  }`}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                          ${
                            displayRank === 1
                              ? "bg-yellow-100 text-yellow-800"
                              : ""
                          }
                          ${
                            displayRank === 2 ? "bg-gray-100 text-gray-800" : ""
                          }
                          ${
                            displayRank === 3
                              ? "bg-amber-100 text-amber-800"
                              : ""
                          }
                          ${displayRank > 3 ? "text-gray-500" : ""}`}
                      >
                        {displayRank}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-900">
                        {userData.Player_name}
                        {isCurrentUser && (
                          <span className="text-blue-600"> (You)</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm text-gray-900">
                        {userData.Playerpoint}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {userData.Level_Id || 0} / 50 completed
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Your Ranking */}
      <Card className="bg-blue-50 border-blue-200 max-w-4xl mx-auto mt-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium text-blue-900">Your Ranking</p>
                <p className="text-sm text-blue-700">
                  Keep going to climb the leaderboard!
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-900">#{rank}</p>
              <p className="text-2xl font-bold text-blue-900">
                {player?.Playerpoint ?? 0} pts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { fetchQuiz } from "@/utils/fQuiz";
import QuizPageSection from "@/app/components/quizPageSection";
import fetchLevels from "@/utils/fLevels";
import { auth } from "@/auth";
import fetchUser from "@/utils/fUser";

type QuizType = {
  question: string;
  comment: string;
  test_answer: number;
  answers: string[];
};

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const levelId = params.id;
  const data = await fetchQuiz(levelId);
  const Quizes = data.test.question;

  const levels = await fetchLevels();
  const levelNumber = Number(levelId);
  const levelTitle = levels?.[levelNumber - 1]?.Level_Title || "Level";

  const session = await auth();
  const user = session?.user;

  const name = user?.firstName ?? "Anonymous";

  const player = session
    ? await fetchUser(Number(user?.memberId), name, user?.email || "")
    : {};

  return (
    <div>
      <QuizPageSection
        Quizes={Quizes}
        levelNumber={levelNumber}
        levelTitle={levelTitle}
        player={player}
      />
    </div>
  );
}

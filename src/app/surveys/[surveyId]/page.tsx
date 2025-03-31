import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

const getSurvey = async (id: string) => {
  return prisma.survey.findUniqueOrThrow({
    where: {
      id,
    },
  });
};

const getQuestions = async (surveyId: string) => {
  return prisma.question.findMany({
    where: {
      surveyId: surveyId,
    },
    orderBy: {
      position: "asc",
    },
  });
};

interface PublicSurveysPageProps {
  params: {
    surveyId: string;
  };
}

export default async function PublicSurveysPage({
  params,
}: PublicSurveysPageProps) {
  const survey = await getSurvey(params.surveyId);
  const questions = await getQuestions(params.surveyId);

  const [firstQuestion] = questions;
  const startUrl = [
    "/surveys",
    params.surveyId,
    "questions",
    firstQuestion.id,
  ].join("/");

  return (
    <div className="container mx-auto my-6 flex items-center flex-col gap-6">
      <div className="text-4xl">
        <h1>
          Survey<span className="text-[#0159C9]">Up</span>
          <span>!</span>
        </h1>
      </div>
      <div className="bg-white rounded-md py-6 text-center w-full drop-shadow-1">
        {survey.introduction}
      </div>
      <Link
        href={startUrl}
        className="bg-primary uppercase font-bold text-white py-2 px-24 rounded-md"
      >
        Let&apos;s start
      </Link>
    </div>
  );
}

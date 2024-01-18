import routeHandler from "@/lib/routeHandler";
<<<<<<< HEAD
import Question from "@/schemas/Question";
import prisma from "@/lib/prisma";

export const POST = routeHandler(async (request, context) => {
  const { surveyId } = context.params;
  const survey = await prisma?.survey.findUniqueOrThrow({
=======
import prisma from "@/lib/prisma";
import Question from "@/schemas/Question";

export const GET = routeHandler(async (_, context) => {
  const { surveyId } = context.params;
  const questions = await prisma.question.findMany({
    where: {
      surveyId: surveyId,
    },
    orderBy: {
      position: "asc",
    },
  });

  return questions;
});

export const POST = routeHandler(async (request, context) => {
  const { surveyId } = context.params;
  const survey = await prisma.survey.findUniqueOrThrow({
>>>>>>> template/master
    where: {
      id: surveyId,
    },
    include: {
      questions: true,
    },
  });

  const body = await request.json();
  const validation = await Question.safeParseAsync(body);

  if (!validation.success) {
    throw validation.error;
  }

  const { data } = validation;
<<<<<<< HEAD

  // Find the highest position among existing questions
  const highestPosition = survey.questions.reduce(
    (maxPosition, question) => Math.max(maxPosition, question.position),
    0
  );

  // Set the position for the new question to be one higher than the highest position
  const newPosition = highestPosition + 1;

=======
>>>>>>> template/master
  const surveyWithQuestions = await prisma.survey.update({
    where: {
      id: surveyId,
    },
    data: {
      questions: {
        create: {
<<<<<<< HEAD
          ...data,
          position: newPosition,
=======
          position: survey.questions.length,
          ...data,
>>>>>>> template/master
        },
      },
    },
    include: {
      questions: true,
    },
  });

  return surveyWithQuestions;
});

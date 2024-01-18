import routeHandler from "@/lib/routeHandler";
import Question from "@/schemas/Question";
import prisma from "@/lib/prisma";

export const POST = routeHandler(async (request, context) => {
  const { surveyId } = context.params;
  const survey = await prisma?.survey.findUniqueOrThrow({
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

  // Find the highest position among existing questions
  const highestPosition = survey.questions.reduce(
    (maxPosition, question) => Math.max(maxPosition, question.position),
    0
  );

  // Set the position for the new question to be one higher than the highest position
  const newPosition = highestPosition + 1;

  const surveyWithQuestions = await prisma.survey.update({
    where: {
      id: surveyId,
    },
    data: {
      questions: {
        create: {
          ...data,
          position: newPosition,
        },
      },
    },
    include: {
      questions: true,
    },
  });

  return surveyWithQuestions;
});

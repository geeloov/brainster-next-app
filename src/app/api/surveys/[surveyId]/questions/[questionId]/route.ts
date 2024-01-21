import routeHandler from "@/lib/routeHandler";
import prisma from "@/lib/prisma";

export const DELETE = routeHandler(async (request, context) => {
  const { surveyId, questionId } = context.params;

  const deletedQuestion = await prisma.question.findUniqueOrThrow({
    where: { id: questionId },
  });

  // Get the position of the deleted question
  const deletedPosition = deletedQuestion.position;

  // Delete the question
  await prisma.question.delete({
    where: { id: questionId },
  });

  // Update positions of remaining questions
  await prisma.question.updateMany({
    where: {
      surveyId: surveyId,
      position: { gt: deletedPosition },
    },
    data: {
      position: {
        decrement: 1,
      },
    },
  });

  // Fetch and return the updated list of questions
  const { questions } = await prisma.survey.findUnique({
    where: {
      id: surveyId,
    },
    include: {
      questions: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  return questions;
});

export const PATCH = routeHandler(async (request, context) => {
  const { surveyId, questionId } = context.params;
  const { text, required, position } = await request.json();

  const currentQuestion = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!currentQuestion) {
    return {
      error: "Question not found",
    };
  }

  const currentPosition = currentQuestion.position;

  const totalQuestions = await prisma.question.count({
    where: {
      surveyId: surveyId,
    },
  });

  if (position !== undefined && (position < 1 || position > totalQuestions)) {
    return {
      error: `Invalid position, position must be between 1 and ${totalQuestions}`,
    };
  }

  if (position !== undefined && position !== currentPosition) {
    const shiftDirection = position > currentPosition ? -1 : 1;

    const questionsToUpdate = await prisma.question.findMany({
      where: {
        surveyId,
        position: {
          gte: Math.min(position, currentPosition),
          lte: Math.max(position, currentPosition),
        },
        id: {
          not: questionId,
        },
      },
    });

    for (const questionToUpdate of questionsToUpdate) {
      const newPosition = questionToUpdate.position + shiftDirection;

      await prisma.question.update({
        where: {
          id: questionToUpdate.id,
        },
        data: {
          position: newPosition,
        },
      });
    }
  }

  const response = await prisma.question.update({
    where: {
      id: questionId,
    },
    data: {
      text,
      required,
      position,
    },
  });

  return response;
});

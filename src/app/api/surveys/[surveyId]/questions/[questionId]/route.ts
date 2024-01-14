import routeHandler from "@/lib/routeHandler";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import SurveySchema from "@/schemas/Survey";
import QuestionSchema from "@/schemas/Question";

export const DELETE = routeHandler(async (request, context) => {
  const { surveyId, questionId } = context.params;
  const response = await prisma.survey.update({
    where: {
      id: surveyId,
    },
    data: {
      questions: {
        delete: {
          id: questionId,
        },
      },
    },
    include: {
      questions: true,
    },
  });

  return response;
});

export const PUT = routeHandler(async (request: NextRequest, context: any) => {
  const { surveyId, questionId } = context.params;

  const questionValidation = QuestionSchema.safeParse(await request.json());

  if (!questionValidation.success) {
    return {
      error: "Invalid question data",
      details: questionValidation.error.errors,
    };
  }

  const { text, required, position } = questionValidation.data;

  const totalQuestions = await prisma.question.count({
    where: {
      surveyId,
    },
  });

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

  if (position !== undefined && (position < 1 || position > totalQuestions)) {
    return {
      error: `Invalid position, position must be between 1 and ${totalQuestions}`,
    };
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

  if (position !== undefined && position !== currentQuestion.position) {
    const questionToSwap = await prisma.question.findFirst({
      where: {
        surveyId,
        position,
        id: {
          not: questionId,
        },
      },
    });

    if (questionToSwap) {
      const [firstQuestion, secondQuestion] =
        currentQuestion.position < position
          ? [currentQuestion, questionToSwap]
          : [questionToSwap, currentQuestion];

      // Shift positions for questions between the swapped questions
      const questionsToShift = await prisma.question.findMany({
        where: {
          surveyId,
          position: {
            gte: firstQuestion.position + 1,
            lte: secondQuestion.position,
          },
          id: {
            not: {
              in: [firstQuestion.id, secondQuestion.id],
            },
          },
        },
      });

      for (const questionToShift of questionsToShift) {
        const newPosition =
          questionToShift.position +
          (currentQuestion.position < position ? -1 : 1);

        await prisma.question.update({
          where: {
            id: questionToShift.id,
          },
          data: {
            position: newPosition,
          },
        });
      }

      // Swap positions directly
      await prisma.question.updateMany({
        where: {
          id: {
            in: [firstQuestion.id, secondQuestion.id],
          },
        },
        data: {
          position: secondQuestion.position,
        },
      });
    }
  }

  return response;
});

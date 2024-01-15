import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Survey from "@/schemas/Survey";
import routeHandler from "@/lib/routeHandler";

type ApiHandlerContext = {
  params: {
    surveyId: string;
  };
};

export const GET = routeHandler(async (request, context) => {
  const { surveyId } = context.params;
  const survey = await prisma.survey.findUniqueOrThrow({
    where: {
      id: surveyId,
    },
  });

  return survey;
});

export async function PATCH(request: NextRequest, context: ApiHandlerContext) {
  const { surveyId } = context.params;
  const body = await request.json();

  try {
    const validation = await Survey.safeParseAsync(body);
    if (!validation.success) {
      throw validation.error;
    }
    const { data } = validation;
    const survey = await prisma.survey.update({
      where: {
        id: surveyId,
      },
      data,
    });

    return NextResponse.json({
      data: survey,
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: "Something went wrong..",
      },
      {
        status: 500,
      }
    );
  }
}

export const PUT = routeHandler(async (request, context) => {
  const { surveyId } = context.params;
  const { name, introduction, manager, status } = await request.json();

  try {
    const survey = await prisma.survey.update({
      where: {
        id: surveyId,
      },
      data: {
        name,
        introduction,
        manager,
        status,
      },
    });

    return {
      data: survey,
    };
  } catch (error) {
    return {
      error: "Something went wrong while updating the survey.",
    };
  }
});

import SurveyForm from "@/components/SurveyForm/SurveyForm";
import SurveyFormQuestionList from "@/components/SurveyFormQuestionList/SurveyFormQuestionList";
import { SurveyDTO } from "@/types/SurveyDTO";
import { SurveyStatus } from "@prisma/client";
import prisma from "@/lib/prisma";

const getSurveyById = async (id: string) => {
  return prisma.survey.findUniqueOrThrow({
    where: {
      id,
    },
  });
};

type SurveyEditPageParams = {
  params: {
    surveyId: string;
  };
};

export default async function SurveyEditPage({
  params: { surveyId },
}: SurveyEditPageParams) {
  const survey = await getSurveyById(surveyId);
  const title = ["Edit", survey.name].join(" ");
  const edit = "Edit"

  const updateSurvey = async (formData: FormData) => {
    "use server";
    const data: Partial<SurveyDTO["data"]> = {
      name: formData.get("name") as string,
      manager: formData.get("manager") as string,
      introduction: formData.get("introduction") as string,
      status: formData.get("status") as SurveyStatus,
    };

    await fetch(`${process.env.API_URL}/surveys/${surveyId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  };


  return (
    <div className="flex flex-col gap-5">
      <SurveyForm
      edit={edit}
        title={title}
        defaultValues={survey}
        surveyAction={updateSurvey}
      />
      <SurveyFormQuestionList surveyId={surveyId} />
    </div>
  );
}

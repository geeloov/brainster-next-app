import { SurveyDTO } from "@/types/SurveyDTO";
import React from "react";

const getSurvey = async (id: string): Promise<SurveyDTO> => {
  const response = await fetch(`${process.env.API_URL}/surveys/${id}`);
  return response.json();
};

export default async function PublicSurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto my-6">{children}</div>;
}

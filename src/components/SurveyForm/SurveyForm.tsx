"use client";
import React from "react";
import { SurveyDTO } from "@/types/SurveyDTO";
import { useMemo } from "react";
import { SurveyStatus } from "@prisma/client";
import path from "path";
import { title } from "process";

interface SurveyFormProps {
  title: string;
  defaultValues?: SurveyDTO["data"];
  surveyAction: (formData: FormData) => void;
  edit: string;
}

export default function SurveyForm(props: SurveyFormProps) {
  const statusOptions = Object.values(SurveyStatus);
  const defaultValues: Partial<SurveyDTO["data"]> = useMemo(() => {
    return props.defaultValues || {};
  }, [props]);
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto w-[400px]">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">{props.title}</h2>
              </div>
            </div>
            <form action={props.surveyAction}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Survey Title</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Survey title"
                      name="name"
                      id="name"
                      defaultValue={defaultValues.name}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">
                      Introduction Message
                    </label>
                    <textarea
                      id="introduction"
                      name="introduction"
                      // type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Enter introduction message"
                      defaultValue={defaultValues.introduction}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Manager</label>
                    <input
                      defaultValue={defaultValues.manager}
                      type="email"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="E-mail"
                      id="manager"
                      name="manager"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">STATUS</label>
                    <select
                      defaultValue={defaultValues.status}
                      id="status"
                      name="status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {/* <option selected>Choose a status</option> */}
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="pt-4 flex justify-center items-center space-x-4">
                  <button className="w-full px-[15px] py-[10px] rounded-[10px] text-white bg-gradient-to-r from-[#0751c1] to-[#2e6be2]">
                    {props.edit}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

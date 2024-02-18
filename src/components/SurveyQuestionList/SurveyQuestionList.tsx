"use client";
import { QuestionsDTO } from "@/types/QuestionDTO";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function SurveyQuestionList() {
  const { questionId, surveyId } = useParams();
  const [questions, setQuestions] = useState<QuestionsDTO["data"]>([]);

  const getQuestions = useCallback(async () => {
    const response = await fetch(`/api/surveys/${surveyId}/questions`);
    const { data } = await response.json();
    setQuestions(data);
  }, [surveyId]);

  const handleAddQuestion = async () => {
    const text = prompt("Whats the question?");
    await fetch(`/api/surveys/${surveyId}/questions`, {
      method: "POST",
      body: JSON.stringify({
        text,
      }),
    });

    getQuestions();
  };

  const handleQuestionTextChange = debounce(
    async ({ target }: FormEvent<HTMLDivElement>, questionId: string) => {
      const response = await fetch(
        `/api/surveys/${surveyId}/questions/${questionId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            text: (target as any).innerText,
          }),
        }
      );
    },
    500
  );

  const handlePositionChange = async (event: SortableEvent) => {
    if (!isNumber(event.oldIndex)) return;
    const question = questions[event.oldIndex];
    const response = await fetch(
      `/api/surveys/${surveyId}/questions/${question.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          position: event.newIndex,
        }),
      }
    );
    const { data } = await response.json();
    console.log(data);
  };

  const handleQuestionRequiredChange = (questionId: string) => {
    return async (value: boolean) => {
      const response = await fetch(
        `/api/surveys/${surveyId}/questions/${questionId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            required: value,
          }),
        }
      );
      const { data } = await response.json();
      getQuestions();
    };
  };

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return (
    <div className="bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none rounded-md">
      <ul className="divide-y divide-[#eee] rounded-md">
        {questions.map((question) => (
          <li
            className={clsx("flex py-2 px-4 pl-8 relative", {
              "bg-primary": questionId === question.id,
            })}
            key={question.id}
          >
            <div
              className={clsx(
                "absolute top-1/2 transform -translate-y-1/2 left-2 w-4 h-4 bg-blue-500 rounded-full text-xs text-center",
                {
                  "bg-primary text-white": questionId !== question.id,
                  "bg-white text-primary": questionId === question.id,
                }
              )}
            >
              {question.position}
            </div>
            <div className="col-span-1">
              <Switch
                id={item.id}
                value={item.required}
                onChange={handleQuestionRequiredChange(item.id)}
              />
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <button className="hover:text-primary py-2 px-2 rounded text-lg">
                <FaClone />
              </button>
              <button className="hover:text-primary py-2 px-2 rounded text-lg">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </ReactSortable>
      <div className="w-full">
        <button
          className="bg-primary w-full py-2 text-white font-bold"
          onClick={handleAddQuestion}
        >
          Add a Question
        </button>
      </div>
    </div>
  );
}

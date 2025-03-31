"use client";
import { Question } from "@prisma/client";
import { useParams } from "next/navigation";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export default function PublicSurveyQuestionPage() {
  const [questionData, setQuestionData] = useState<Question>();
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { surveyId, questionId } = useParams();

  const getQuestionData = useCallback(async () => {
    const response = await fetch(
      `/api/surveys/${surveyId}/questions/${questionId}`
    );
    const { data } = await response.json();
    setQuestionData(data);
  }, [surveyId, questionId]);

  useEffect(() => {
    getQuestionData();
  }, [getQuestionData]);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!inputRef.current) return;
    const { currentTarget } = e;
    const formData = new FormData(currentTarget);
    const answer = formData.get("answer");

    try {
      await fetch(`/api/surveys/${surveyId}/questions/${questionId}/answers`, {
        method: "POST",
        body: JSON.stringify({ answer }),
      });

      inputRef.current.value = "";
      setSubmissionMessage("Your answer was successfully submitted!");
    } catch (e) {
      console.error("Failed to submit answer!", e);
      setSubmissionMessage(
        "Oops.. Something went wrong while submitting the answer, try again."
      );
    }
  };

  return (
    <>
      {submissionMessage && <p className="text-l font-bold text-lime-500">{submissionMessage}</p>}
      <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
        <textarea
          ref={inputRef}
          name="answer"
          rows={10}
          className="p-2"
          required={questionData?.required || false}
        ></textarea>
        <button
          type="submit"
          className="bg-primary p-2 text-white font-bold rounded-md uppercase"
        >
          Submit Answer
        </button>
      </form>
    </>
  );
}

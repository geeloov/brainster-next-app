"use client";
import {
  FormEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaClone, FaTrash } from "react-icons/fa";
import { IoReorderThreeSharp } from "react-icons/io5";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import Switch from "../Switch/Switch";
import { QuestionsDTO } from "@/types/QuestionDTO";
import { debounce, isNumber, noop } from "lodash";
// import Survey from "@/schemas/Survey";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface SurveyFormQuestionListProps {
  surveyId: string;
  // action: (formData: FormData) => void;
}

export default function SurveyFormQuestionList({
  surveyId,
}: SurveyFormQuestionListProps) {
  const [questions, setQuestions] = useState<QuestionsDTO["data"]>([]);

  const getQuestions = useCallback(async () => {
    const response = await fetch(`/api/surveys/${surveyId}/questions`);
    const { data } = await response.json();
    setQuestions(data);
  }, [surveyId]);

  const handleAddQuestion: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { currentTarget } = e;
    const formData = new FormData(currentTarget);
    const text = formData.get("question") as string;
    await fetch(`/api/surveys/${surveyId}/questions`, {
      method: "POST",
      body: JSON.stringify({
        text,
      }),
    });
    setOpenModal(false);
    getQuestions(); // Optionally re-fetch questions to update the list after deletion
  };
  const handleDeleteQuestion = async (id: string) => {
    await fetch(`/api/surveys/${surveyId}/questions/${id}`, {
      method: "DELETE",
    });
    getQuestions(); // Optionally re-fetch questions to update the list after deletion
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

  const handleDuplicateQuestion = async (question: any) => {
    const newQuestion = {
      text: question.text,
      required: question.required,
    };

    // console.log(newQuestion)
    await fetch(`/api/surveys/${surveyId}/questions`, {
      method: "POST",
      body: JSON.stringify({
        ...newQuestion,
      }),
    });

    getQuestions();
  };
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
  };

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex justify-center">
      <div className=" rounded-[20px] border border-stroke bg-white shadow-default">
        <div className="grid grid-cols-7 border-t border-stroke bg-primary text-white rounded-t-[20px] py-4.5 px-4 sm:grid-cols-9 md:px-6 2xl:px-7.5">
          <div className="col-span-1">
            <p className="font-medium">Position</p>
          </div>
          <div className="col-span-6 flex">
            <p className="font-medium">Text</p>
          </div>
          <div className="col-span-1 flex">
            <p className="font-medium">Is Required?</p>
          </div>
          <div className="col-span-1 flex ml-4">
            <p className="font-medium">Actions</p>
          </div>
        </div>
        <ReactSortable
          list={questions}
          setList={noop}
          animation={200}
          handle=".handle"
          onEnd={handlePositionChange}
        >
          {questions.map((item) => (
            <div
              className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
              key={item.id}
            >
              <div className="col-span-1 flex items-center gap-2 handle cursor-move">
                <IoReorderThreeSharp className="text-2xl" />
                {item.position}
              </div>
              <div
                className="col-span-6 flex items-center !border-0 !outline-0"
                contentEditable
                onInput={(e) => handleQuestionTextChange(e, item.id)}
                suppressContentEditableWarning={true}
              >
                {item.text}
              </div>
              <div className="col-span-1">
                <Switch />
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <button
                  className="hover:text-primary py-2 px-2 rounded text-lg"
                  onClick={() => handleDuplicateQuestion(item)}
                >
                  <FaClone />
                </button>
                {/* <form action={handleDeleteQuestion(item.id)}> */}
                <button
                  className="hover:text-primary py-2 px-2 rounded-[10px] text-lg"
                  onClick={() => handleDeleteQuestion(item.id)}
                >
                  <FaTrash />
                </button>
                {/* </form> */}
              </div>
            </div>
          ))}
        </ReactSortable>
        <div className="w-full">
          <button
            className="bg-primary w-full py-2 rounded-b-[10px] text-white font-bold"
            onClick={() => setOpenModal(true)}
          >
            Add a Question
          </button>
          <div className="flex justify-center items-center">
            <div className="mx-500 max-w-md">
            <Modal
              className="backdrop-blur flex items-center justify-center mx-500"
              show={openModal}
              onClose={() => setOpenModal(false)}
              popup
            >
                <Modal.Header className="flex items-center justify-center">
                  Add a question
                </Modal.Header>
                <Modal.Body className="text-center shadow-2xl drop-shadow-lg mx-500">
                  <form
                    className="flex flex-col gap-[30px] p-[30px]"
                    onSubmit={handleAddQuestion}
                  >
                    <input
                      type="text"
                      name="question"
                      className="input-class mb-4 p-[10px] border-2 border-indigo-600 rounded-[30px] w-full"
                      placeholder="Enter your question here"
                      required
                    />
                    <Button
                      className="bg-primary text-white flex items-center justify-center"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                </Modal.Body>
            </Modal>
              </div>
          </div>
        </div>
      </div>
    </div>

    // </div>
  );
}

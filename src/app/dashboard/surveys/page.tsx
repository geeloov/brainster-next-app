import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { FaTrashAlt, FaEye, FaPoll } from "react-icons/fa";

const getSurveys = async () => {
  return prisma.survey.findMany({});
};

const deleteSurvey = async (id: string) => {
  return prisma.survey.delete({
    where: { id },
  });
};

export default async function SurveysPage() {
  const surveys = await getSurveys();

  const handleDeleteSurvey = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    await deleteSurvey(id);
    revalidatePath("/dashboard/surveys");
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full text-center bg-white text-sm font-light">
              <thead className=" g-neutral-800 font-medium rounded-[10px] text-white bg-gradient-to-r from-[#0751c1] to-[#2e6be2]">
                <tr>
                  <th scope="col" className=" px-6 py-4">
                    Survey
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Manager
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {surveys.map((survey, index) => (
                  <tr key={survey.id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {survey.name}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <a
                        className="text-black dark:text-white"
                        href={"mailto:" + survey.manager}
                        target="_blank"
                      >
                        {survey.manager}
                      </a>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          survey.status === "ONGOING"
                            ? "text-success bg-success"
                            : survey.status === "FINISHED"
                            ? "text-danger bg-danger"
                            : "text-warning bg-warning"
                        }`}
                      >
                        {survey.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Link
                          href={"/dashboard/surveys/" + survey.id}
                          className="hover:text-primary"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          href={"/dashboard/reports/" + survey.id}
                          className="hover:text-primary"
                        >
                          <FaPoll />
                        </Link>
                        <form action={handleDeleteSurvey} className="flex">
                          <input type="hidden" name="id" value={survey.id} />
                          <button type="submit" className="hover:text-primary">
                            <FaTrashAlt />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

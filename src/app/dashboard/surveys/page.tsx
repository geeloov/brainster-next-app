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
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Manager
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
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
  );
}

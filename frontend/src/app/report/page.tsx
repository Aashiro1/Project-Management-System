import Layout from "@/components/ui/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    name: "Sample Project",
    dueDate: "2021-01-20",
    tasks: 2,
    completedTasks: 1,
    workDuration: "6 Hr/s.",
    progress: 50,
    status: "On-Progress",
  },
  {
    id: 2,
    name: "Sample Project 102",
    dueDate: "2020-12-31",
    tasks: 2,
    completedTasks: 0,
    workDuration: "0 Hr/s.",
    progress: 0,
    status: "Started",
  },
];

export default function ProjectProgressTable() {
  return (
    <Layout>
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Reports</h1>
      </div>
      <Card className="shadow-lg">
        <CardContent>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Progress</h3>
            <Button variant="outline">Print</Button>
          </div>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">#</th>
                <th className="border p-2">Project</th>
                <th className="border p-2">Task</th>
                <th className="border p-2">Completed Task</th>
                <th className="border p-2">Work Duration</th>
                <th className="border p-2">Progress</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="text-center">
                  <td className="border p-2">{project.id}</td>
                  <td className="border p-2">
                    {project.name}
                    <br />
                    <span className="text-sm text-gray-500">Due: {project.dueDate}</span>
                  </td>
                  <td className="border p-2">{project.tasks}</td>
                  <td className="border p-2">{project.completedTasks}</td>
                  <td className="border p-2">{project.workDuration}</td>
                  <td className="border p-2">
                    <Progress value={project.progress} className="w-40 mx-auto" />
                    <span className="text-sm">{project.progress}% Complete</span>
                  </td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        project.status === "On-Progress" ? "bg-green-500" : "bg-blue-500"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
    </Layout>
  );
}

"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import Layout from "@/components/ui/Layout";
import Link from "next/link";

export type Project = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status_display: string;
  progress: number;
};

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/projects/");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Function to get status color
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  const getProgress = (status: string) => {
    switch (status) {
      case "Not Started":
        return 0;
      case "In Progress":
        return 50;
      case "Completed":
        return 100;
      default:
        return 0; // Default to 0% if status is unknown
    }
  };

  return (
    <Layout>
      <main className="p-4 md:p-6 space-y-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Administrator!</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">#</th>
                  <th className="border p-2">Project</th>
                  <th className="border p-2">Progress</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border">
                    <td className="border p-2 text-center">{project.id}</td>
                    <td className="border p-2">{project.name}<br/><small>Due: {project.end_date}</small></td>
                    <td className="border p-2">
                        <Progress className="" value={getProgress(project.status_display)} />
                        <small>{getProgress(project.status_display)}% Complete</small>
                    </td>
                    <td className="border p-2">
                      <span className={`px-2 py-1 rounded text-white ${getStatusClass(project.status_display)}`}>
                        {project.status_display}
                      </span>
                    </td>
                    <td className="border p-2 text-center">
                      <Button size="sm" variant="outline">
                      <Link href={`/viewproject/${project.id}`}>View</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold">{projects.length}</h2>
              <p>Total Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold">6</h2>
              <p>Total Tasks</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </Layout>
  );
}

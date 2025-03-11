"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Toaster } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NewProjectForm from "../newproject/page";
import Layout from "@/components/ui/Layout";
import DeleteProjectDialog from "../deleteproject/page";

// Define the project type
export type Project = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status_display: string;
};

export default function ProjectList() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{ id: number; name: string } | null>(null);

// Define function outside of useEffect so it can be called when needed
const fetchProjects = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/projects/");
    const data = await response.json();
    setProjects(data);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

// Fetch projects initially
useEffect(() => {
  fetchProjects();
}, []);


    // Function to update state when a new project is added

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
  
  return (
    <Layout>
       <Toaster position="top-right" richColors />
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-semibold">Project List</h1>
          <Button onClick={() => setOpen(true)} asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="#">+ Add New Project</Link>
          </Button>

          {/* Dialog Trigger Button */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>New Project</DialogTitle>
              </DialogHeader>
              <NewProjectForm onClose={() => setOpen(false)} onProjectAdded={fetchProjects} />
              {/* <div className="flex ml-auto gap-2">
                <Button className="bg-blue-500 hover:bg-blue-600">Save</Button>
                <Button onClick={() => setOpen(false)} variant="secondary">
                  Cancel
                </Button>
              </div> */}
            </DialogContent>
          </Dialog>
        </div>

        {/* Content inside Card */}
        <Card className="shadow-lg">
          <CardContent>
            {/* Controls */}
            <div className="flex justify-between items-center">
              <div>
              Showing {projects.length} entries
              </div>
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-48"
              />
            </div>

            {/* Table */}
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Date Started</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.length > 0 ? (
                  projects.filter((project) =>
                    project.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((project, index) => (
                    <TableRow key={project.id}>
                      <TableCell>{index +1}</TableCell>
                      <TableCell>
                        <p className="font-semibold">{project.name}</p>
                        <p className="text-sm text-gray-500">{project.description}</p>
                      </TableCell>
                      <TableCell>{project.start_date}</TableCell>
                      <TableCell>{project.end_date}</TableCell>
                      <TableCell>
                        <span
                         className={`px-2 py-1 rounded text-white ${getStatusClass(project.status_display)}`}
                        >
                         {project.status_display}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedProject({ id: project.id, name: project.name });
                                 setDeleteDialogOpen(true);
                                 }}
                                  >
                                  Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No projects found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {selectedProject && (
            <DeleteProjectDialog
              projectId={selectedProject.id}
              projectName={selectedProject.name}
              isOpen={deleteDialogOpen}
              onClose={() => setDeleteDialogOpen(false)}
              onDeleteSuccess={fetchProjects}
            />
          )}
      </div>
    </Layout>
  );
}

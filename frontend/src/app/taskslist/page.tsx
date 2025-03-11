"use client";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const projects = [
  { id: 1, name: "Sample Project", task: "Sample Task 1", start: "Nov 03, 2020", due: "Jan 20, 2021", status: "On-Progress", taskStatus: "Done" },
  { id: 2, name: "Sample Project", task: "Sample Task 2", start: "Nov 03, 2020", due: "Jan 20, 2021", status: "On-Progress", taskStatus: "Pending" },
  { id: 3, name: "Sample Project 102", task: "Task Test", start: "Dec 02, 2020", due: "Dec 31, 2020", status: "Started", taskStatus: "Pending" },
  { id: 4, name: "Sample Project 102", task: "Test 23", start: "Dec 02, 2020", due: "Dec 31, 2020", status: "Started", taskStatus: "Pending" },
];

export default function TaskList() {
    
  return (
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Project Started</TableHead>
              <TableHead>Project Due Date</TableHead>
              <TableHead>Project Status</TableHead>
              <TableHead>Task Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell className="font-bold">{p.name}</TableCell>
                <TableCell>{p.task}</TableCell>
                <TableCell className="font-semibold">{p.start}</TableCell>
                <TableCell>{p.due}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-white rounded ${p.status === "On-Progress" ? "bg-blue-500" : "bg-green-500"}`}>
                    {p.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-white rounded ${p.taskStatus === "Done" ? "bg-green-500" : "bg-gray-500"}`}>
                    {p.taskStatus}
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
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  );
}

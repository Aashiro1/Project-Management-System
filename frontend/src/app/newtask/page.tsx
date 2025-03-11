"use client";

import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewTaskForm() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Task Input */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="task">Task</Label>
        <Input id="task" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter task name" />
      </div>

      {/* Description Input */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter task description" rows={5} />
      </div>

      {/* Status Dropdown */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

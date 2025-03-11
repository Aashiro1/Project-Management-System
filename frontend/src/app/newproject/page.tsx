
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { createProject } from "../api/projectApi";  // Import the API function
import {  toast } from "sonner";

export default function NewProjectForm({ onClose, onProjectAdded }: { onClose: () => void, onProjectAdded: () => void }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("pending");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [manager_id, setManager] = useState<number | "">("");
  const [user_ids, setUser] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);


  const statusMap: Record<string, number> = {
    "not-started": 0,
    "in-progress": 1,
    "completed": 2,
};

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const ProjectData = {
        name,
        status: statusMap[status] ?? 0,
        start_date: startDate ? format(startDate, "yyyy-MM-dd") : null,
        end_date: endDate ? format(endDate, "yyyy-MM-dd") : null,
        description,
        manager_id: Number(manager_id),
        user_ids: Number(user_ids)
      };

    console.log("Project data being sent:", ProjectData);  // Log the data

      await createProject(ProjectData);
      toast.success("Project created successfully!");
      onProjectAdded(); // Fetch latest projects
      onClose(); // Close the modal after saving
    } catch (error) {
      toast.error("Failed to create Project");
      console.error("Error creating project:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter project name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Not Started" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {startDate ? format(startDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                <CalendarIcon className="ml-auto h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
            </PopoverContent>
          </Popover>
        </div>

          <div className="flex flex-col space-y-2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {endDate ? format(endDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                  <CalendarIcon className="ml-auto h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
              </PopoverContent>
            </Popover>
          </div>
      
        <div className="flex flex-col space-y-2">
            <Label htmlFor="name">Manager</Label>
            <Input id="manager" type="number" placeholder="Enter project manager" value={manager_id} onChange={(e) => setManager(Number(e.target.value))} />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name">Team Members</Label>
            <Input id="team" type="number" placeholder="Enter team members" value={user_ids} onChange={(e) => setUser(Number(e.target.value))} />
          </div>  
      </div>

      <div className="mt-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter project description..."
          className="mt-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <Button onClick={handleSubmit} disabled={loading} className="bg-blue-500 hover:bg-blue-600">
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </div>
      
    </>
  );
}


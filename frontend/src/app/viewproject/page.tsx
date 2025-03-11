'use client';
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/ui/Layout";
import { Dialog, DialogContent,DialogHeader, DialogTitle} from "@/components/ui/dialog";
import Link from "next/link";
import NewTaskForm from "../newtask/page";
import TaskList from "../taskslist/page";

export default function ProjectView() {
    const [open, setOpen] = useState(false);
  return (
    <Layout>
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">View Project</h1>
      </div>
      {/* Project Details */}
      <Card className="mb-4">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="font-bold flex flex-col space-y-2">Project Name</h2>
              <p>Sample Project</p>
              <h2 className="font-bold mt-2 flex flex-col space-y-2">Description</h2>
              <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet...</p>
            </div>
            <div>
              <p><span className="font-bold flex flex-col space-y-2">Start Date:</span> November 03, 2020</p>
              <p><span className="font-bold flex flex-col space-y-2 mt-2">End Date:</span> January 20, 2021</p>
              <p><span className="font-bold flex flex-col space-y-2 mt-2">Status:</span> <Badge variant="outline">On-Progress</Badge></p>
              <p className="flex items-center gap-2 mt-2">
                <span className="font-bold">Project Manager:</span>
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/user.png" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                John Smith
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex gap-4 items-start">
      {/* Team Members */}
      <Card className="flex-1 mb-4 self-start">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          {['Claire Blake', 'George Wilson', 'Mike Williams'].map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <Avatar className="w-12 h-12">
                <AvatarFallback>{member[0]}</AvatarFallback>
              </Avatar>
              <p className="text-sm mt-1">{member}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Task List */}
      <Card className="flex-1 mb-4 self-start">
      <div className="flex justify-between  mr-6">
        <h1 className="flex justify-around font-semibold ml-7 mt-1">Task List</h1>
          <Button onClick={() => setOpen(true)} asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="#" >+ Add New Task</Link>
          </Button>
         {/* Dialog Trigger Button */}
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>New Task</DialogTitle>
              </DialogHeader>
              <NewTaskForm />
              <div className="flex ml-auto gap-2">
                <Button className="bg-blue-500 hover:bg-blue-600">Save</Button>
                <Button onClick={() => setOpen(false)} variant="secondary">Cancel</Button>
              </div>
            </DialogContent>
          </Dialog>
      </div>
        <CardContent>
          <TaskList/>
        </CardContent>
      </Card>
      </div>

      {/* Member Progress/Activity */}
      <Card className="mb-4">
      <div className="flex justify-between  mr-6">
        <h1 className="flex justify-around font-semibold ml-7 mt-1">Members Progress/Activity</h1>
          <Button onClick={() => setOpen(true)} asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="#" >+ Add Productivity</Link>
          </Button>
         {/* Dialog Trigger Button */}
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>New Task</DialogTitle>
              </DialogHeader>
              <NewTaskForm />
              <div className="flex ml-auto gap-2">
                <Button className="bg-blue-500 hover:bg-blue-600">Save</Button>
                <Button onClick={() => setOpen(false)} variant="secondary">Cancel</Button>
              </div>
            </DialogContent>
          </Dialog>
      </div>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="w-8 h-8">
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">John Smith [Sample Task 2]</p>
              <p className="text-xs text-gray-500">Dec 02, 2020 | Start: 08:00 AM | End: 10:00 AM</p>
              <Separator className="my-2 mb-4" />
              <p className="text-sm text-gray-600">Activity description...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </Layout>
  );
}

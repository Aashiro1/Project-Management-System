"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/ui/Layout";
import { Dialog, DialogContent,DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Card, CardContent} from "@/components/ui/card";
import NewTaskForm from "../newtask/page";
import Link from "next/link";
import TaskList from "../taskslist/page";

export default function MyTaskList() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Layout>
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Task List</h1>
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

      <Card className="shadow-lg">
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            Show{" "}
              <select className="border p-1 mx-2">
                <option>10</option>
                  </select>{" "}
                  entries
          </div>
          <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48" />
        </div>

        <TaskList/>
      </CardContent>
    </Card>
    </div>
    </Layout>
  );
}

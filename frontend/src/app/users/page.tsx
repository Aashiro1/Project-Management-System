'use client';
import Layout from "@/components/ui/Layout";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

const users = [
  { id: 1, name: 'Administrator', email: 'admin@admin.com', role: 'Admin' },
  { id: 2, name: 'Claire Blake', email: 'cblake@sample.com', role: 'Employee' },
  { id: 3, name: 'George Wilson', email: 'gwilson@sample.com', role: 'Employee' },
  { id: 4, name: 'John Smith', email: 'jsmith@sample.com', role: 'Project Manager' },
  { id: 5, name: 'Mike Williams', email: 'mwilliams@sample.com', role: 'Employee' },
];

export default function UserList() {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Member List</h1>
      </div>
        <Card className="shadow-lg">
        <CardContent>
        {/* Controls */}
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
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CardContent>
    </Card>
    </div>
    </Layout>
  );
}

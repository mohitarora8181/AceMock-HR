
import { useState } from "react";
import { Search, Plus, Filter, Download, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Student {
  id: string;
  name: string;
  email: string;
  position: string;
  status: "pending" | "interviewed" | "hired" | "rejected";
  interviewDate: string;
  image?: string;
}

const students: Student[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    position: "Frontend Developer",
    status: "interviewed",
    interviewDate: "2025-04-15",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: "2",
    name: "Sara Williams",
    email: "sara.williams@example.com",
    position: "UX Designer",
    status: "hired",
    interviewDate: "2025-04-10",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    position: "Backend Developer",
    status: "pending",
    interviewDate: "2025-04-20",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    position: "Product Manager",
    status: "rejected",
    interviewDate: "2025-04-05",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@example.com",
    position: "Full Stack Developer",
    status: "interviewed",
    interviewDate: "2025-04-17",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
];

const Students = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "interviewed":
        return "bg-blue-500 text-white";
      case "hired":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Students</h1>
        <Button className="gap-2 animate-scale-in">
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-in">
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {students.filter(s => s.status === "pending").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Interviews</p>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {students.filter(s => s.status === "interviewed").length}
            </div>
            <p className="text-sm text-muted-foreground">Interviewed</p>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {students.filter(s => s.status === "hired").length}
            </div>
            <p className="text-sm text-muted-foreground">Hired</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-10 transition-all duration-200 focus:ring-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" className="gap-2 transition-all duration-200 hover:bg-muted">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2 transition-all duration-200 hover:bg-muted">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="animate-fade-in">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Interview Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow 
                  key={student.id}
                  className="transition-colors hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{student.name}</span>
                        <span className="text-xs text-muted-foreground">{student.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.position}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(student.status)} capitalize`}
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(student.interviewDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Schedule interview</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit student</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete student
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Students;

import { useParams, NavLink } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  CheckCircle, 
  Clock, 
  XCircle, 
  MessageSquare 
} from "lucide-react";
import { interviews } from "@/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Student } from "@/types";

const InterviewDetails = () => {
  const { id } = useParams<{ id: string }>();
  const interview = interviews.find((i) => i.id === id);

  if (!interview) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Interview not found</h1>
        <p className="text-gray-600 mb-6">The interview you are looking for doesn't exist.</p>
        <NavLink to="/">
          <Button>Back to Dashboard</Button>
        </NavLink>
      </div>
    );
  }

  const { title, industry, type, language, experienceLevel, questions, students, createdAt } = interview;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "Completed":
        return "text-green-700 bg-green-50 border-green-200";
      case "Pending":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "No Show":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: Student["status"]) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-amber-600" />;
      case "No Show":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <NavLink to="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </NavLink>
        <h1 className="text-2xl font-bold text-primary dark:text-blue-400">{title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interview Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {industry}
                </Badge>
                <Badge variant="outline" className={type === "Technical" ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-green-50 text-green-700 border-green-200"}>
                  {type}
                </Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  {language}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Experience Level</p>
                <p className="font-medium">{experienceLevel}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Created on</p>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <p className="font-medium">{formatDate(createdAt)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-gray-500" />
                  <p className="font-medium">{students.length} Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interview Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {questions.map((question, index) => (
                  <li key={question.id} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">
                      Q{index + 1}: {question.text}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex-row justify-between items-center">
              <CardTitle className="text-lg dark:text-blue-300">Student Interviews</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {students.filter(s => s.status === "Completed").length} Completed
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  {students.filter(s => s.status === "Pending").length} Pending
                </Badge>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  {students.filter(s => s.status === "No Show").length} No Show
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {students.length > 0 ? (
                <div className="space-y-4">
                  {students.map((student) => (
                    <div 
                      key={student.id} 
                      className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 w-10 h-10 rounded-full flex items-center justify-center font-medium">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium dark:text-gray-100">{student.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{student.appliedPosition}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${getStatusColor(student.status)} dark:bg-opacity-20`}>
                          <div className="flex items-center gap-1.5">
                            {getStatusIcon(student.status)}
                            <span className="dark:text-gray-200">{student.status}</span>
                          </div>
                        </Badge>
                      </div>
                      
                      <Separator className="my-3 dark:border-gray-700" />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="dark:text-gray-300">{student.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="dark:text-gray-300">{student.phoneNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="dark:text-gray-300">{formatDate(student.interviewDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="dark:text-gray-300">{student.appliedPosition}</span>
                        </div>
                      </div>
                      
                      {student.notes && (
                        <div className="mt-3 pt-3 border-t dark:border-gray-700">
                          <div className="flex items-center gap-2 mb-1 text-sm text-gray-700 dark:text-gray-300">
                            <MessageSquare className="h-4 w-4" />
                            <span className="font-medium">Notes</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{student.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No students yet</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    No students have been assigned to this interview.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;

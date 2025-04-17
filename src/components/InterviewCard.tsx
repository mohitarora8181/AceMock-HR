
import { NavLink } from "react-router-dom";
import { CalendarClock, Users, Star, ChevronRight } from "lucide-react";
import { Interview } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InterviewCardProps {
  interview: Interview;
}

const InterviewCard = ({ interview }: InterviewCardProps) => {
  const { id, title, industry, type, language, experienceLevel, students, questions, createdAt } = interview;
  
  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Calculate completion status
  const completedInterviews = students.filter(s => s.status === "Completed").length;
  const totalInterviews = students.length;
  const completionRate = totalInterviews > 0 ? Math.round((completedInterviews / totalInterviews) * 100) : 0;

  return (
    <NavLink to={`/interview/${id}`}>
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold text-blue-700 line-clamp-1">{title}</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {industry}
            </Badge>
            <Badge variant="outline" className={type === "Technical" ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-green-50 text-green-700 border-green-200"}>
              {type}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="py-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Star className="h-4 w-4 text-amber-500" />
              <span>{experienceLevel}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <CalendarClock className="h-4 w-4 text-blue-500" />
              <span>{formattedDate}</span>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Interview Completion</span>
              <span className="font-medium">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{students.length} Students</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{questions.length} Questions</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </CardFooter>
      </Card>
    </NavLink>
  );
};

export default InterviewCard;

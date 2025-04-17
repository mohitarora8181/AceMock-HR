
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ArrowLeft, CheckCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Industry, InterviewType, Language, ExperienceLevel, Question, Interview } from "@/types";
import { getQuestionSuggestions, addInterview } from "@/data";

const CreateInterview = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState<Industry>("Technology");
  const [type, setType] = useState<InterviewType>("Technical");
  const [language, setLanguage] = useState<Language>("English");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("Mid-Level (3-5 years)");
  
  const [suggestedQuestions, setSuggestedQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [step, setStep] = useState(1);

  // Generate question suggestions based on selected parameters
  const generateSuggestions = () => {
    if (!title.trim()) {
      return;
    }
    
    const questions = getQuestionSuggestions(industry, type, language, experienceLevel);
    setSuggestedQuestions(questions);
    setStep(2);
  };

  // Toggle question selection
  const toggleQuestionSelection = (question: Question) => {
    if (selectedQuestions.some(q => q.id === question.id)) {
      setSelectedQuestions(selectedQuestions.filter(q => q.id !== question.id));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  // Create the interview
  const createInterview = () => {
    if (selectedQuestions.length === 0) {
      return;
    }

    const newInterview: Omit<Interview, "id" | "createdAt"> = {
      title,
      industry,
      type,
      language,
      experienceLevel,
      questions: selectedQuestions,
      students: []
    };

    const createdInterview = addInterview(newInterview);
    navigate(`/interview/${createdInterview.id}`);
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
        <h1 className="text-2xl font-bold text-gray-900">Create New Interview</h1>
      </div>

      <div className="flex justify-between mb-8">
        <div className="flex gap-2">
          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            1
          </div>
          <div className="border-t-2 border-gray-200 w-16 mt-4"></div>
          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">
            {step === 1 ? 'Define Interview Parameters' : 'Select Questions'}
          </p>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Interview Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Interview Title</Label>
              <Input
                id="title"
                placeholder="Enter interview title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={industry} onValueChange={(value) => setIndustry(value as Industry)}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Interview Type</Label>
                <Select value={type} onValueChange={(value) => setType(value as InterviewType)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Non-Technical">Non-Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Mandarin">Mandarin</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="Russian">Russian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select 
                  value={experienceLevel} 
                  onValueChange={(value) => setExperienceLevel(value as ExperienceLevel)}
                >
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry Level (0-1 years)">Entry Level (0-1 years)</SelectItem>
                    <SelectItem value="Junior (1-3 years)">Junior (1-3 years)</SelectItem>
                    <SelectItem value="Mid-Level (3-5 years)">Mid-Level (3-5 years)</SelectItem>
                    <SelectItem value="Senior (5-10 years)">Senior (5-10 years)</SelectItem>
                    <SelectItem value="Expert (10+ years)">Expert (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                className="w-full md:w-auto" 
                onClick={generateSuggestions}
                disabled={!title.trim()}
              >
                Generate Question Suggestions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>Suggested Questions</CardTitle>
            <div className="text-sm text-blue-600 font-medium">
              {selectedQuestions.length} questions selected
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedQuestions.length > 0 ? (
              <>
                <div className="space-y-3">
                  {suggestedQuestions.map((question) => (
                    <div
                      key={question.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        selectedQuestions.some(q => q.id === question.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Checkbox
                        id={question.id}
                        checked={selectedQuestions.some(q => q.id === question.id)}
                        onCheckedChange={() => toggleQuestionSelection(question)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={question.id}
                          className="text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          {question.text}
                        </Label>
                      </div>
                      {selectedQuestions.some(q => q.id === question.id) && (
                        <CheckCircle className="h-5 w-5 text-blue-500 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={createInterview}
                    disabled={selectedQuestions.length === 0}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Interview
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  No questions available for the selected parameters. Please adjust your selection.
                </p>
                <Button onClick={() => setStep(1)}>
                  Go Back
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreateInterview;

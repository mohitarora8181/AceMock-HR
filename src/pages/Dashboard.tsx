
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Search, Plus, Filter, BarChart3, PieChart, TrendingUp, Users } from "lucide-react";
import { interviews } from "@/data";
import InterviewCard from "@/components/InterviewCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInterviews = interviews.filter((interview) =>
    interview.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Analytics data
  const interviewsByDepartment = [
    { name: "Engineering", value: 45 },
    { name: "Marketing", value: 28 },
    { name: "Sales", value: 20 },
    { name: "HR", value: 15 },
    { name: "Finance", value: 12 },
  ];

  const monthlyInterviews = [
    { name: "Jan", interviews: 20 },
    { name: "Feb", interviews: 25 },
    { name: "Mar", interviews: 30 },
    { name: "Apr", interviews: 35 },
    { name: "May", interviews: 28 },
    { name: "Jun", interviews: 32 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground animate-fade-in">Interview Dashboard</h1>
        <NavLink to="/create-interview">
          <Button className="gap-2 animate-scale-in">
            <Plus className="h-4 w-4" />
            New Interview
          </Button>
        </NavLink>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-in">
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Total Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviews.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <PieChart className="h-4 w-4 text-primary" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Hiring Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-in">
        <Card>
          <CardHeader>
            <CardTitle>Interviews by Month</CardTitle>
            <CardDescription>Number of interviews conducted monthly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyInterviews}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-card p-2 border border-border rounded-md shadow">
                            <p className="font-medium">{`${payload[0].payload.name}`}</p>
                            <p className="text-sm">{`Interviews: ${payload[0].value}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="interviews" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} className="animate-bounce-in" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interviews by Department</CardTitle>
            <CardDescription>Distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={interviewsByDepartment}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    className="animate-scale-in"
                  >
                    {interviewsByDepartment.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-card p-2 border border-border rounded-md shadow">
                            <p className="font-medium">{`${payload[0].name}`}</p>
                            <p className="text-sm">{`Count: ${payload[0].value}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search interviews..."
            className="pl-10 transition-all duration-200 focus:ring-2 animate-fade-in"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button variant="outline" className="gap-2 transition-all duration-200 hover:bg-muted animate-fade-in">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {filteredInterviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInterviews.map((interview, index) => (
            <div 
              key={interview.id} 
              className="animate-slide-in" 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <InterviewCard interview={interview} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 animate-fade-in">
          <h3 className="text-lg font-medium text-foreground">No interviews found</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or create a new interview.
          </p>
          <NavLink to="/create-interview" className="mt-4 inline-block">
            <Button>Create Interview</Button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

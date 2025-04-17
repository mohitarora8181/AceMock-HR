
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";
import { toast } from "@/components/ui/sonner";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [browserNotifications, setBrowserNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [companyName, setCompanyName] = useState("Interview Spark Hub");
  const [adminEmail, setAdminEmail] = useState("admin@interviewsparkhub.com");

  const handleSaveProfile = () => {
    toast.success("Profile settings saved successfully!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully!");
  };

  const handleSaveAppearance = () => {
    toast.success("Appearance settings saved successfully!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="profile" className="animate-scale-in">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="animate-scale-in" style={{ animationDelay: "0.1s" }}>Notifications</TabsTrigger>
          <TabsTrigger value="appearance" className="animate-scale-in" style={{ animationDelay: "0.2s" }}>Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="animate-slide-in">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your company profile and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input 
                  id="company-name" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company Name" 
                  className="transition-all duration-200 focus:ring-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input 
                  id="admin-email" 
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  type="email" 
                  placeholder="admin@example.com" 
                  className="transition-all duration-200 focus:ring-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select 
                  id="timezone" 
                  className="w-full p-2 rounded-md border border-input"
                  defaultValue="UTC-5"
                >
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-7">Mountain Time (UTC-7)</option>
                  <option value="UTC-6">Central Time (UTC-6)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC+0">UTC</option>
                  <option value="UTC+1">Central European Time (UTC+1)</option>
                  <option value="UTC+5:30">Indian Standard Time (UTC+5:30)</option>
                  <option value="UTC+8">China Standard Time (UTC+8)</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile} className="transition-all duration-200 hover:shadow-md">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="animate-slide-in">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications about interviews and candidates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive interview updates via email</p>
                </div>
                <Switch 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="font-medium">Browser Notifications</h3>
                  <p className="text-sm text-muted-foreground">Get notified in your browser</p>
                </div>
                <Switch 
                  checked={browserNotifications}
                  onCheckedChange={setBrowserNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="font-medium">Weekly Reports</h3>
                  <p className="text-sm text-muted-foreground">Receive weekly interview analytics</p>
                </div>
                <Switch 
                  checked={weeklyReports}
                  onCheckedChange={setWeeklyReports}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications} className="transition-all duration-200 hover:shadow-md">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card className="animate-slide-in">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Theme</h3>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <input 
                      id="theme-light" 
                      type="radio" 
                      name="theme" 
                      value="light"
                      checked={theme === "light"}
                      onChange={() => setTheme("light")}
                      className="accent-primary" 
                    />
                    <Label htmlFor="theme-light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      id="theme-dark" 
                      type="radio" 
                      name="theme" 
                      value="dark"
                      checked={theme === "dark"}
                      onChange={() => setTheme("dark")}
                      className="accent-primary" 
                    />
                    <Label htmlFor="theme-dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      id="theme-system" 
                      type="radio" 
                      name="theme" 
                      value="system"
                      checked={theme === "system"}
                      onChange={() => setTheme("system")}
                      className="accent-primary" 
                    />
                    <Label htmlFor="theme-system">System</Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Font Size</h3>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">Small</Button>
                  <Button variant="outline" size="sm" className="bg-accent">Medium</Button>
                  <Button variant="outline" size="sm">Large</Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Animation</h3>
                <div className="flex items-center justify-between py-2">
                  <p className="text-sm">Enable animations</p>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAppearance} className="transition-all duration-200 hover:shadow-md">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

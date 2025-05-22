
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const SettingsPanel = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage your hotel's general settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="hotelName">Hotel Name</Label>
                <Input id="hotelName" defaultValue="Grand Hotel" />
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main Street, City, Country" />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="info@grandhotel.com" />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Default Settings</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="checkInTime">Default Check-in Time</Label>
                  <p className="text-sm text-muted-foreground">Set the default check-in time for new reservations</p>
                </div>
                <Input id="checkInTime" type="time" defaultValue="14:00" className="w-32" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="checkOutTime">Default Check-out Time</Label>
                  <p className="text-sm text-muted-foreground">Set the default check-out time for new reservations</p>
                </div>
                <Input id="checkOutTime" type="time" defaultValue="11:00" className="w-32" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how you receive notifications and alerts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch id="emailNotifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch id="smsNotifications" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="browserNotifications">Browser Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                </div>
                <Switch id="browserNotifications" defaultChecked />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Types</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newReservations">New Reservations</Label>
                  <p className="text-sm text-muted-foreground">Notify when a new reservation is made</p>
                </div>
                <Switch id="newReservations" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="checkIns">Check-ins</Label>
                  <p className="text-sm text-muted-foreground">Notify when a guest checks in</p>
                </div>
                <Switch id="checkIns" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="checkOuts">Check-outs</Label>
                  <p className="text-sm text-muted-foreground">Notify when a guest checks out</p>
                </div>
                <Switch id="checkOuts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="payments">Payments</Label>
                  <p className="text-sm text-muted-foreground">Notify when a payment is processed</p>
                </div>
                <Switch id="payments" defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your account security and password settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch id="twoFactor" />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Session Management</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoLogout">Auto Logout After Inactivity</Label>
                  <p className="text-sm text-muted-foreground">Automatically log out after a period of inactivity</p>
                </div>
                <Switch id="autoLogout" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Session Timeout (minutes)</p>
                </div>
                <Input type="number" defaultValue="30" className="w-24" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>
              Customize the look and feel of your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Theme</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch id="darkMode" />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Language</h3>
              <div>
                <Label htmlFor="language">Display Language</Label>
                <select id="language" className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Dashboard Layout</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compactView">Compact View</Label>
                  <p className="text-sm text-muted-foreground">Use a more compact layout for the dashboard</p>
                </div>
                <Switch id="compactView" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showStatistics">Show Statistics</Label>
                  <p className="text-sm text-muted-foreground">Display statistics and charts on dashboard</p>
                </div>
                <Switch id="showStatistics" defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsPanel;

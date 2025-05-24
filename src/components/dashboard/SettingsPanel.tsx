import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface Settings {
  hotel_name: string;
  address: string;
  phone: string;
  email: string;
  check_in_time: string;
  check_out_time: string;
  auto_logout: boolean;
  session_timeout: number;
  compact_view: boolean;
  show_statistics: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  browser_notifications: boolean;
  new_reservations: boolean;
  check_ins: boolean;
  check_outs: boolean;
  payments: boolean;
}

const SettingsPanel = () => {
  const [settings, setSettings] = useState<Settings>({
    hotel_name: '',
    address: '',
    phone: '',
    email: '',
    check_in_time: '14:00',
    check_out_time: '12:00',
    auto_logout: false,
    session_timeout: 30,
    compact_view: false,
    show_statistics: true,
    email_notifications: true,
    sms_notifications: false,
    browser_notifications: true,
    new_reservations: true,
    check_ins: true,
    check_outs: true,
    payments: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    sms_notifications: false,
    browser_notifications: true,
    new_reservations: true,
    check_ins: true,
    check_outs: true,
    payments: true
  });

  useEffect(() => {
    fetchSettings();
    fetchNotificationSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/settings');
      const data = await response.json();
      if (data) {
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      toast.error('Failed to load settings');
    }
  };

  const fetchNotificationSettings = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/settings/notifications');
      const data = await response.json();
      if (data) {
        setNotificationSettings(data);
      }
    } catch (error) {
      toast.error('Failed to load notification settings');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  const handleNotificationSave = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/settings/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationSettings),
      });

      if (!response.ok) {
        throw new Error('Failed to save notification settings');
      }

      toast.success('Notification settings saved successfully');
    } catch (error) {
      toast.error('Failed to save notification settings');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleNotificationSwitchChange = (name: string) => (checked: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
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
            <CardTitle>Hotel Settings</CardTitle>
            <CardDescription>
              Manage your hotel's general settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hotel_name">Hotel Name</Label>
                  <Input
                    id="hotel_name"
                    name="hotel_name"
                    value={settings.hotel_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={settings.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={settings.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={settings.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="check_in_time">Check-in Time</Label>
                  <Input
                    id="check_in_time"
                    name="check_in_time"
                    type="time"
                    value={settings.check_in_time}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="check_out_time">Check-out Time</Label>
                  <Input
                    id="check_out_time"
                    name="check_out_time"
                    type="time"
                    value={settings.check_out_time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto_logout">Auto Logout</Label>
                  <Switch
                    id="auto_logout"
                    checked={settings.auto_logout}
                    onCheckedChange={handleSwitchChange('auto_logout')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="compact_view">Compact View</Label>
                  <Switch
                    id="compact_view"
                    checked={settings.compact_view}
                    onCheckedChange={handleSwitchChange('compact_view')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show_statistics">Show Statistics</Label>
                  <Switch
                    id="show_statistics"
                    checked={settings.show_statistics}
                    onCheckedChange={handleSwitchChange('show_statistics')}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Settings</Button>
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
                <Label htmlFor="email_notifications">Email Notifications</Label>
                <Switch
                  id="email_notifications"
                  checked={notificationSettings.email_notifications}
                  onCheckedChange={handleNotificationSwitchChange('email_notifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sms_notifications">SMS Notifications</Label>
                <Switch
                  id="sms_notifications"
                  checked={notificationSettings.sms_notifications}
                  onCheckedChange={handleNotificationSwitchChange('sms_notifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="browser_notifications">Browser Notifications</Label>
                <Switch
                  id="browser_notifications"
                  checked={notificationSettings.browser_notifications}
                  onCheckedChange={handleNotificationSwitchChange('browser_notifications')}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Types</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="new_reservations">New Reservations</Label>
                  <p className="text-sm text-muted-foreground">Notify when a new reservation is made</p>
                </div>
                <Switch
                  id="new_reservations"
                  checked={notificationSettings.new_reservations}
                  onCheckedChange={handleNotificationSwitchChange('new_reservations')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="check_ins">Check-ins</Label>
                  <p className="text-sm text-muted-foreground">Notify when a guest checks in</p>
                </div>
                <Switch
                  id="check_ins"
                  checked={notificationSettings.check_ins}
                  onCheckedChange={handleNotificationSwitchChange('check_ins')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="check_outs">Check-outs</Label>
                  <p className="text-sm text-muted-foreground">Notify when a guest checks out</p>
                </div>
                <Switch
                  id="check_outs"
                  checked={notificationSettings.check_outs}
                  onCheckedChange={handleNotificationSwitchChange('check_outs')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="payments">Payments</Label>
                  <p className="text-sm text-muted-foreground">Notify when a payment is processed</p>
                </div>
                <Switch
                  id="payments"
                  checked={notificationSettings.payments}
                  onCheckedChange={handleNotificationSwitchChange('payments')}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleNotificationSave}>Save Notification Settings</Button>
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
                <Switch 
                  id="autoLogout" 
                  checked={settings.auto_logout}
                  onCheckedChange={(checked) => handleSwitchChange('auto_logout')(checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Session Timeout (minutes)</p>
                </div>
                <Input 
                  type="number" 
                  value={settings.session_timeout}
                  onChange={(e) => handleInputChange(e)}
                  className="w-24" 
                />
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
                <Switch 
                  id="compactView" 
                  checked={settings.compact_view}
                  onCheckedChange={(checked) => handleSwitchChange('compact_view')(checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showStatistics">Show Statistics</Label>
                  <p className="text-sm text-muted-foreground">Display statistics and charts on dashboard</p>
                </div>
                <Switch 
                  id="showStatistics" 
                  checked={settings.show_statistics}
                  onCheckedChange={(checked) => handleSwitchChange('show_statistics')(checked)}
                />
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

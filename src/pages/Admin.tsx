import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { AdminLogin } from '@/components/AdminLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, ArrowLeft, LogOut, Building2, Link as LinkIcon, Smartphone, Globe, Settings } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function Admin() {
  const { isAuthenticated, logout } = useAuth();
  const { 
    companies, links, apps,
    addCompany, updateCompany, deleteCompany,
    addLink, updateLink, deleteLink,
    addApp, updateApp, deleteApp
  } = useData();
  
  const [activeTab, setActiveTab] = useState('companies');
  
  // Company form
  const [companyDialog, setCompanyDialog] = useState(false);
  const [editingCompany, setEditingCompany] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [companyActive, setCompanyActive] = useState(true);
  
  // Link form
  const [linkDialog, setLinkDialog] = useState(false);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [linkCompanyId, setLinkCompanyId] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkType, setLinkType] = useState<'website' | 'admin'>('website');
  
  // App form
  const [appDialog, setAppDialog] = useState(false);
  const [editingApp, setEditingApp] = useState<string | null>(null);
  const [appCompanyId, setAppCompanyId] = useState('');
  const [appName, setAppName] = useState('');
  const [appApkUrl, setAppApkUrl] = useState('');

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => {}} />;
  }

  // Company handlers
  const openCompanyDialog = (id?: string) => {
    if (id) {
      const company = companies.find(c => c.id === id);
      if (company) {
        setEditingCompany(id);
        setCompanyName(company.name);
        setCompanyActive(company.isActive);
      }
    } else {
      setEditingCompany(null);
      setCompanyName('');
      setCompanyActive(true);
    }
    setCompanyDialog(true);
  };

  const handleCompanySubmit = () => {
    if (!companyName.trim()) return;
    if (editingCompany) {
      updateCompany(editingCompany, { name: companyName, isActive: companyActive });
    } else {
      addCompany({ name: companyName, isActive: companyActive });
    }
    setCompanyDialog(false);
  };

  // Link handlers
  const openLinkDialog = (id?: string) => {
    if (id) {
      const link = links.find(l => l.id === id);
      if (link) {
        setEditingLink(id);
        setLinkCompanyId(link.companyId);
        setLinkTitle(link.title);
        setLinkUrl(link.url);
        setLinkType(link.type);
      }
    } else {
      setEditingLink(null);
      setLinkCompanyId(companies[0]?.id || '');
      setLinkTitle('');
      setLinkUrl('');
      setLinkType('website');
    }
    setLinkDialog(true);
  };

  const handleLinkSubmit = () => {
    if (!linkCompanyId || !linkTitle.trim() || !linkUrl.trim()) return;
    if (editingLink) {
      updateLink(editingLink, { companyId: linkCompanyId, title: linkTitle, url: linkUrl, type: linkType });
    } else {
      addLink({ companyId: linkCompanyId, title: linkTitle, url: linkUrl, type: linkType });
    }
    setLinkDialog(false);
  };

  // App handlers
  const openAppDialog = (id?: string) => {
    if (id) {
      const app = apps.find(a => a.id === id);
      if (app) {
        setEditingApp(id);
        setAppCompanyId(app.companyId);
        setAppName(app.appName);
        setAppApkUrl(app.apkFileUrl);
      }
    } else {
      setEditingApp(null);
      setAppCompanyId(companies[0]?.id || '');
      setAppName('');
      setAppApkUrl('');
    }
    setAppDialog(true);
  };

  const handleAppSubmit = () => {
    if (!appCompanyId || !appName.trim() || !appApkUrl.trim()) return;
    if (editingApp) {
      updateApp(editingApp, { companyId: appCompanyId, appName: appName, apkFileUrl: appApkUrl });
    } else {
      addApp({ companyId: appCompanyId, appName: appName, apkFileUrl: appApkUrl });
    }
    setAppDialog(false);
  };

  const getCompanyName = (id: string) => companies.find(c => c.id === id)?.name || 'Unknown';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="e-life" className="h-10 w-auto" />
            </Link>
            <Badge variant="secondary" className="bg-primary/10 text-primary">Admin</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Site
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="companies" className="gap-2">
              <Building2 className="h-4 w-4" />
              Companies
            </TabsTrigger>
            <TabsTrigger value="links" className="gap-2">
              <LinkIcon className="h-4 w-4" />
              Links
            </TabsTrigger>
            <TabsTrigger value="apps" className="gap-2">
              <Smartphone className="h-4 w-4" />
              Apps
            </TabsTrigger>
          </TabsList>

          {/* Companies Tab */}
          <TabsContent value="companies">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Companies</CardTitle>
                <Dialog open={companyDialog} onOpenChange={setCompanyDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => openCompanyDialog()}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Company
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingCompany ? 'Edit' : 'Add'} Company</DialogTitle>
                      <DialogDescription>Enter the company details below.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Company Name</Label>
                        <Input
                          id="name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Enter company name"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="active"
                          checked={companyActive}
                          onCheckedChange={setCompanyActive}
                        />
                        <Label htmlFor="active">Active</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setCompanyDialog(false)}>Cancel</Button>
                      <Button onClick={handleCompanySubmit}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {companies.map(company => (
                    <div key={company.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{company.name}</span>
                        <Badge variant={company.isActive ? 'default' : 'secondary'}>
                          {company.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openCompanyDialog(company.id)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteCompany(company.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {companies.length === 0 && (
                    <p className="text-center py-8 text-muted-foreground">No companies yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Links Tab */}
          <TabsContent value="links">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Website Links</CardTitle>
                <Dialog open={linkDialog} onOpenChange={setLinkDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => openLinkDialog()}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Link
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingLink ? 'Edit' : 'Add'} Link</DialogTitle>
                      <DialogDescription>Enter the link details below.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Select value={linkCompanyId} onValueChange={setLinkCompanyId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company" />
                          </SelectTrigger>
                          <SelectContent>
                            {companies.map(c => (
                              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkTitle">Title</Label>
                        <Input
                          id="linkTitle"
                          value={linkTitle}
                          onChange={(e) => setLinkTitle(e.target.value)}
                          placeholder="Enter link title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkUrl">URL</Label>
                        <Input
                          id="linkUrl"
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={linkType} onValueChange={(v) => setLinkType(v as 'website' | 'admin')}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="website">
                              <span className="flex items-center gap-2"><Globe className="h-4 w-4" /> Website</span>
                            </SelectItem>
                            <SelectItem value="admin">
                              <span className="flex items-center gap-2"><Settings className="h-4 w-4" /> Admin Panel</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setLinkDialog(false)}>Cancel</Button>
                      <Button onClick={handleLinkSubmit}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {links.map(link => (
                    <div key={link.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        {link.type === 'website' ? (
                          <Globe className="h-5 w-5 text-primary" />
                        ) : (
                          <Settings className="h-5 w-5 text-orange" />
                        )}
                        <div>
                          <p className="font-medium">{link.title}</p>
                          <p className="text-xs text-muted-foreground">{getCompanyName(link.companyId)}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openLinkDialog(link.id)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteLink(link.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {links.length === 0 && (
                    <p className="text-center py-8 text-muted-foreground">No links yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Apps Tab */}
          <TabsContent value="apps">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Android Apps</CardTitle>
                <Dialog open={appDialog} onOpenChange={setAppDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => openAppDialog()}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add App
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingApp ? 'Edit' : 'Add'} App</DialogTitle>
                      <DialogDescription>Enter the app details below.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Select value={appCompanyId} onValueChange={setAppCompanyId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company" />
                          </SelectTrigger>
                          <SelectContent>
                            {companies.map(c => (
                              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appName">App Name</Label>
                        <Input
                          id="appName"
                          value={appName}
                          onChange={(e) => setAppName(e.target.value)}
                          placeholder="Enter app name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apkUrl">APK File URL</Label>
                        <Input
                          id="apkUrl"
                          value={appApkUrl}
                          onChange={(e) => setAppApkUrl(e.target.value)}
                          placeholder="/apks/myapp.apk or https://..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAppDialog(false)}>Cancel</Button>
                      <Button onClick={handleAppSubmit}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {apps.map(app => (
                    <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-green" />
                        <div>
                          <p className="font-medium">{app.appName}</p>
                          <p className="text-xs text-muted-foreground">{getCompanyName(app.companyId)}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openAppDialog(app.id)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteApp(app.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {apps.length === 0 && (
                    <p className="text-center py-8 text-muted-foreground">No apps yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

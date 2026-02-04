import { Globe, Settings, Download, ExternalLink } from 'lucide-react';
import { CompanyWithDetails } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CompanyCardProps {
  company: CompanyWithDetails;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const websiteLinks = company.links.filter(l => l.type === 'website');
  const adminLinks = company.links.filter(l => l.type === 'admin');

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-cyan-light/50 pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">{company.name}</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {/* Website Links */}
        {websiteLinks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              Websites
            </h4>
            <div className="space-y-1.5">
              {websiteLinks.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-colors group/link"
                >
                  <span className="flex-1 truncate">{link.title}</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-50 group-hover/link:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Admin Links */}
        {adminLinks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
              <Settings className="h-3.5 w-3.5" />
              Admin Panels
            </h4>
            <div className="space-y-1.5">
              {adminLinks.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground bg-orange/10 hover:bg-orange hover:text-primary-foreground transition-colors group/link"
                >
                  <span className="flex-1 truncate">{link.title}</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-50 group-hover/link:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Apps */}
        {company.apps.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Android Apps
            </h4>
            <div className="space-y-1.5">
              {company.apps.map(app => (
                <Button
                  key={app.id}
                  asChild
                  variant="outline"
                  className="w-full justify-start gap-2 border-green/30 text-green hover:bg-green hover:text-primary-foreground hover:border-green"
                >
                  <a href={app.apkFileUrl} download>
                    <Download className="h-4 w-4" />
                    <span className="flex-1 text-left truncate">{app.appName}</span>
                    <Badge variant="outline" className="text-[10px] ml-auto">APK</Badge>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}

        {company.links.length === 0 && company.apps.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No links or apps available
          </p>
        )}
      </CardContent>
    </Card>
  );
}

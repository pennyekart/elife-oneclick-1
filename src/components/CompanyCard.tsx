import { Globe, Settings, Download, ExternalLink, MoreHorizontal } from 'lucide-react';
import { CompanyWithDetails } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CompanyCardProps {
  company: CompanyWithDetails;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const websiteLinks = company.links.filter(l => l.type === 'website');
  const adminLinks = company.links.filter(l => l.type === 'admin');
  const primaryWebsite = websiteLinks[0];

  const hasMoreItems = websiteLinks.length > 1 || adminLinks.length > 0 || company.apps.length > 0;

  const handleCardClick = () => {
    if (primaryWebsite) {
      window.open(primaryWebsite.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="flex items-center gap-3 p-4">
          {/* Clickable area for website */}
          <div 
            onClick={handleCardClick}
            className={`flex-1 flex items-center gap-3 ${primaryWebsite ? 'cursor-pointer' : ''}`}
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-light/40 flex items-center justify-center shrink-0">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{company.name}</h3>
              {primaryWebsite ? (
                <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                  {primaryWebsite.title}
                  <ExternalLink className="h-3 w-3" />
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No website available</p>
              )}
            </div>
          </div>

          {/* More button dropdown */}
          {hasMoreItems && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="shrink-0 h-10 w-10 border-primary/20 hover:bg-primary hover:text-primary-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* Additional Websites */}
                {websiteLinks.length > 1 && (
                  <>
                    <DropdownMenuLabel className="flex items-center gap-2 text-xs">
                      <Globe className="h-3.5 w-3.5" />
                      Other Websites
                    </DropdownMenuLabel>
                    {websiteLinks.slice(1).map(link => (
                      <DropdownMenuItem key={link.id} asChild>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between"
                        >
                          <span className="truncate">{link.title}</span>
                          <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-50" />
                        </a>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </>
                )}

                {/* Admin Panels */}
                {adminLinks.length > 0 && (
                  <>
                    <DropdownMenuLabel className="flex items-center gap-2 text-xs">
                      <Settings className="h-3.5 w-3.5" />
                      Admin Panels
                    </DropdownMenuLabel>
                    {adminLinks.map(link => (
                      <DropdownMenuItem key={link.id} asChild>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between"
                        >
                          <span className="truncate">{link.title}</span>
                          <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-50" />
                        </a>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </>
                )}

                {/* Android Apps */}
                {company.apps.length > 0 && (
                  <>
                    <DropdownMenuLabel className="flex items-center gap-2 text-xs">
                      <Download className="h-3.5 w-3.5" />
                      Android Apps
                    </DropdownMenuLabel>
                    {company.apps.map(app => (
                      <DropdownMenuItem key={app.id} asChild>
                        <a
                          href={app.apkFileUrl}
                          download
                          className="flex items-center justify-between"
                        >
                          <span className="truncate">{app.appName}</span>
                          <Badge variant="outline" className="text-[10px] ml-2">APK</Badge>
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

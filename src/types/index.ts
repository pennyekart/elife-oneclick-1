export interface Company {
  id: string;
  name: string;
  isActive: boolean;
}

export interface WebsiteLink {
  id: string;
  companyId: string;
  title: string;
  url: string;
  type: 'website' | 'admin';
}

export interface App {
  id: string;
  companyId: string;
  appName: string;
  apkFileUrl: string;
}

export interface CompanyWithDetails extends Company {
  links: WebsiteLink[];
  apps: App[];
}

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Company, WebsiteLink, App, CompanyWithDetails } from '@/types';
import { companies as initialCompanies, websiteLinks as initialLinks, apps as initialApps } from '@/data/mockData';

interface DataContextType {
  companies: Company[];
  links: WebsiteLink[];
  apps: App[];
  getCompanyWithDetails: (companyId: string) => CompanyWithDetails | undefined;
  getAllCompaniesWithDetails: () => CompanyWithDetails[];
  addCompany: (company: Omit<Company, 'id'>) => void;
  updateCompany: (id: string, company: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  addLink: (link: Omit<WebsiteLink, 'id'>) => void;
  updateLink: (id: string, link: Partial<WebsiteLink>) => void;
  deleteLink: (id: string) => void;
  addApp: (app: Omit<App, 'id'>) => void;
  updateApp: (id: string, app: Partial<App>) => void;
  deleteApp: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [links, setLinks] = useState<WebsiteLink[]>(initialLinks);
  const [apps, setApps] = useState<App[]>(initialApps);

  const generateId = () => Math.random().toString(36).substring(2, 11);

  const getCompanyWithDetails = (companyId: string): CompanyWithDetails | undefined => {
    const company = companies.find(c => c.id === companyId);
    if (!company) return undefined;
    return {
      ...company,
      links: links.filter(l => l.companyId === companyId),
      apps: apps.filter(a => a.companyId === companyId),
    };
  };

  const getAllCompaniesWithDetails = (): CompanyWithDetails[] => {
    return companies
      .filter(c => c.isActive)
      .map(company => ({
        ...company,
        links: links.filter(l => l.companyId === company.id),
        apps: apps.filter(a => a.companyId === company.id),
      }));
  };

  const addCompany = (company: Omit<Company, 'id'>) => {
    setCompanies([...companies, { ...company, id: generateId() }]);
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setCompanies(companies.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCompany = (id: string) => {
    setCompanies(companies.filter(c => c.id !== id));
    setLinks(links.filter(l => l.companyId !== id));
    setApps(apps.filter(a => a.companyId !== id));
  };

  const addLink = (link: Omit<WebsiteLink, 'id'>) => {
    setLinks([...links, { ...link, id: generateId() }]);
  };

  const updateLink = (id: string, updates: Partial<WebsiteLink>) => {
    setLinks(links.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
  };

  const addApp = (app: Omit<App, 'id'>) => {
    setApps([...apps, { ...app, id: generateId() }]);
  };

  const updateApp = (id: string, updates: Partial<App>) => {
    setApps(apps.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteApp = (id: string) => {
    setApps(apps.filter(a => a.id !== id));
  };

  return (
    <DataContext.Provider value={{
      companies,
      links,
      apps,
      getCompanyWithDetails,
      getAllCompaniesWithDetails,
      addCompany,
      updateCompany,
      deleteCompany,
      addLink,
      updateLink,
      deleteLink,
      addApp,
      updateApp,
      deleteApp,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

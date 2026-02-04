import { Company, WebsiteLink, App } from '@/types';

export const companies: Company[] = [
  { id: '1', name: 'Pennyekart', isActive: true },
  { id: '2', name: 'ELIFE Society', isActive: true },
  { id: '3', name: 'Famelife', isActive: true },
  { id: '4', name: 'Entrelife', isActive: true },
  { id: '5', name: 'E-life Embryo', isActive: true },
  { id: '6', name: 'SB The Power', isActive: true },
];

export const websiteLinks: WebsiteLink[] = [
  { id: '1', companyId: '1', title: 'Pennyekart Website', url: 'https://pennyekart.com', type: 'website' },
  { id: '2', companyId: '1', title: 'Pennyekart Admin', url: 'https://admin.pennyekart.com', type: 'admin' },
  { id: '3', companyId: '2', title: 'ELIFE Society Portal', url: 'https://elifesociety.com', type: 'website' },
  { id: '4', companyId: '2', title: 'Society Admin Panel', url: 'https://admin.elifesociety.com', type: 'admin' },
  { id: '5', companyId: '3', title: 'Famelife Website', url: 'https://famelife.in', type: 'website' },
  { id: '6', companyId: '4', title: 'Entrelife Portal', url: 'https://entrelife.com', type: 'website' },
  { id: '7', companyId: '4', title: 'Entrelife Dashboard', url: 'https://dashboard.entrelife.com', type: 'admin' },
  { id: '8', companyId: '5', title: 'Embryo Website', url: 'https://elife-embryo.com', type: 'website' },
  { id: '9', companyId: '6', title: 'SB The Power', url: 'https://sbthepower.com', type: 'website' },
];

export const apps: App[] = [
  { id: '1', companyId: '1', appName: 'Pennyekart App', apkFileUrl: '/apks/pennyekart.apk' },
  { id: '2', companyId: '2', appName: 'ELIFE Society App', apkFileUrl: '/apks/elife-society.apk' },
  { id: '3', companyId: '3', appName: 'Famelife App', apkFileUrl: '/apks/famelife.apk' },
  { id: '4', companyId: '4', appName: 'Entrelife App', apkFileUrl: '/apks/entrelife.apk' },
  { id: '5', companyId: '5', appName: 'Embryo App', apkFileUrl: '/apks/embryo.apk' },
];

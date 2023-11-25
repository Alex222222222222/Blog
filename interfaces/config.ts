import { ContactType } from "./contactBadge";

interface Config {
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string[];
  baseUrl: string;
  contact: Contact[];
  sitemapBaseUrl: string[];
  author: string;
}

interface Contact {
  type: ContactType;
  link: string;
}

export default Config;

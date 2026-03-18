import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedInternship {
  title: string;
  company: string;
  location: string;
  description: string;
  link: string;
}

export async function scrapeInternships(): Promise<ScrapedInternship[]> {
  const internships: ScrapedInternship[] = [];

  try {
    // Replace with actual URL you want to scrape
    const { data } = await axios.get('https://example.com/internships');
    const $ = cheerio.load(data);

    // Use 'any' for element to avoid TypeScript namespace export issues
    $('.internship-item').each((_index: number, element: any) => {
      const title = $(element).find('.title').text().trim();
      const company = $(element).find('.company').text().trim();
      const location = $(element).find('.location').text().trim();
      const description = $(element).find('.description').text().trim();
      const link = $(element).find('a').attr('href') || '';

      if (title && company) {
        internships.push({ title, company, location, description, link });
      }
    });
  } catch (error) {
    console.error('Scraping failed:', error);
  }

  return internships;
}
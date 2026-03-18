import axios from 'axios';

export interface ApiInternship {
  title: string;
  company: string;
  location?: string;
  description: string;
  link: string;
  category: 'Engineering' | 'Medical' | 'Commerce' | 'Arts';
  duration?: string;
  eligibility?: string;
}

// RapidAPI
const RAPIDAPI_KEY = process.env['RAPIDAPI_KEY'] || '';
const INTERNSHIPS_API_HOST = process.env['INTERNSHIPS_API_HOST'] || '';

// Adzuna
const ADZUNA_API_ID = process.env['ADZUNA_API_ID'] || '';
const ADZUNA_API_KEY = process.env['ADZUNA_API_KEY'] || '';

// --- API 1: RapidAPI (Primary) ---
async function fetchFromRapidAPI(): Promise<ApiInternship[]> {
  try {
    const options = {
      method: 'GET',
      url: 'https://internships-api.p.rapidapi.com/active-jb-7d',
      params: {
        title_filter: 'intern',
        location_filter: 'India',
        limit: '10',
        offset: '0',
        description_type: 'text'
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': INTERNSHIPS_API_HOST,
        'Content-Type': 'application/json'
      },
      timeout: 5000
    };

    const response = await axios.request(options);
    
    // ✅ Direct array response
    return response.data.map((job: any) => ({
      title: job.title,
      company: job.organization,
      location: job.locations_derived?.[0]?.city || 'India',
      description: job.description_text || job.description_html || '',
      link: job.url,
      category: mapCategory(job.title),
      duration: job.employment_type?.[0] || 'Not specified',
      eligibility: 'Check website'
    }));
    
  } catch (error) {
    console.log('RapidAPI failed:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

// --- API 2: Adzuna (Backup) ---
async function fetchFromAdzuna(): Promise<ApiInternship[]> {
  try {
    const response = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/in/search/1`,
      {
        params: {
          app_id: ADZUNA_API_ID,
          app_key: ADZUNA_API_KEY,
          results_per_page: 20,
          what: 'intern',
          where: 'India',
        },
        timeout: 5000,
      }
    );

    return response.data.results.map((job: any) => ({
      title: job.title,
      company: job.company?.display_name || 'Unknown',
      location: job.location?.display_name,
      description: job.description,
      link: job.redirect_url,
      category: mapCategory(job.title),
      duration: 'Not specified',
      eligibility: 'Check website',
    }));
  } catch (error) {
    console.log('Adzuna API failed:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

// Helper to map category based on job title
function mapCategory(title: string): ApiInternship['category'] {
  const t = title.toLowerCase();
  
  if (t.includes('engineer') || t.includes('software') || t.includes('developer') || 
      t.includes('programmer') || t.includes('tech') || t.includes('data') || 
      t.includes('it ') || t.includes('computer') || t.includes('coding')) {
    return 'Engineering';
  }
  
  if (t.includes('medical') || t.includes('doctor') || t.includes('nurse') || 
      t.includes('health') || t.includes('clinical') || t.includes('pharma') || 
      t.includes('hospital')) {
    return 'Medical';
  }
  
  if (t.includes('finance') || t.includes('account') || t.includes('business') || 
      t.includes('marketing') || t.includes('sales') || t.includes('commerce') || 
      t.includes('bank') || t.includes('investment') || t.includes('ca ') || 
      t.includes('chartered')) {
    return 'Commerce';
  }
  
  if (t.includes('design') || t.includes('media') || t.includes('writing') || 
      t.includes('content') || t.includes('art') || t.includes('creative') || 
      t.includes('video') || t.includes('photo') || t.includes('ui') || 
      t.includes('ux') || t.includes('graphic')) {
    return 'Arts';
  }
  
  // default
  return 'Engineering';
}

// --- Main function (RapidAPI → Adzuna) ---
export async function fetchInternshipsFromAPIs(): Promise<ApiInternship[]> {
  console.log('Trying RapidAPI (Primary)...');
  let internships = await fetchFromRapidAPI();
  
  if (internships.length > 0) {
    console.log(`✅ RapidAPI returned ${internships.length} internships`);
    return internships;
  }

  console.log('RapidAPI failed, trying Adzuna API...');
  internships = await fetchFromAdzuna();
  
  if (internships.length > 0) {
    console.log(`✅ Adzuna returned ${internships.length} internships`);
    return internships;
  }

  console.log('❌ All APIs failed, returning empty array');
  return [];
}
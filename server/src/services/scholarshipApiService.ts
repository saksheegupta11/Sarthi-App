import axios from 'axios';

export interface ApiScholarship {
  title: string;
  description: string;
  eligibility: string;
  link: string;
  type: 'Government' | 'Private';
  deadline?: string;
  amount?: string;
}

// RapidAPI
const RAPIDAPI_KEY = process.env['RAPIDAPI_KEY'] || '';
const SCHOLARSHIPS_API_HOST = process.env['SCHOLARSHIPS_API_HOST'] || '';

// Static fallback data
const STATIC_SCHOLARSHIPS: ApiScholarship[] = [
  {
    title: "National Talent Search Scholarship (NTSE)",
    description: "Prestigious national scholarship for talented students in Class X.",
    eligibility: "Class X students, merit-based",
    link: "https://ncert.nic.in/national-talent-examination.php",
    type: "Government",
  },
  {
    title: "Prime Minister's Scholarship Scheme",
    description: "For wards of ex-servicemen and ex-coast guard personnel.",
    eligibility: "Wards of ex-servicemen, min 60% marks",
    link: "https://ksb.gov.in/pm-scholarship.htm",
    type: "Government",
  },
  {
    title: "Central Sector Scheme of Scholarships",
    description: "For college and university students from low-income families.",
    eligibility: "12th pass, family income < ₹8 lakh/year",
    link: "https://scholarships.gov.in",
    type: "Government",
  },
  {
    title: "Reliance Foundation Scholarship",
    description: "For undergraduate students in STEM and humanities.",
    eligibility: "1st year UG students, merit + need based",
    link: "https://reliancefoundation.org/scholarships",
    type: "Private",
  },
  {
    title: "L'Oréal India For Young Women in Science Scholarship",
    description: "Support for young women pursuing science education.",
    eligibility: "Girls pursuing science graduation, 12th pass",
    link: "https://www.foryoungwomeninscience.com",
    type: "Private",
  },
  {
    title: "Post-Matric Scholarship for SC/ST Students",
    description: "Financial assistance to students belonging to SC/ST categories for pursuing post-matriculation courses.",
    eligibility: "SC/ST students, family income < ₹2.5 lakh/year",
    link: "https://scholarships.gov.in",
    type: "Government",
  },
  {
    title: "Begum Hazrat Mahal National Scholarship",
    description: "For meritorious girls belonging to minority communities.",
    eligibility: "Minority girl students, Class IX to XII",
    link: "https://maef.nic.in",
    type: "Government",
  },
  {
    title: "HDFC Bank Parivartan's ECS Scholarship",
    description: "Support for meritorious and needy students from various levels of education.",
    eligibility: "Class VI to Post-graduation, merit + need based",
    link: "https://www.buddy4study.com/page/hdfc-bank-parivartans-ecs-scholarship",
    type: "Private",
  },
  {
    title: "Kotak Kanya Scholarship",
    description: "Support for meritorious girl students from underprivileged families for professional graduation.",
    eligibility: "Girl students, 12th pass, family income < ₹3 lakh/year",
    link: "https://www.kotak.com",
    type: "Private",
  },
  {
    title: "LIC HFL Vidyadhan Scholarship",
    description: "To support the education of underprivileged students.",
    eligibility: "Class 8 to Post-graduation students",
    link: "https://www.lichousing.com",
    type: "Private",
  },
];

// --- API 1: RapidAPI (Primary) ---
async function fetchFromRapidAPI(): Promise<ApiScholarship[]> {
  try {
    const host = SCHOLARSHIPS_API_HOST || 'unstop-api.p.rapidapi.com';
    const options = {
      method: 'GET',
      url: `https://${host}/workshops`,
      params: {
        page: '1'
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': host,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    };

    console.log(`Fetching from Unstop (${host})...`);
    const response = await axios.request(options);
    
    // Unstop API returns an array directly or inside a 'data' property
    const rawData = response.data.data || (Array.isArray(response.data) ? response.data : []);
    
    console.log(`✅ Success! Fetched ${rawData.length} items from Unstop.`);
    
    return rawData.map((item: any) => ({
      title: item.title || 'Scholarship/Workshop',
      description: item.description || item.short_description || 'No description available',
      eligibility: item.eligibility || 'Open to all students',
      link: item.reg_url || item.url || '#',
      type: 'Private' as const,
      deadline: item.end_date || item.deadline,
    }));
  } catch (error) {
    console.log('Unstop API failed, trying Internship API as backup...');
    
    // Backup: Use the working internship host with 'scholarship' keyword
    try {
      const backupHost = 'internships-api.p.rapidapi.com';
      const backupResponse = await axios.get(`https://${backupHost}/active-jb-7d`, {
        params: {
          title_filter: 'scholarship',
          location_filter: 'India',
          limit: '10'
        },
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': backupHost
        },
        timeout: 5000
      });

      return backupResponse.data.map((item: any) => ({
        title: item.title,
        description: item.description_text || 'Scholarship opportunity',
        eligibility: item.locations_derived?.[0]?.city || 'India',
        link: item.url,
        type: 'Private' as const,
        deadline: item.post_date
      }));
    } catch (backupError) {
      console.log('Backup API also failed.');
      return [];
    }
  }
}


// --- Function to merge and deduplicate scholarships from multiple sources ---
function mergeScholarships(arrays: ApiScholarship[][]): ApiScholarship[] {
  const seen = new Set<string>();
  const result: ApiScholarship[] = [];

  for (const arr of arrays) {
    for (const item of arr) {
      if (!seen.has(item.title)) {
        seen.add(item.title);
        result.push(item);
      }
    }
  }

  return result;
}

// --- Main function that merges API and static data ---
export async function fetchScholarshipsFromAPIs(): Promise<ApiScholarship[]> {
  console.log('Fetching scholarships from RapidAPI...');
  
  try {
    const rapidResults = await fetchFromRapidAPI();
    
    // RapidAPI is primary, followed by our curated static data
    const merged = mergeScholarships([
      rapidResults,
      STATIC_SCHOLARSHIPS
    ]);
    
    console.log(`✅ Returned ${merged.length} scholarships (${rapidResults.length} from RapidAPI)`);
    return merged;
  } catch (error) {
    console.error('Scholarship fetch error:', error);
    return STATIC_SCHOLARSHIPS;
  }
}
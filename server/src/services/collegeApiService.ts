import axios from 'axios';

export interface ApiCollege {
  name: string;
  location: string;
  type: 'Government' | 'Private';
  courses: string[];
  eligibility: string;
  link: string;
  image?: string;
  rating?: number;
}

interface HipoUniversity {
  name: string;
  country: string;
  web_pages: string[];
  domains: string[];
  "state-province": string | null;
}

const STATIC_COLLEGES: ApiCollege[] = [
  {
    name: "Indian Institute of Technology (IIT) Bombay",
    location: "Mumbai, Maharashtra",
    type: "Government",
    courses: ["B.Tech", "M.Tech", "PhD", "MBA"],
    eligibility: "JEE Advanced",
    link: "https://acad.iitb.ac.in",
    rating: 4.8,
  },
  {
    name: "Birla Institute of Technology and Science (BITS) Pilani",
    location: "Pilani, Rajasthan",
    type: "Private",
    courses: ["B.E", "M.E", "MBA", "M.Sc"],
    eligibility: "BITSAT",
    link: "https://www.bits-pilani.ac.in",
    rating: 4.7,
  },
  {
    name: "National Institute of Technology (NIT) Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    type: "Government",
    courses: ["B.Tech", "M.Tech", "MCA", "MBA"],
    eligibility: "JEE Main",
    link: "https://www.nitt.edu",
    rating: 4.6,
  },
  {
    name: "Vellore Institute of Technology (VIT)",
    location: "Vellore, Tamil Nadu",
    type: "Private",
    courses: ["B.Tech", "M.Tech", "MCA", "MBA"],
    eligibility: "VITEEE",
    link: "https://vit.ac.in",
    rating: 4.4,
  },
  {
    name: "Delhi Technological University (DTU)",
    location: "New Delhi",
    type: "Government",
    courses: ["B.Tech", "M.Tech", "MBA", "Design"],
    eligibility: "JEE Main",
    link: "https://www.dtu.ac.in",
    rating: 4.5,
  },
];

const CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours
let collegeCache: { data: ApiCollege[]; timestamp: number } | null = null;

async function fetchFromHipolabs(): Promise<ApiCollege[]> {
  try {
    console.log('Fetching from Hipolabs API...');
    const response = await axios.get<HipoUniversity[]>(
      'http://universities.hipolabs.com/search?country=India',
      { timeout: 8000 } // Increased timeout
    );

    return response.data.map((uni) => ({
      name: uni.name,
      location: uni['state-province'] ? `${uni['state-province']}, India` : 'India',
      type: 'Government', 
      courses: ['Bachelors', 'Masters'], 
      eligibility: 'Contact institution',
      link: uni.web_pages[0] || `https://${uni.domains[0]}`,
      rating: 4.0, 
    }));
  } catch (error) {
    console.error('Hipo API failed:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

export async function fetchCollegesFromAPIs(): Promise<ApiCollege[]> {
  // Check cache first
  if (collegeCache && Date.now() - collegeCache.timestamp < CACHE_TTL) {
    console.log('✅ Serving colleges from cache');
    return collegeCache.data;
  }

  try {
    const apiColleges = await fetchFromHipolabs();
    const seen = new Set<string>();
    const result: ApiCollege[] = [];

    // 1. Static Premium Data
    for (const c of STATIC_COLLEGES) {
      if (!seen.has(c.name)) {
        seen.add(c.name);
        result.push(c);
      }
    }

    // 2. API Data
    for (const c of apiColleges) {
      if (!seen.has(c.name)) {
        seen.add(c.name);
        result.push(c);
      }
    }

    const finalData = result.slice(0, 150);
    
    // Update cache
    collegeCache = {
      data: finalData,
      timestamp: Date.now(),
    };

    console.log(`✅ Loaded ${finalData.length} colleges (${STATIC_COLLEGES.length} static, ${apiColleges.length} from API)`);
    return finalData;
  } catch (error) {
    console.log('API merge failed, using static data only');
    return STATIC_COLLEGES;
  }
}



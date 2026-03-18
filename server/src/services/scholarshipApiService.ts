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
  // Add more static scholarships as needed
];

// --- API 1: 360Giving API (grants/scholarships data) ---
async function fetchFrom360Giving(): Promise<ApiScholarship[]> {
  try {
    // 360Giving API endpoint for grants
    const response = await axios.get(
      'https://grantnav.threesixtygiving.org/api/grants.json',
      {
        params: {
          'funding_organisation.name': 'india', // Filter for India-related grants
          limit: 20,
        },
        timeout: 5000,
      }
    );

    return response.data.results.map((grant: any) => ({
      title: grant.title || 'Scholarship Opportunity',
      description: grant.description || 'No description available',
      eligibility: grant.beneficiary_location?.[0]?.name || 'Check website',
      link: grant.URL || grant['360g_grantDOI'] || '#',
      type: 'Private',
      amount: grant.amountAwarded ? `₹${grant.amountAwarded}` : undefined,
      deadline: grant.plannedDates?.endDate,
    }));
  } catch (error) {
    console.log('360Giving API failed:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

// --- API 2: Bud4Study (via their partner API if available) ---
// Note: Bud4Study doesn't have public API, but we can use their partner API
async function fetchFromBuddy4Study(): Promise<ApiScholarship[]> {
  try {
    // This is a placeholder - you'd need to get API access from Buddy4Study
    // For now, return empty array so fallback works
    return [];
  } catch (error) {
    return [];
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

// --- Main function that tries all APIs in sequence ---
export async function fetchScholarshipsFromAPIs(): Promise<ApiScholarship[]> {
  console.log('Trying 360Giving API...');
  const from360Giving = await fetchFrom360Giving();
  
  if (from360Giving.length > 0) {
    console.log(`✅ 360Giving returned ${from360Giving.length} scholarships`);
    return from360Giving;
  }

  console.log('API failed or empty, using static scholarship data');
  return STATIC_SCHOLARSHIPS;
}

// --- Alternative: Try all APIs in parallel and merge results ---
export async function fetchScholarshipsParallel(): Promise<ApiScholarship[]> {
  try {
    const results = await Promise.allSettled([
      fetchFrom360Giving(),
      fetchFromBuddy4Study(),
    ]);

    const successfulResults: ApiScholarship[][] = [];

    for (const result of results) {
      if (result.status === 'fulfilled' && result.value.length > 0) {
        successfulResults.push(result.value);
      }
    }

    if (successfulResults.length > 0) {
      const merged = mergeScholarships(successfulResults);
      console.log(`✅ Merged ${merged.length} scholarships from ${successfulResults.length} APIs`);
      return merged;
    }

    console.log('All APIs failed, using static data');
    return STATIC_SCHOLARSHIPS;
  } catch (error) {
    console.log('Parallel fetch failed, using static data');
    return STATIC_SCHOLARSHIPS;
  }
}
export type City = {
  name: string;
  country: string;
  lat: number;
  lng: number;
};

export const CITIES: City[] = [
  { name: "Palm Beach", country: "United States", lat: 26.7056, lng: -80.0364 },
  { name: "Mountain View", country: "United States", lat: 37.3861, lng: -122.0839 },
  { name: "West Palm Beach", country: "United States", lat: 26.7153, lng: -80.0534 },
  { name: "Charlotte Amalie", country: "U.S. Virgin Islands", lat: 18.3419, lng: -64.9307 },
  { name: "Chelyabinsk", country: "Russia", lat: 55.1644, lng: 61.4368 },
  { name: "Columbus", country: "United States", lat: 39.9612, lng: -82.9988 },
  { name: "Old Westbury", country: "United States", lat: 40.7887, lng: -73.599 },
  { name: "Little Rock", country: "United States", lat: 34.7465, lng: -92.2896 },
  { name: "Košice", country: "Slovakia", lat: 48.7164, lng: 21.2611 },
  { name: "Syracuse", country: "United States", lat: 43.0481, lng: -76.1474 },
  { name: "Tallahassee", country: "United States", lat: 30.4383, lng: -84.2807 },
  { name: "Middlebury", country: "United States", lat: 44.0153, lng: -73.1676 },
  { name: "Las Palmas", country: "Spain", lat: 28.1235, lng: -15.4363 },
  { name: "Bratislava", country: "Slovakia", lat: 48.1486, lng: 17.1077 },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041 },
  { name: "Almaty", country: "Kazakhstan", lat: 43.222, lng: 76.8512 },
  { name: "Athens", country: "Greece", lat: 37.9838, lng: 23.7275 },
  { name: "Auckland", country: "New Zealand", lat: -36.8509, lng: 174.7645 },
  { name: "Baghdad", country: "Iraq", lat: 33.3152, lng: 44.3661 },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
  { name: "Barcelona", country: "Spain", lat: 41.3874, lng: 2.1686 },
  { name: "Beijing", country: "China", lat: 39.9042, lng: 116.4074 },
  { name: "Beirut", country: "Lebanon", lat: 33.8938, lng: 35.5018 },
  { name: "Belgrade", country: "Serbia", lat: 44.7866, lng: 20.4489 },
  { name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
  { name: "Bogotá", country: "Colombia", lat: 4.711, lng: -74.0721 },
  { name: "Boston", country: "United States", lat: 42.3601, lng: -71.0589 },
  { name: "Brussels", country: "Belgium", lat: 50.8503, lng: 4.3517 },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816 },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 },
  { name: "Cambridge", country: "United Kingdom", lat: 52.2053, lng: 0.1218 },
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241 },
  { name: "Caracas", country: "Venezuela", lat: 10.4806, lng: -66.9036 },
  { name: "Chicago", country: "United States", lat: 41.8781, lng: -87.6298 },
  { name: "Copenhagen", country: "Denmark", lat: 55.6761, lng: 12.5683 },
  { name: "Dakar", country: "Senegal", lat: 14.7167, lng: -17.4677 },
  { name: "Dallas", country: "United States", lat: 32.7767, lng: -96.797 },
  { name: "Delhi", country: "India", lat: 28.6139, lng: 77.209 },
  { name: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125 },
  { name: "Dubai", country: "United Arab Emirates", lat: 25.2048, lng: 55.2708 },
  { name: "Dublin", country: "Ireland", lat: 53.3498, lng: -6.2603 },
  { name: "Fairbanks", country: "United States", lat: 64.8378, lng: -147.7164 },
  { name: "Frankfurt", country: "Germany", lat: 50.1109, lng: 8.6821 },
  { name: "Geneva", country: "Switzerland", lat: 46.2044, lng: 6.1432 },
  { name: "George Town", country: "Cayman Islands", lat: 19.2869, lng: -81.3674 },
  { name: "Guangzhou", country: "China", lat: 23.1291, lng: 113.2644 },
  { name: "Hamburg", country: "Germany", lat: 53.5511, lng: 9.9937 },
  { name: "Hanoi", country: "Vietnam", lat: 21.0278, lng: 105.8342 },
  { name: "Helsinki", country: "Finland", lat: 60.1699, lng: 24.9384 },
  { name: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694 },
  { name: "Houston", country: "United States", lat: 29.7604, lng: -95.3698 },
  { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784 },
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456 },
  { name: "Johannesburg", country: "South Africa", lat: -26.2041, lng: 28.0473 },
  { name: "Karachi", country: "Pakistan", lat: 24.8607, lng: 67.0011 },
  { name: "Kyiv", country: "Ukraine", lat: 50.4501, lng: 30.5234 },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792 },
  { name: "Lima", country: "Peru", lat: -12.0464, lng: -77.0428 },
  { name: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393 },
  { name: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278 },
  { name: "Los Angeles", country: "United States", lat: 34.0522, lng: -118.2437 },
  { name: "Luanda", country: "Angola", lat: -8.8147, lng: 13.2302 },
  { name: "Luxembourg", country: "Luxembourg", lat: 49.6116, lng: 6.1319 },
  { name: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 },
  { name: "Manama", country: "Bahrain", lat: 26.2235, lng: 50.5876 },
  { name: "Manaus", country: "Brazil", lat: -3.119, lng: -60.0217 },
  { name: "Manila", country: "Philippines", lat: 14.5995, lng: 120.9842 },
  { name: "Marseille", country: "France", lat: 43.2965, lng: 5.3698 },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 },
  { name: "Miami", country: "United States", lat: 25.7617, lng: -80.1918 },
  { name: "Milan", country: "Italy", lat: 45.4642, lng: 9.19 },
  { name: "Mombasa", country: "Kenya", lat: -4.0435, lng: 39.6682 },
  { name: "Montreal", country: "Canada", lat: 45.5019, lng: -73.5674 },
  { name: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6173 },
  { name: "Mumbai", country: "India", lat: 19.076, lng: 72.8777 },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219 },
  { name: "New York", country: "United States", lat: 40.7128, lng: -74.006 },
  { name: "Nuuk", country: "Greenland", lat: 64.1814, lng: -51.6941 },
  { name: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522 },
  { name: "Panama City", country: "Panama", lat: 8.9824, lng: -79.5199 },
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { name: "Piraeus", country: "Greece", lat: 37.9421, lng: 23.6461 },
  { name: "Prague", country: "Czechia", lat: 50.0755, lng: 14.4378 },
  { name: "Reykjavik", country: "Iceland", lat: 64.1466, lng: -21.9426 },
  { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729 },
  { name: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753 },
  { name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
  { name: "Rotterdam", country: "Netherlands", lat: 51.9244, lng: 4.4777 },
  { name: "San Francisco", country: "United States", lat: 37.7749, lng: -122.4194 },
  { name: "Santiago", country: "Chile", lat: -33.4489, lng: -70.6693 },
  { name: "São Paulo", country: "Brazil", lat: -23.5558, lng: -46.6396 },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.978 },
  { name: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 },
  { name: "Shenzhen", country: "China", lat: 22.5431, lng: 114.0579 },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686 },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { name: "Taipei", country: "Taiwan", lat: 25.033, lng: 121.5654 },
  { name: "Tehran", country: "Iran", lat: 35.6892, lng: 51.389 },
  { name: "Tel Aviv", country: "Israel", lat: 32.0853, lng: 34.7818 },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { name: "Tripoli", country: "Libya", lat: 32.8872, lng: 13.1913 },
  { name: "Tunis", country: "Tunisia", lat: 36.8065, lng: 10.1815 },
  { name: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207 },
  { name: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738 },
  { name: "Warsaw", country: "Poland", lat: 52.2297, lng: 21.0122 },
  { name: "Washington", country: "United States", lat: 38.9072, lng: -77.0369 },
  { name: "Yangon", country: "Myanmar", lat: 16.8409, lng: 96.1735 },
  { name: "Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417 },
];

export function searchCities(query: string, limit = 8): City[] {
  const q = query.trim().toLowerCase();
  if (!q) return CITIES.slice(0, limit);
  const scored = CITIES.map((c) => {
    const name = c.name.toLowerCase();
    const country = c.country.toLowerCase();
    let score = 99;
    if (name === q) score = 0;
    else if (name.startsWith(q)) score = 1;
    else if (name.includes(q)) score = 2;
    else if (country.startsWith(q)) score = 3;
    else if (country.includes(q)) score = 4;
    else return null;
    return { c, score };
  }).filter((x): x is { c: City; score: number } => x !== null);
  scored.sort((a, b) => a.score - b.score || a.c.name.localeCompare(b.c.name));
  return scored.slice(0, limit).map((x) => x.c);
}

export function nearestCity(lat: number, lng: number): City {
  let best = CITIES[0]!;
  let bestD = Number.POSITIVE_INFINITY;
  for (const c of CITIES) {
    const dLat = c.lat - lat;
    const dLng = c.lng - lng;
    const d = dLat * dLat + dLng * dLng;
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best;
}

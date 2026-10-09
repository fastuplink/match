/**
 * Kora Match - Fixtures Sync Script
 * Fetches latest football matches from API-Football and updates data/matches.json
 */

const fs = require('fs');
const path = require('path');

// Try loading .env if exists (without requiring external dotenv package)
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
    try {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...valueParts] = trimmed.split('=');
                if (key && valueParts.length > 0) {
                    process.env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
                }
            }
        });
    } catch (e) {
        console.warn('Note: Could not parse .env file');
    }
}

// Global fetch fallback for older Node versions
let fetchFn = global.fetch;
if (!fetchFn) {
    try {
        fetchFn = require('node-fetch');
    } catch (e) {
        console.error('Fetch is not available. Please run in Node 18+ or install node-fetch.');
    }
}

const API_KEY = process.env.API_FOOTBALL_KEY;
const API_BASE = 'https://v3.football.api-sports.io';

// Priority leagues and category mapping
const LEAGUE_CATEGORIES = {
    // Egyptian
    233: 'egyptian', // Egyptian Premier League
    234: 'egyptian', // Egypt Cup

    // African Clubs
    12: 'african_club', // CAF Champions League
    20: 'african_club', // CAF Confederation Cup
    538: 'african_club', // CAF Super Cup

    // European Clubs
    2: 'european_club',   // UEFA Champions League
    3: 'european_club',   // UEFA Europa League
    848: 'european_club', // UEFA Conference League
    39: 'european_club',  // Premier League
    140: 'european_club', // La Liga
    135: 'european_club', // Serie A
    78: 'european_club',  // Bundesliga
    61: 'european_club',  // Ligue 1
    531: 'european_club', // UEFA Super Cup

    // National Teams
    1: 'national',  // World Cup
    4: 'national',  // Euro Championship
    5: 'national',  // UEFA Nations League
    6: 'national',  // Africa Cup of Nations
    7: 'national',  // Asian Cup
    9: 'national',  // Copa America
    10: 'national', // Friendlies
    29: 'national', // World Cup Qual. Africa
    32: 'national'  // World Cup Qual. Europe
};

// Paths
const DATA_DIR = path.join(__dirname, '..', 'data');
const MATCHES_FILE = path.join(DATA_DIR, 'matches.json');
const BROADCASTS_FILE = path.join(DATA_DIR, 'broadcasts.json');

// Helper to format date YYYY-MM-DD
function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// Load broadcasts data
function loadBroadcasts() {
    if (fs.existsSync(BROADCASTS_FILE)) {
        try {
            return JSON.parse(fs.readFileSync(BROADCASTS_FILE, 'utf8'));
        } catch (e) {
            console.warn('Warning: Could not parse broadcasts.json');
        }
    }
    return { leagues: {}, default: {} };
}

async function fetchFixturesForDate(dateStr) {
    console.log(`Fetching fixtures for ${dateStr}...`);
    const url = `${API_BASE}/fixtures?date=${dateStr}`;
    
    const response = await fetchFn(url, {
        method: 'GET',
        headers: {
            'x-apisports-key': API_KEY,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    if (json.errors && Object.keys(json.errors).length > 0) {
        console.warn('API returned errors:', json.errors);
    }
    return json.response || [];
}

async function main() {
    console.log('--- Starting Football Fixtures Sync ---');

    if (!API_KEY || API_KEY === 'your_api_football_key_here') {
        console.warn('⚠️ Warning: No valid API_FOOTBALL_KEY found.');
        console.warn('To sync live data from API-Football, set API_FOOTBALL_KEY in .env or GitHub Secrets.');
        
        if (fs.existsSync(MATCHES_FILE)) {
            console.log('Keeping existing data in data/matches.json.');
            process.exit(0);
        } else {
            console.log('No matches.json found. Creating default empty structure.');
            if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
            fs.writeFileSync(MATCHES_FILE, JSON.stringify({ lastUpdated: new Date().toISOString(), matches: [] }, null, 2));
            process.exit(0);
        }
    }

    const broadcasts = loadBroadcasts();

    // Target range: yesterday, today, tomorrow, day after tomorrow (-1 to +2)
    const datesToFetch = [];
    const today = new Date();
    for (let offset = -1; offset <= 2; offset++) {
        const d = new Date(today);
        d.setDate(d.getDate() + offset);
        datesToFetch.push(formatDate(d));
    }

    const allMatches = [];

    for (const dateStr of datesToFetch) {
        try {
            const rawFixtures = await fetchFixturesForDate(dateStr);
            console.log(`Received ${rawFixtures.length} total fixtures for ${dateStr}.`);

            // Filter for priority leagues or major competitions
            const filtered = rawFixtures.filter(item => {
                const leagueId = item.league?.id;
                return Boolean(LEAGUE_CATEGORIES[leagueId]);
            });

            console.log(`Filtered to ${filtered.length} priority matches for ${dateStr}.`);

            filtered.forEach(item => {
                const leagueId = item.league?.id;
                const category = LEAGUE_CATEGORIES[leagueId] || 'european_club';
                const broadcastInfo = broadcasts.leagues?.[leagueId] || broadcasts.default || {};

                allMatches.push({
                    fixture: {
                        id: item.fixture.id,
                        date: item.fixture.date,
                        timestamp: item.fixture.timestamp,
                        status: {
                            long: item.fixture.status.long,
                            short: item.fixture.status.short,
                            elapsed: item.fixture.status.elapsed
                        }
                    },
                    league: {
                        id: item.league.id,
                        name: item.league.name,
                        country: item.league.country,
                        logo: item.league.logo,
                        round: item.league.round,
                        category: category
                    },
                    teams: {
                        home: {
                            id: item.teams.home.id,
                            name: item.teams.home.name,
                            logo: item.teams.home.logo
                        },
                        away: {
                            id: item.teams.away.id,
                            name: item.teams.away.name,
                            logo: item.teams.away.logo
                        }
                    },
                    goals: {
                        home: item.goals.home,
                        away: item.goals.away
                    },
                    broadcast: {
                        channel: broadcastInfo.channel || 'قناة غير معلنة',
                        commentator: broadcastInfo.commentator || 'غير محدد'
                    }
                });
            });

        } catch (err) {
            console.error(`Failed to fetch fixtures for date ${dateStr}:`, err.message);
        }
    }

    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (allMatches.length > 0) {
        const outputData = {
            lastUpdated: new Date().toISOString(),
            matches: allMatches
        };
        fs.writeFileSync(MATCHES_FILE, JSON.stringify(outputData, null, 2), 'utf8');
        console.log(` Successfully saved ${allMatches.length} matches to data/matches.json!`);
    } else {
        console.warn('⚠️ No matches were fetched. Preserving existing matches file.');
    }

    console.log('--- Sync Completed ---');
}

main().catch(err => {
    console.error('Fatal sync error:', err);
    process.exit(1);
});

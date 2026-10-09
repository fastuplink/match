document.addEventListener('DOMContentLoaded', () => {
    // Comprehensive Arabic translation dictionary for teams and leagues
    const ARABIC_NAMES = {
        // --- Leagues & Tournaments ---
        "Premier League": "الدوري الإنجليزي الممتاز",
        "La Liga": "الدوري الإسباني",
        "Serie A": "الدوري الإيطالي",
        "Bundesliga": "الدوري الألماني",
        "Ligue 1": "الدوري الفرنسي",
        "UEFA Champions League": "دوري أبطال أوروبا",
        "UEFA Europa League": "الدوري الأوروبي",
        "UEFA Europa Conference League": "دوري المؤتمر الأوروبي",
        "UEFA Conference League": "دوري المؤتمر الأوروبي",
        "CAF Champions League": "دوري أبطال أفريقيا",
        "CAF Confederation Cup": "كأس الكونفدرالية الأفريقية",
        "CAF Super Cup": "كأس السوبر الأفريقي",
        "UEFA Super Cup": "كأس السوبر الأوروبي",
        "Egyptian Premier League": "الدوري المصري الممتاز",
        "Egypt Cup": "كأس مصر",
        "Saudi Pro League": "دوري روشن السعودي",
        "Saudi League": "دوري روشن السعودي",
        "World Cup": "كأس العالم",
        "UEFA Nations League": "دوري الأمم الأوروبية",
        "Euro Championship": "كأس أمم أوروبا",
        "UEFA European Championship": "كأس أمم أوروبا",
        "Africa Cup of Nations": "كأس أمم أفريقيا",
        "Asian Cup": "كأس آسيا",
        "Copa America": "كوبا أمريكا",
        "Friendlies": "مباراة ودية",
        "Club Friendlies": "مباراة ودية للأندية",

        // --- English Premier League ---
        "Manchester City": "مانشستر سيتي",
        "Liverpool": "ليفربول",
        "Arsenal": "أرسنال",
        "Chelsea": "تشيلسي",
        "Manchester United": "مانشستر يونايتد",
        "Tottenham": "توتنهام",
        "Tottenham Hotspur": "توتنهام",
        "Newcastle": "نيوكاسل",
        "Newcastle United": "نيوكاسل",
        "Aston Villa": "أستون فيلا",
        "Brighton": "برايتون",
        "Brighton & Hove Albion": "برايتون",
        "West Ham": "وست هام",
        "West Ham United": "وست هام",
        "Everton": "إيفرتون",
        "Wolves": "وولفرهامبتون",
        "Wolverhampton Wanderers": "وولفرهامبتون",
        "Fulham": "فولهام",
        "Brentford": "برينتفورد",
        "Crystal Palace": "كريستال بالاس",
        "Bournemouth": "بورنموث",
        "Nottingham Forest": "نوتينغهام فورست",
        "Leicester": "ليستر سيتي",
        "Leicester City": "ليستر سيتي",
        "Southampton": "ساوثهامبتون",
        "Ipswich": "إبسويتش تاون",
        "Ipswich Town": "إبسويتش تاون",
        "Leeds United": "ليدز يونايتد",

        // --- Spanish La Liga ---
        "Real Madrid": "ريال مدريد",
        "Barcelona": "برشلونة",
        "Atletico Madrid": "أتلتيكو مدريد",
        "Sevilla": "إشبيلية",
        "Real Sociedad": "ريال سوسيداد",
        "Athletic Club": "أتلتيك بلباو",
        "Athletic Bilbao": "أتلتيك بلباو",
        "Real Betis": "ريال بيتيس",
        "Villarreal": "فياريال",
        "Valencia": "فالنسيا",
        "Girona": "جيرونا",
        "Celta Vigo": "سيلتا فيغو",
        "Mallorca": "مايوركا",
        "Osasuna": "أوساسونا",
        "Getafe": "خيتافي",
        "Rayo Vallecano": "رايو فاييكانو",
        "Las Palmas": "لاس بالماس",
        "Alaves": "ألافيس",
        "Deportivo Alaves": "ألافيس",
        "Espanyol": "إسبانيول",
        "Leganes": "ليغانيس",
        "Real Valladolid": "بلد الوليد",

        // --- Italian Serie A ---
        "Inter": "إنتر ميلان",
        "Inter Milan": "إنتر ميلان",
        "AC Milan": "ميلان",
        "Milan": "ميلان",
        "Juventus": "يوفنتوس",
        "Napoli": "نابولي",
        "AS Roma": "روما",
        "Roma": "روما",
        "Lazio": "لاتسيو",
        "Atalanta": "أتالانتا",
        "Fiorentina": "فيورنتينا",
        "Bologna": "بولونيا",
        "Torino": "تورينو",
        "Monza": "مونزا",
        "Genoa": "جنوى",
        "Parma": "بارما",
        "Udinese": "أودينيزي",
        "Cagliari": "كالياري",
        "Empoli": "إمبولي",
        "Verona": "هيلاس فيرونا",
        "Hellas Verona": "هيلاس فيرونا",
        "Como": "كومو",
        "Venezia": "فينيسيا",
        "Lecce": "ليتشي",

        // --- German Bundesliga ---
        "Bayern Munich": "بايرن ميونخ",
        "Bayern München": "بايرن ميونخ",
        "Borussia Dortmund": "بوروسيا دورتموند",
        "Bayer Leverkusen": "باير ليفركوزن",
        "RB Leipzig": "لايبزيغ",
        "Eintracht Frankfurt": "آينتراخت فرانكفورت",
        "VfB Stuttgart": "شتوتغارت",
        "Borussia Monchengladbach": "بوروسيا مونشنغلادباخ",
        "Wolfsburg": "فولفسبورغ",
        "VfL Wolfsburg": "فولفسبورغ",
        "SC Freiburg": "فرايبورغ",
        "Freiburg": "فرايبورغ",
        "Union Berlin": "يونيون برلين",
        "Werder Bremen": "فيردر بريمن",
        "Hoffenheim": "هوفنهايم",
        "Augsburg": "أوغسبورغ",
        "Mainz 05": "ماينتس",
        "St. Pauli": "سانت باولي",
        "FC Heidenheim": "هايدنهايم",
        "Bochum": "بوخوم",
        "Holstein Kiel": "هولشتاين كیل",

        // --- French Ligue 1 ---
        "Paris Saint Germain": "باريس سان جيرمان",
        "Paris Saint-Germain": "باريس سان جيرمان",
        "PSG": "باريس سان جيرمان",
        "Marseille": "مارسيليا",
        "Monaco": "موناكو",
        "Lyon": "أولمبيك ليون",
        "Lille": "ليل",
        "Rennes": "رين",
        "Nice": "نيس",
        "Lens": "لانس",
        "Stade Reims": "ستاد ريمس",
        "Reims": "ستاد ريمس",
        "Strasbourg": "ستراسبورغ",
        "Toulouse": "تولوز",
        "Nantes": "نانت",
        "Brest": "ستاد بريست",
        "Saint-Etienne": "سانت إيتيان",
        "Auxerre": "أوكسير",
        "Angers": "أنجيه",
        "Le Havre": "لو هافر",
        "Montpellier": "مونبلييه",

        // --- Egyptian Premier League ---
        "Al Ahly": "الأهلي",
        "Al Ahly SC": "الأهلي",
        "Zamalek": "الزمالك",
        "Zamalek SC": "الزمالك",
        "Pyramids": "بيراميدز",
        "Pyramids FC": "بيراميدز",
        "Ismaily": "الإسماعيلي",
        "Ismaily SC": "الإسماعيلي",
        "Al Masry": "المصري البورسعيدي",
        "Al Masry Club": "المصري البورسعيدي",
        "Al Ittihad": "الاتحاد السكندري",
        "Al Ittihad Alexandria": "الاتحاد السكندري",
        "Modern Sport": "مودرن سبورت",
        "Future": "مودرن سبورت",
        "Future FC": "مودرن سبورت",
        "Smouha": "سموحة",
        "Smouha SC": "سموحة",
        "ZED FC": "زد",
        "Ceramica Cleopatra": "سيراميكا كليوباترا",
        "ENPPI": "إنبي",
        "Tala'ea El Gaish": "طلائع الجيش",
        "National Bank of Egypt": "البنك الأهلي",
        "National Bank": "البنك الأهلي",
        "Pharco": "فاركو",
        "Ghazl El Mahalla": "غزل المحلة",
        "El Gouna": "الجونة",
        "Haras El Hodood": "حرس الحدود",
        "Petrojet": "بتروجت",

        // --- Saudi Pro League ---
        "Al-Hilal": "الهلال",
        "Al Hilal": "الهلال",
        "Al-Nassr": "النصر",
        "Al Nassr": "النصر",
        "Al-Ittihad": "الاتحاد",
        "Al Ittihad": "الاتحاد",
        "Al-Ahli": "الأهلي السعودي",
        "Al Ahli": "الأهلي السعودي",
        "Al-Shabab": "الشباب",
        "Al Shabab": "الشباب",
        "Al-Ettifaq": "الاتفاق",
        "Al Ettifaq": "الاتفاق",
        "Al-Taawoun": "التعاون",
        "Al Taawoun": "التعاون",
        "Al-Fateh": "الفتح",
        "Al Fateh": "الفتح",
        "Al-Qadsiah": "القادسية",
        "Al-Raed": "الرائد",
        "Al-Wehda": "الوحدة",
        "Damac": "ضمك",
        "Al-Fayha": "الفيحاء",
        "Al-Khaleej": "الخليج",
        "Al-Okhdood": "الأخدود",
        "Al-Riyadh": "الرياض",
        "Al-Kholood": "الخلود",
        "Al-Orobah": "العروبة",

        // --- African & Arab Clubs ---
        "Esperance Tunis": "الترجي التونسي",
        "ES Tunis": "الترجي التونسي",
        "Wydad AC": "الوداد الرياضي",
        "Wydad Casablanca": "الوداد الرياضي",
        "Raja Club Athletic": "الرجاء الرياضي",
        "Raja Casablanca": "الرجاء الرياضي",
        "Mamelodi Sundowns": "صنداونز",
        "TP Mazembe": "مازيمبي",
        "JS Kabylie": "شبيبة القبائل",
        "CR Belouizdad": "شباب بلوزداد",
        "MC Alger": "مولودية الجزائر",
        "ES Setif": "وفاق سطيف",
        "Etoile du Sahel": "النجم الساحلي",
        "Club Africain": "النادي الإفريقي",
        "Al-Hilal Omdurman": "الهلال السوداني",
        "Al-Merrikh": "المريخ السوداني",
        "FAR Rabat": "الجيش الملكي",
        "RS Berkane": "نهضة بركان",
        "Al Ain": "العين",
        "Al Sadd": "السد",

        // --- National Teams ---
        "Egypt": "مصر",
        "Saudi Arabia": "السعودية",
        "Morocco": "المغرب",
        "Algeria": "الجزائر",
        "Tunisia": "تونس",
        "Qatar": "قطر",
        "Iraq": "العراق",
        "Jordan": "الأردن",
        "United Arab Emirates": "الإمارات",
        "UAE": "الإمارات",
        "Oman": "عمان",
        "Kuwait": "الكويت",
        "Bahrain": "البحرين",
        "Syria": "سوريا",
        "Palestine": "فلسطين",
        "Lebanon": "لبنان",
        "Sudan": "السودان",
        "Libya": "ليبيا",
        "Mauritania": "موريتانيا",
        "France": "فرنسا",
        "Germany": "ألمانيا",
        "England": "إنجلترا",
        "Spain": "إسبانيا",
        "Italy": "إيطاليا",
        "Portugal": "البرتغال",
        "Netherlands": "هولندا",
        "Belgium": "بلجيكا",
        "Croatia": "كرواتيا",
        "Argentina": "الأرجنتين",
        "Brazil": "البرازيل",
        "Uruguay": "أوروغواي",
        "Colombia": "كولومبيا",
        "Senegal": "السنغال",
        "Nigeria": "نيجيريا",
        "Ivory Coast": "كوت ديفوار",
        "Cameroon": "الكاميرون",
        "Ghana": "غانا",
        "Japan": "اليابان",
        "South Korea": "كوريا الجنوبية"
    };

    // Helper: translate team or league name to Arabic if available
    function toArabic(name) {
        if (!name) return '';
        const trimmed = name.trim();
        if (ARABIC_NAMES[trimmed]) return ARABIC_NAMES[trimmed];

        const lower = trimmed.toLowerCase();
        for (const [key, val] of Object.entries(ARABIC_NAMES)) {
            if (key.toLowerCase() === lower) return val;
        }

        const stripped = trimmed.replace(/\b(FC|CF|SC|AC|AS|CD|UD)\b/gi, '').trim();
        if (ARABIC_NAMES[stripped]) return ARABIC_NAMES[stripped];

        return trimmed;
    }

    // State
    let matchesData = [];
    let selectedCategory = 'all';
    let searchQuery = '';
    
    // Elements
    const datePicker = document.getElementById('datePicker');
    const prevDayBtn = document.getElementById('prevDay');
    const nextDayBtn = document.getElementById('nextDay');
    const todayBtn = document.getElementById('todayBtn');
    const searchInput = document.getElementById('searchInput');
    const matchesContainer = document.getElementById('matchesContainer');
    const matchCountEl = document.getElementById('matchCount');
    const lastUpdateEl = document.getElementById('lastUpdate');
    const categoryLinks = document.querySelectorAll('nav a[data-category]');

    // Initialize Date to today in local time (YYYY-MM-DD)
    const todayStr = getLocalDateString(new Date());
    datePicker.value = todayStr;

    // Event Listeners
    datePicker.addEventListener('change', () => {
        renderFilteredMatches();
    });

    prevDayBtn.addEventListener('click', () => {
        changeDate(-1);
    });

    nextDayBtn.addEventListener('click', () => {
        changeDate(1);
    });

    todayBtn.addEventListener('click', () => {
        datePicker.value = todayStr;
        renderFilteredMatches();
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderFilteredMatches();
    });

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            selectedCategory = link.dataset.category || 'all';
            renderFilteredMatches();
        });
    });

    function changeDate(daysOffset) {
        const currentDate = new Date(datePicker.value || new Date());
        currentDate.setDate(currentDate.getDate() + daysOffset);
        datePicker.value = getLocalDateString(currentDate);
        renderFilteredMatches();
    }

    function getLocalDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Fetch matches data
    async function fetchMatches() {
        matchesContainer.innerHTML = '<div class="loading-state">جاري تحميل مباريات كرة القدم...</div>';
        try {
            const response = await fetch(`data/matches.json?_t=${Date.now()}`);
            if (!response.ok) {
                throw new Error(`تعذر تحميل البيانات (رمز: ${response.status})`);
            }
            const data = await response.json();
            matchesData = Array.isArray(data.matches) ? data.matches : [];
            
            if (data.lastUpdated) {
                const updatedDate = new Date(data.lastUpdated);
                lastUpdateEl.textContent = `آخر تحديث: ${formatDateArabic(updatedDate)}`;
            } else {
                lastUpdateEl.textContent = 'آخر تحديث: الآن';
            }

            renderFilteredMatches();
        } catch (error) {
            console.error('Error fetching matches:', error);
            matchesContainer.innerHTML = `
                <div class="empty-state">
                    <div class="icon">⚠️</div>
                    <p>تعذر تحميل بيانات المباريات حالياً.</p>
                    <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 0.5rem;">تأكد من وجود ملف data/matches.json وتشغيل خادم محلي أو تحديث البيانات.</p>
                    <button class="btn-retry" id="retryBtn">إعادة المحاولة</button>
                </div>
            `;
            const retryBtn = document.getElementById('retryBtn');
            if (retryBtn) {
                retryBtn.addEventListener('click', fetchMatches);
            }
        }
    }

    // Filter and Render Matches
    function renderFilteredMatches() {
        const selectedDate = datePicker.value;
        
        const filtered = matchesData.filter(item => {
            const matchDateStr = item.fixture.date ? item.fixture.date.substring(0, 10) : '';
            if (matchDateStr && matchDateStr !== selectedDate) {
                return false;
            }

            if (selectedCategory !== 'all') {
                const category = item.league.category || 'all';
                if (category !== selectedCategory) {
                    return false;
                }
            }

            if (searchQuery) {
                const homeRaw = (item.teams?.home?.name || '').toLowerCase();
                const awayRaw = (item.teams?.away?.name || '').toLowerCase();
                const leagueRaw = (item.league?.name || '').toLowerCase();
                
                const homeAr = toArabic(item.teams?.home?.name || '').toLowerCase();
                const awayAr = toArabic(item.teams?.away?.name || '').toLowerCase();
                const leagueAr = toArabic(item.league?.name || '').toLowerCase();

                const matched = homeRaw.includes(searchQuery) ||
                                awayRaw.includes(searchQuery) ||
                                leagueRaw.includes(searchQuery) ||
                                homeAr.includes(searchQuery) ||
                                awayAr.includes(searchQuery) ||
                                leagueAr.includes(searchQuery);

                if (!matched) return false;
            }

            return true;
        });

        matchCountEl.textContent = `عدد المباريات: ${filtered.length}`;

        if (filtered.length === 0) {
            matchesContainer.innerHTML = `
                <div class="empty-state">
                    <div class="icon">⚽</div>
                    <p>لا توجد مباريات لهذا اليوم المحدد (${selectedDate}) أو مطابقة لبحثك.</p>
                    <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 0.5rem;">يمكنك تغيير التاريخ أو تصفح قسم آخر من القائمة العلوية.</p>
                </div>
            `;
            return;
        }

        // Group matches by league
        const groupedByLeague = {};
        filtered.forEach(match => {
            const leagueId = match.league.id || match.league.name;
            if (!groupedByLeague[leagueId]) {
                groupedByLeague[leagueId] = {
                    info: match.league,
                    matches: []
                };
            }
            groupedByLeague[leagueId].matches.push(match);
        });

        // Generate HTML
        let html = '';
        for (const leagueId in groupedByLeague) {
            const group = groupedByLeague[leagueId];
            const league = group.info;
            const leagueArabicName = toArabic(league.name || 'بطولة غير محددة');

            html += `
                <div class="league-group">
                    <div class="league-header">
                        ${league.logo ? `<img class="league-logo" src="${league.logo}" alt="${escapeHtml(leagueArabicName)}" onerror="this.style.display='none'">` : ''}
                        <div class="league-info">
                            <h3>${escapeHtml(leagueArabicName)}</h3>
                            <span>${escapeHtml(league.round || league.country || '')}</span>
                        </div>
                    </div>
                    <div class="league-matches">
            `;

            group.matches.forEach(match => {
                html += renderMatchCard(match);
            });

            html += `
                    </div>
                </div>
            `;
        }

        matchesContainer.innerHTML = html;
    }

    // Render individual match card
    function renderMatchCard(match) {
        const homeRawName = match.teams?.home?.name || 'الفريق 1';
        const awayRawName = match.teams?.away?.name || 'الفريق 2';
        const homeName = toArabic(homeRawName);
        const awayName = toArabic(awayRawName);

        const home = match.teams?.home || {};
        const away = match.teams?.away || {};
        const status = match.fixture?.status || {};
        const goals = match.goals || {};
        const broadcast = match.broadcast || {};

        const statusInfo = getStatusInfo(status);
        const matchTimeFormatted = formatMatchTime(match.fixture?.date);

        const isUpcoming = ['NS', 'TBD'].includes(status.short);

        let centerContent = '';
        if (isUpcoming) {
            centerContent = `<div class="match-time">${matchTimeFormatted}</div>`;
        } else {
            const homeScore = goals.home !== null && goals.home !== undefined ? goals.home : '-';
            const awayScore = goals.away !== null && goals.away !== undefined ? goals.away : '-';
            centerContent = `<div class="score-box">${homeScore} - ${awayScore}</div>`;
        }

        return `
            <div class="match-card">
                <div class="match-row">
                    <div class="team home">
                        <span class="team-name" title="${escapeHtml(homeName)}">${escapeHtml(homeName)}</span>
                        ${home.logo ? `<img class="team-logo" src="${home.logo}" alt="${escapeHtml(homeName)}" onerror="this.src='https://media.api-sports.io/football/teams/empty.png'">` : ''}
                    </div>

                    <div class="match-center">
                        ${centerContent}
                        <div class="status-badge ${statusInfo.className}">
                            ${statusInfo.text}
                        </div>
                    </div>

                    <div class="team away">
                        ${away.logo ? `<img class="team-logo" src="${away.logo}" alt="${escapeHtml(awayName)}" onerror="this.src='https://media.api-sports.io/football/teams/empty.png'">` : ''}
                        <span class="team-name" title="${escapeHtml(awayName)}">${escapeHtml(awayName)}</span>
                    </div>
                </div>

                ${(broadcast.channel || broadcast.commentator) ? `
                    <div class="match-meta">
                        ${broadcast.channel ? `
                            <div class="meta-item">
                                <span>📺</span> <strong>${escapeHtml(broadcast.channel)}</strong>
                            </div>
                        ` : ''}
                        ${broadcast.commentator ? `
                            <div class="meta-item">
                                <span>🎙️</span> <strong>${escapeHtml(broadcast.commentator)}</strong>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Helper: Map status code to Arabic label & CSS class
    function getStatusInfo(status) {
        const short = status.short || '';
        const elapsed = status.elapsed;

        switch (short) {
            case '1H':
                return { text: `الشوط 1 (${elapsed ? elapsed + "'" : ''})`, className: 'live' };
            case '2H':
                return { text: `الشوط 2 (${elapsed ? elapsed + "'" : ''})`, className: 'live' };
            case 'HT':
                return { text: 'استراحة', className: 'live' };
            case 'ET':
                return { text: `إضافي (${elapsed ? elapsed + "'" : ''})`, className: 'live' };
            case 'P':
                return { text: 'ركلات ترجيح', className: 'live' };
            case 'FT':
                return { text: 'انتهت', className: 'finished' };
            case 'AET':
                return { text: 'انتهت (إضافي)', className: 'finished' };
            case 'PEN':
                return { text: 'انتهت (ترجيح)', className: 'finished' };
            case 'NS':
                return { text: 'لم تبدأ', className: 'upcoming' };
            case 'PST':
                return { text: 'مؤجلة', className: 'postponed' };
            case 'CANC':
                return { text: 'ملغاة', className: 'postponed' };
            default:
                return { text: status.long || 'غير محدد', className: 'upcoming' };
        }
    }

    function formatMatchTime(dateStr) {
        if (!dateStr) return '--:--';
        try {
            const date = new Date(dateStr);
            return date.toLocaleTimeString('ar-EG', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch (e) {
            return '--:--';
        }
    }

    function formatDateArabic(date) {
        try {
            return date.toLocaleString('ar-EG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch (e) {
            return date.toISOString();
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    fetchMatches();
});

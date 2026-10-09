document.addEventListener('DOMContentLoaded', () => {
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
                const homeName = (item.teams?.home?.name || '').toLowerCase();
                const awayName = (item.teams?.away?.name || '').toLowerCase();
                const leagueName = (item.league?.name || '').toLowerCase();
                if (!homeName.includes(searchQuery) && !awayName.includes(searchQuery) && !leagueName.includes(searchQuery)) {
                    return false;
                }
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

            html += `
                <div class="league-group">
                    <div class="league-header">
                        ${league.logo ? `<img class="league-logo" src="${league.logo}" alt="${escapeHtml(league.name)}" onerror="this.style.display='none'">` : ''}
                        <div class="league-info">
                            <h3>${escapeHtml(league.name || 'بطولة غير محددة')}</h3>
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
        const home = match.teams?.home || { name: 'الفريق 1' };
        const away = match.teams?.away || { name: 'الفريق 2' };
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
                        <span class="team-name" title="${escapeHtml(home.name)}">${escapeHtml(home.name)}</span>
                        ${home.logo ? `<img class="team-logo" src="${home.logo}" alt="${escapeHtml(home.name)}" onerror="this.src='https://media.api-sports.io/football/teams/empty.png'">` : ''}
                    </div>

                    <div class="match-center">
                        ${centerContent}
                        <div class="status-badge ${statusInfo.className}">
                            ${statusInfo.text}
                        </div>
                    </div>

                    <div class="team away">
                        ${away.logo ? `<img class="team-logo" src="${away.logo}" alt="${escapeHtml(away.name)}" onerror="this.src='https://media.api-sports.io/football/teams/empty.png'">` : ''}
                        <span class="team-name" title="${escapeHtml(away.name)}">${escapeHtml(away.name)}</span>
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

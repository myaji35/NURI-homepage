/**
 * Emoji to Feather Icon Replacer
 * goesan.html의 모든 이모지를 SVG 아이콘으로 자동 교체
 */

// 이모지 → Feather Icon 매핑
const emojiReplacements = [
    // 카드 헤더 아이콘
    { emoji: '📍', icon: 'mapPin', contexts: ['사업장 기본 정보'] },
    { emoji: '🌿', icon: 'leaf', contexts: ['재배 작물'] },
    { emoji: '🤖', icon: 'cpu', contexts: ['핵심 기술'] },
    { emoji: '🤝', icon: 'users', contexts: ['판매처', '파트너십'] },
    { emoji: '👥', icon: 'users', contexts: ['고용 계획'] },

    // 타일/박스 아이콘
    { emoji: '🍃', icon: 'leaf', contexts: ['병풀'] },
    { emoji: '🥬', icon: 'leaf', contexts: ['쌈채소'] },
    { emoji: '💰', icon: 'dollarSign', contexts: ['비즈니스'] },
    { emoji: '🏆', icon: 'award', contexts: ['기술 검증'] },
    { emoji: '💼', icon: 'briefcase', contexts: ['B2B', '세일즈'] },

    // 기술 아이콘
    { emoji: '💡', icon: 'zap', contexts: ['LED'] },
    { emoji: '🔄', icon: 'activity', contexts: ['양액', '순환'] },
    { emoji: '⚡', icon: 'zap', contexts: ['빠른', '설치'] },
    { emoji: '🔧', icon: 'tool', contexts: ['유지보수', '조립'] },
    { emoji: '⚙️', icon: 'settings', contexts: ['서브 드라이브', '시스템'] },

    // 영상 아이콘
    { emoji: '🎬', icon: 'video', contexts: ['영상', '자료'] },
    { emoji: '🌱', icon: 'leaf', contexts: ['Cell', '작동'] },

    // 통계 아이콘
    { emoji: '📊', icon: 'barChart', contexts: ['비교', '로드맵', '통계'] },
    { emoji: '📈', icon: 'trendingUp', contexts: ['성장', '증가'] }
];

// SVG 아이콘 생성 함수
function createIcon(iconName, size = 24, color = 'currentColor') {
    const icons = {
        mapPin: `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>`,
        leaf: `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>`,
        cpu: `<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>`,
        users: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`,
        dollarSign: `<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>`,
        award: `<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>`,
        briefcase: `<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>`,
        zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>`,
        activity: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>`,
        tool: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>`,
        settings: `<circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 0l-4.2 4.2m0-8.4l4.2 4.2m0 0l4.2 4.2M1 12h6m6 0h6"></path>`,
        video: `<polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>`,
        barChart: `<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>`,
        trendingUp: `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>`
    };

    const path = icons[iconName];
    if (!path) return '';

    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle;">${path}</svg>`;
}

// 실행 (페이지 로드 시)
console.log('Feather Icons 변환 스크립트 로드됨');

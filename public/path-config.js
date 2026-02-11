/**
 * NURI 경로 자동 감지 및 설정
 * 로컬(localhost) vs GitHub Pages 자동 구분
 */

// 현재 환경 감지
const isLocalhost = window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1' ||
                    window.location.hostname === '';

// 기본 경로 설정
const BASE_PATH = isLocalhost ? '' : '/NURI-homepage';

// 경로 생성 함수
function getPath(path) {
    // '#'으로 시작하는 앵커는 그대로 반환
    if (path.startsWith('#')) {
        return path;
    }

    // 절대 경로가 아니면 BASE_PATH 추가
    if (path.startsWith('/')) {
        return BASE_PATH + path;
    }

    return path;
}

// DOM 로드 완료 후 모든 링크 수정
document.addEventListener('DOMContentLoaded', function() {
    console.log(`[NURI] Environment: ${isLocalhost ? 'Local' : 'Production (GitHub Pages)'}`);
    console.log(`[NURI] BASE_PATH: "${BASE_PATH}"`);

    // 모든 <a> 태그 찾기
    const links = document.querySelectorAll('a[href]');
    let updatedCount = 0;

    links.forEach(link => {
        const href = link.getAttribute('href');

        // 외부 링크, mailto, tel, javascript 제외
        if (href.startsWith('http') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            href.startsWith('javascript:')) {
            return;
        }

        // 앵커(#)는 제외
        if (href.startsWith('#')) {
            return;
        }

        // /NURI-homepage/ 경로가 포함된 경우
        if (href.includes('/NURI-homepage/')) {
            if (isLocalhost) {
                // 로컬에서는 /NURI-homepage/ 제거
                const newHref = href.replace('/NURI-homepage', '');
                link.setAttribute('href', newHref);
                updatedCount++;
            }
        } else if (href.startsWith('/')) {
            // 절대 경로인 경우
            if (!isLocalhost && !href.startsWith('/NURI-homepage/')) {
                // GitHub Pages에서는 /NURI-homepage/ 추가
                const newHref = BASE_PATH + href;
                link.setAttribute('href', newHref);
                updatedCount++;
            }
        }
    });

    console.log(`[NURI] Updated ${updatedCount} links`);
});

// 전역 함수로 export
window.NURI = {
    BASE_PATH: BASE_PATH,
    isLocalhost: isLocalhost,
    getPath: getPath
};

# NURI Design System v2.0

> **Ultra Modern**: Minimalist + Story Scroll + 형광 초록 아이덴티티
>
> 작성일: 2026-02-10
> 디자인 철학: "Less is More, Green is Future"

---

## 🎨 디자인 철학

### 핵심 가치
1. **Minimalism**: 불필요한 요소 제거, 핵심만 전달
2. **Storytelling**: 스크롤로 이야기 전개
3. **Impact**: 형광 초록으로 강렬한 인상
4. **Accessibility**: 장애인 사용자 고려

### 디자인 키워드
- 깔끔함 (Clean)
- 대담함 (Bold)
- 미래지향적 (Futuristic)
- 사회적 책임 (Socially Responsible)

---

## 🌈 컬러 시스템

### Primary Colors
```css
/* 형광 초록 계열 */
--nuri-green-neon: #39FF14;      /* 메인 브랜드 컬러 */
--nuri-green-bright: #2BCC0F;    /* Hover/Active */
--nuri-green-dark: #1FA60C;      /* 강조 */
--nuri-green-glow: rgba(57, 255, 20, 0.3); /* 글로우 효과 */
```

### Monochrome (단색)
```css
/* 흑백 계열 */
--nuri-black: #0A0A0A;           /* 배경 (다크모드) */
--nuri-gray-900: #1A1A1A;        /* 텍스트 진함 */
--nuri-gray-700: #3A3A3A;        /* 텍스트 보통 */
--nuri-gray-500: #7A7A7A;        /* 텍스트 연함 */
--nuri-gray-300: #BDBDBD;        /* Border */
--nuri-gray-100: #E8E8E8;        /* 배경 연함 */
--nuri-white: #FAFAFA;           /* 배경 (라이트모드) */
```

### Earth Tones (어스톤)
```css
/* 농업 정체성 */
--nuri-earth-brown: #8B7355;     /* 흙 */
--nuri-earth-beige: #D4C4B0;     /* 모래 */
--nuri-earth-moss: #5A7247;      /* 이끼 */
--nuri-earth-clay: #A0826D;      /* 점토 */
```

### Gradient System
```css
/* 그라데이션 */
--nuri-gradient-primary: linear-gradient(135deg, #39FF14 0%, #2BCC0F 100%);
--nuri-gradient-earth: linear-gradient(135deg, #39FF14 0%, #5A7247 50%, #8B7355 100%);
--nuri-gradient-dark: linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%);
--nuri-gradient-glow: radial-gradient(circle at center, rgba(57,255,20,0.4) 0%, transparent 70%);
```

### Semantic Colors
```css
/* 의미론적 색상 */
--nuri-success: #39FF14;         /* 성공 */
--nuri-warning: #FFB800;         /* 경고 */
--nuri-error: #FF4444;           /* 오류 */
--nuri-info: #4A90E2;            /* 정보 */
```

---

## 📐 타이포그래피

### Font Stack
```css
/* 한글 */
font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;

/* 영문/숫자 */
font-family: 'Inter', 'Noto Sans KR', sans-serif;
```

### Font CDN
```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet">
```

### Type Scale
```css
/* Heading */
--font-size-h1: 4rem;      /* 64px - Hero Title */
--font-size-h2: 3rem;      /* 48px - Section Title */
--font-size-h3: 2rem;      /* 32px - Card Title */
--font-size-h4: 1.5rem;    /* 24px - Subtitle */
--font-size-h5: 1.25rem;   /* 20px - Small Heading */

/* Body */
--font-size-body-lg: 1.25rem;  /* 20px - Lead */
--font-size-body: 1rem;        /* 16px - Normal */
--font-size-body-sm: 0.875rem; /* 14px - Small */
--font-size-caption: 0.75rem;  /* 12px - Caption */

/* Weight */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
--font-weight-black: 900;

/* Line Height */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.8;
```

### Typography Rules
1. **H1**: Inter Black 900, 64px, 형광 초록
2. **H2**: Noto Sans KR Bold 700, 48px, 검정
3. **Body**: Noto Sans KR Regular 400, 16px, 회색
4. **Number**: Inter Bold 700 (숫자는 항상 Inter)

---

## 📏 Spacing System

### 8pt Grid
```css
--space-1: 0.5rem;   /* 8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px */
--space-5: 2.5rem;   /* 40px */
--space-6: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
--space-10: 5rem;    /* 80px */
--space-12: 6rem;    /* 96px */
--space-16: 8rem;    /* 128px */
--space-20: 10rem;   /* 160px */
```

### Container
```css
--container-max-width: 1400px;
--container-padding: 2rem; /* 모바일 */
--container-padding-lg: 4rem; /* 데스크탑 */
```

---

## 🎭 레이아웃 구조: Story Scroll

### Section 기반 레이아웃
각 섹션은 `100vh` (뷰포트 높이) 기준으로 스토리를 전개합니다.

```
┌─────────────────────────────┐
│  Hero Section (100vh)       │ ← 첫 인상
├─────────────────────────────┤
│  Stats Section (100vh)      │ ← 핵심 지표
├─────────────────────────────┤
│  Mission Section (100vh)    │ ← 사회적 가치
├─────────────────────────────┤
│  Technology Section (100vh) │ ← 기술 혁신
├─────────────────────────────┤
│  Impact Section (100vh)     │ ← 실제 영향
├─────────────────────────────┤
│  Partnership CTA (100vh)    │ ← 행동 유도
└─────────────────────────────┘
```

### Scroll Animation
- **Fade In**: 섹션 진입 시 투명도 0 → 1
- **Slide Up**: 하단에서 위로 슬라이드
- **Scale**: 0.95 → 1.0 확대
- **Parallax**: 배경 이미지 느리게 스크롤

---

## 🧩 컴포넌트 디자인

### Button
```css
/* Primary Button */
.btn-primary {
  background: var(--nuri-green-neon);
  color: var(--nuri-black);
  padding: 1rem 2rem;
  border-radius: 0; /* Sharp, Modern */
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 20px var(--nuri-green-glow);
}

.btn-primary:hover {
  background: var(--nuri-green-bright);
  transform: translateY(-2px);
  box-shadow: 0 0 30px var(--nuri-green-glow);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--nuri-green-neon);
  border: 2px solid var(--nuri-green-neon);
  padding: 1rem 2rem;
  border-radius: 0;
  font-weight: 700;
  transition: all 0.3s;
}

.btn-ghost:hover {
  background: var(--nuri-green-neon);
  color: var(--nuri-black);
}
```

### Card (Minimal)
```css
.card-minimal {
  background: var(--nuri-white);
  padding: var(--space-6);
  border: 1px solid var(--nuri-gray-300);
  border-left: 4px solid var(--nuri-green-neon); /* Accent */
  transition: all 0.3s;
}

.card-minimal:hover {
  border-left-width: 8px;
  transform: translateX(4px);
  box-shadow: -4px 0 20px var(--nuri-green-glow);
}
```

### Input
```css
.input-modern {
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--nuri-gray-300);
  padding: var(--space-2) 0;
  font-size: 1rem;
  font-family: 'Noto Sans KR', sans-serif;
  transition: border-color 0.3s;
}

.input-modern:focus {
  outline: none;
  border-bottom-color: var(--nuri-green-neon);
  box-shadow: 0 2px 0 var(--nuri-green-glow);
}
```

---

## 🎬 애니메이션

### Easing
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0.0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Keyframes
```css
/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Glow Pulse */
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 20px var(--nuri-green-glow);
  }
  50% {
    box-shadow: 0 0 40px var(--nuri-green-glow);
  }
}

/* Number Count Up */
@keyframes countUp {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}
```

---

## 📱 반응형 디자인

### Breakpoints
```css
--breakpoint-mobile: 640px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1400px;
```

### Mobile First
```css
/* Mobile (기본) */
.hero-title {
  font-size: 2rem;
}

/* Tablet */
@media (min-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero-title {
    font-size: 4rem;
  }
}
```

---

## 🖼️ 이미지 가이드

### 사진 스타일
1. **Black & White**: 인물 사진은 흑백 처리
2. **Green Overlay**: 형광 초록 오버레이 10~20%
3. **High Contrast**: 명암비 강조
4. **Minimal Composition**: 여백 많이

### 아이콘
- **SVG 사용**: 벡터 형식 필수
- **Stroke Style**: 2px 선 두께, Sharp corners
- **Monochrome**: 단색 또는 형광 초록만
- **Size**: 24px, 32px, 48px, 64px (4의 배수)

---

## 🎯 UX 원칙

### 1. Progressive Disclosure
정보를 단계적으로 공개. 사용자가 스크롤할수록 더 깊은 내용 노출.

### 2. Scroll Storytelling
```
Hero → "누리가 뭔가요?"
Stats → "숫자로 보는 누리"
Mission → "우리의 사명"
Tech → "어떻게 구현하나요?"
Impact → "실제 변화"
CTA → "함께 하세요"
```

### 3. Micro-interactions
- 버튼 호버 시 글로우 효과
- 숫자 카운트업 애니메이션
- 섹션 진입 시 페이드인

### 4. Accessibility
- WCAG AA 준수
- 키보드 네비게이션 지원
- 스크린 리더 대응
- 명도비 4.5:1 이상

---

## 🛠️ 구현 예시

### Hero Section (Minimalist)
```html
<section class="hero">
  <div class="hero-badge">🏆 장애인표준사업장 인증후보</div>
  <h1 class="hero-title">
    기술로 만드는<br/>
    <span class="highlight-green">포용적 농업</span>
  </h1>
  <p class="hero-subtitle">
    AI와 스마트팜으로 장애인에게 일자리를 제공하고<br/>
    농업 생산성을 혁신합니다
  </p>
  <button class="btn-primary">컨소시엄 파트너 되기</button>
</section>

<style>
.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: var(--nuri-white);
  animation: fadeInUp 1s var(--ease-out);
}

.hero-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 4rem;
  color: var(--nuri-black);
  margin: var(--space-4) 0;
  line-height: var(--line-height-tight);
}

.highlight-green {
  color: var(--nuri-green-neon);
  text-shadow: 0 0 20px var(--nuri-green-glow);
  animation: glowPulse 2s infinite;
}
</style>
```

---

## 📦 디자인 에셋

### SVG 아이콘 (예시)
```svg
<!-- Nuri Logo Icon -->
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M24 4L4 14V34L24 44L44 34V14L24 4Z"
        stroke="#39FF14"
        stroke-width="2"
        fill="none"/>
  <circle cx="24" cy="24" r="8" fill="#39FF14"/>
</svg>

<!-- Leaf Icon -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 2C8 2 2 6 2 12C2 16 6 20 12 22"
        stroke="#39FF14"
        stroke-width="2"/>
  <path d="M12 22C16 20 20 16 22 12C22 6 16 2 12 2"
        stroke="#39FF14"
        stroke-width="2"/>
</svg>
```

---

## 🚀 구현 로드맵

### Phase 1: 기초 작업 (1주)
- [ ] CSS 변수 시스템 구축
- [ ] 폰트 로드 최적화
- [ ] 기본 컴포넌트 라이브러리

### Phase 2: 페이지 재구축 (2주)
- [ ] Hero Section (Story Scroll)
- [ ] Stats Section (Number Animation)
- [ ] Mission/Tech/Impact Sections
- [ ] CTA Section

### Phase 3: 인터랙션 (1주)
- [ ] Scroll Animation
- [ ] Micro-interactions
- [ ] Parallax Effects

### Phase 4: 최적화 (1주)
- [ ] 성능 최적화 (Lighthouse 90+)
- [ ] 접근성 테스트 (WCAG AA)
- [ ] 크로스 브라우저 테스트

---

**디자인 시스템 버전**: 2.0
**최종 업데이트**: 2026-02-10
**디자이너**: Gagahoho UX Team

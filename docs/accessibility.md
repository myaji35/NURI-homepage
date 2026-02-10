# NURI 접근성 가이드라인

> WCAG 2.1 AA 준수를 위한 웹 접근성 구현 가이드

**작성일**: 2026-02-10
**버전**: 1.0
**작성자**: Gagahoho, Inc. UX Team
**준수 표준**: WCAG 2.1 Level AA

---

## 📋 목차

1. [접근성 개요](#접근성-개요)
2. [WCAG 2.1 준수 사항](#wcag-21-준수-사항)
3. [키보드 네비게이션](#키보드-네비게이션)
4. [스크린 리더 지원](#스크린-리더-지원)
5. [시각적 접근성](#시각적-접근성)
6. [폼 접근성](#폼-접근성)
7. [에러 처리 접근성](#에러-처리-접근성)
8. [모바일 접근성](#모바일-접근성)
9. [테스트 체크리스트](#테스트-체크리스트)

---

## 접근성 개요

### 왜 접근성이 중요한가?

1. **법적 준수**: 장애인차별금지법 (장차법) 준수
2. **사용자 확대**: 전체 인구의 약 15%가 장애인
3. **SEO 향상**: 접근성 개선 = 검색 엔진 최적화
4. **사용성 향상**: 모든 사용자에게 더 나은 경험 제공

### 목표

- **WCAG 2.1 Level AA** 100% 준수
- **키보드만으로** 모든 기능 사용 가능
- **스크린 리더**로 모든 콘텐츠 접근 가능
- **최소 대비율 4.5:1** (텍스트) 유지

### 책임

| 역할 | 책임 |
|------|------|
| **UX 디자이너** | 접근 가능한 UI 설계, 컬러 대비 확인 |
| **프론트엔드 개발자** | ARIA 속성, 시맨틱 HTML, 키보드 네비게이션 구현 |
| **QA** | 접근성 테스트 수행 (자동화 + 수동) |
| **PM** | 접근성 요구사항 우선순위 관리 |

---

## WCAG 2.1 준수 사항

### 원칙 1: 인식 가능 (Perceivable)

#### 1.1 대체 텍스트 (Text Alternatives)

**가이드라인 1.1.1 - 비텍스트 콘텐츠**

모든 이미지, 아이콘, 그래픽에 대체 텍스트 제공

```html
<!-- ✅ 좋은 예 -->
<img src="company-logo.png" alt="테크스타트업 로고" />

<!-- ❌ 나쁜 예 -->
<img src="company-logo.png" />

<!-- 장식용 이미지 -->
<img src="decoration.png" alt="" role="presentation" />

<!-- 기능적 아이콘 -->
<button aria-label="관심 등록">
  <svg aria-hidden="true">...</svg>
</button>
```

**적용 예시:**
- 채용공고 카드의 기업 로고: `alt="[기업명] 로고"`
- 프로필 사진: `alt="[사용자명] 프로필 사진"`
- 검색 아이콘: `aria-label="검색"`
- 관심 등록 하트: `aria-label="관심 등록"` / `aria-label="관심 등록 취소"`

#### 1.2 시간 기반 미디어 (Time-based Media)

**가이드라인 1.2.1 - 자막 제공**

동영상 콘텐츠에 자막 제공

```html
<video controls>
  <source src="company-intro.mp4" type="video/mp4" />
  <track kind="captions" src="captions-ko.vtt" srclang="ko" label="한국어" default />
  <track kind="captions" src="captions-en.vtt" srclang="en" label="English" />
</video>
```

#### 1.3 적응 가능 (Adaptable)

**가이드라인 1.3.1 - 정보와 관계**

시맨틱 HTML로 콘텐츠 구조 명확히 표현

```html
<!-- ✅ 좋은 예: 시맨틱 HTML -->
<header>
  <nav aria-label="주요 네비게이션">
    <ul>
      <li><a href="/">홈</a></li>
      <li><a href="/jobs">채용공고</a></li>
    </ul>
  </nav>
</header>

<main>
  <section aria-labelledby="jobs-heading">
    <h1 id="jobs-heading">채용공고</h1>
    <article>
      <h2>프론트엔드 개발자</h2>
      <p>채용 내용...</p>
    </article>
  </section>
</main>

<!-- ❌ 나쁜 예: div 남용 -->
<div class="header">
  <div class="nav">
    <div class="link">홈</div>
  </div>
</div>
```

**가이드라인 1.3.2 - 의미 있는 순서**

콘텐츠의 읽기 순서가 논리적이어야 함

```html
<!-- DOM 순서가 시각적 순서와 일치해야 함 -->
<div class="job-card">
  <h3>직무 제목</h3>        <!-- 1. 제목 -->
  <p class="company">기업명</p>  <!-- 2. 기업 -->
  <p class="location">위치</p>   <!-- 3. 위치 -->
  <button>지원하기</button>      <!-- 4. 액션 -->
</div>
```

**가이드라인 1.3.3 - 감각 특성**

지시사항이 감각(색상, 모양, 위치)에만 의존하지 않도록 함

```html
<!-- ❌ 나쁜 예 -->
<p>빨간색 버튼을 클릭하세요</p>

<!-- ✅ 좋은 예 -->
<p>아래 "제출" 버튼을 클릭하세요</p>
<button class="submit-button">제출</button>
```

#### 1.4 구별 가능 (Distinguishable)

**가이드라인 1.4.1 - 색상 사용**

정보 전달이 색상에만 의존하지 않아야 함

```html
<!-- ❌ 나쁜 예: 색상만으로 구분 -->
<span style="color: red;">필수</span>

<!-- ✅ 좋은 예: 텍스트 + 아이콘 -->
<label>
  이름 <span class="required" aria-label="필수 항목">*</span>
</label>
```

**가이드라인 1.4.3 - 명암 대비 (최소)**

텍스트와 배경의 명암 대비율 최소 4.5:1 유지

| 텍스트 유형 | 최소 대비율 | 예시 |
|-------------|-------------|------|
| 일반 텍스트 (16px 이상) | 4.5:1 | #3E3E3C on #FFFFFF ✅ |
| 대형 텍스트 (24px 이상) | 3:1 | #706E6B on #FFFFFF ✅ |
| UI 컴포넌트 (버튼, 테두리) | 3:1 | #00A1E0 on #FFFFFF ✅ |

**NURI 컬러 대비 검증:**

```css
/* ✅ 통과 */
color: #16325C;  /* Dark Blue */
background: #FFFFFF;  /* 대비율: 12.6:1 */

color: #3E3E3C;  /* Gray-900 */
background: #F3F2F2;  /* Gray-100 (대비율: 11.2:1) */

color: #FFFFFF;  /* White */
background: #00A1E0;  /* Salesforce Blue (대비율: 3.5:1) - Large text only */

/* ❌ 실패 */
color: #706E6B;  /* Gray-600 */
background: #DDDBDA;  /* Gray-300 (대비율: 2.1:1) - 부족 */
```

**가이드라인 1.4.4 - 텍스트 크기 조절**

200%까지 확대 시에도 콘텐츠 손실 없어야 함

```css
/* rem 단위 사용 (사용자 브라우저 설정 존중) */
body {
  font-size: 16px;  /* 기본 */
}

h1 {
  font-size: 2rem;  /* 32px, 확대 가능 */
}

button {
  font-size: 1rem;
  padding: 0.5rem 1rem;  /* 상대 단위 */
}
```

**가이드라인 1.4.10 - Reflow (WCAG 2.1 추가)**

400% 확대 시 가로 스크롤 없이 콘텐츠 표시

```css
/* 반응형 레이아웃 사용 */
.container {
  max-width: 100%;
  overflow-x: hidden;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

**가이드라인 1.4.11 - Non-text Contrast**

UI 컴포넌트와 그래픽의 대비율 최소 3:1

```css
/* 버튼 테두리 */
.button-secondary {
  border: 2px solid #706E6B;  /* 대비율 3.5:1 ✅ */
}

/* 입력 필드 테두리 */
input {
  border: 1px solid #706E6B;  /* 대비율 3.5:1 ✅ */
}

/* 포커스 표시 */
input:focus {
  outline: 2px solid #00A1E0;  /* 대비율 3.8:1 ✅ */
}
```

---

### 원칙 2: 운용 가능 (Operable)

#### 2.1 키보드 접근 가능 (Keyboard Accessible)

**가이드라인 2.1.1 - 키보드**

모든 기능이 키보드로 조작 가능해야 함

```html
<!-- ✅ 네이티브 버튼 사용 (기본 키보드 지원) -->
<button onclick="submitForm()">제출</button>

<!-- ❌ div를 버튼으로 사용 (키보드 접근 불가) -->
<div class="button" onclick="submitForm()">제출</div>

<!-- ✅ div를 버튼으로 사용해야 한다면 -->
<div
  role="button"
  tabindex="0"
  onclick="submitForm()"
  onkeypress="handleKeyPress(event)">
  제출
</div>

<script>
function handleKeyPress(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    submitForm();
  }
}
</script>
```

**가이드라인 2.1.2 - 키보드 트랩 없음**

키보드 포커스가 갇히지 않아야 함

```javascript
// 모달 내부 포커스 트랩 구현
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {  // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {  // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    if (e.key === 'Escape') {
      closeModal();
    }
  });
}
```

**가이드라인 2.1.4 - 문자 단축키 (WCAG 2.1 추가)**

단일 문자 단축키는 끄거나 재할당 가능해야 함

```javascript
// 단축키 설정 UI 제공
const shortcuts = {
  '/': 'search',  // 검색창 포커스
  'j': 'nextJob', // 다음 공고
  'k': 'prevJob'  // 이전 공고
};

// 사용자가 끄거나 변경 가능하도록 설정 제공
```

#### 2.2 충분한 시간 (Enough Time)

**가이드라인 2.2.1 - 시간 제한 조절**

시간 제한이 있는 경우 사용자가 조절/연장/해제 가능해야 함

```javascript
// 세션 타임아웃 경고
function showTimeoutWarning() {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div role="dialog" aria-labelledby="timeout-title" aria-modal="true">
      <h2 id="timeout-title">세션 만료 경고</h2>
      <p>2분 후 세션이 만료됩니다.</p>
      <button onclick="extendSession()">세션 연장</button>
      <button onclick="logout()">로그아웃</button>
    </div>
  `;
  document.body.appendChild(modal);
}
```

**가이드라인 2.2.2 - 일시정지, 정지, 숨김**

자동으로 움직이는 콘텐츠는 일시정지 가능해야 함

```html
<!-- 자동 슬라이드 배너 -->
<div class="carousel" role="region" aria-label="추천 기업">
  <button aria-label="슬라이드 일시정지" onclick="pauseCarousel()">⏸</button>
  <!-- 슬라이드 콘텐츠 -->
</div>
```

#### 2.3 발작 및 물리적 반응 (Seizures and Physical Reactions)

**가이드라인 2.3.1 - 번쩍임 3회 이하**

1초에 3회 이상 번쩍이는 콘텐츠 금지

```css
/* ❌ 피해야 할 애니메이션 */
@keyframes rapid-flash {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}

/* ✅ 부드러운 전환 */
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### 2.4 탐색 가능 (Navigable)

**가이드라인 2.4.1 - 블록 건너뛰기**

반복되는 콘텐츠를 건너뛸 수 있어야 함

```html
<!-- Skip to main content 링크 -->
<body>
  <a href="#main-content" class="skip-link">
    본문으로 건너뛰기
  </a>

  <header>
    <nav>...</nav>
  </header>

  <main id="main-content">
    <!-- 주요 콘텐츠 -->
  </main>
</body>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>
```

**가이드라인 2.4.2 - 페이지 제목**

모든 페이지에 고유하고 설명적인 제목 제공

```html
<!-- ✅ 좋은 예 -->
<title>프론트엔드 개발자 채용 - 테크스타트업 | NURI</title>

<!-- ❌ 나쁜 예 -->
<title>NURI</title>
```

**페이지별 제목 규칙:**
- 홈: `NURI - 학생과 기업을 연결하는 AI 매칭 플랫폼`
- 채용공고 리스트: `채용공고 | NURI`
- 채용공고 상세: `[직무명] - [기업명] | NURI`
- 프로필: `내 프로필 - [이름] | NURI`

**가이드라인 2.4.3 - 포커스 순서**

포커스 순서가 의미와 조작에 맞아야 함

```html
<!-- DOM 순서 = Tab 순서 = 시각적 순서 -->
<form>
  <label for="name">이름</label>
  <input id="name" type="text" />  <!-- Tab 1 -->

  <label for="email">이메일</label>
  <input id="email" type="email" />  <!-- Tab 2 -->

  <button type="submit">제출</button>  <!-- Tab 3 -->
</form>
```

**가이드라인 2.4.4 - 링크 목적 (문맥 내)**

링크의 목적을 텍스트만으로 이해 가능해야 함

```html
<!-- ❌ 나쁜 예 -->
<a href="/job/123">더 보기</a>

<!-- ✅ 좋은 예 -->
<a href="/job/123">프론트엔드 개발자 채용 상세 보기</a>

<!-- ✅ 시각적으로 숨기고 스크린 리더용 텍스트 -->
<a href="/job/123">
  더 보기
  <span class="sr-only">프론트엔드 개발자 채용 상세</span>
</a>
```

**가이드라인 2.4.5 - 다양한 방법**

콘텐츠를 찾는 여러 방법 제공 (검색, 사이트맵, 메뉴)

```html
<nav aria-label="주요 네비게이션">
  <ul>
    <li><a href="/">홈</a></li>
    <li><a href="/jobs">채용공고</a></li>
    <li><a href="/companies">기업</a></li>
  </ul>
</nav>

<div class="search-bar">
  <input type="search" placeholder="채용공고 검색" />
</div>

<nav aria-label="사이트맵">
  <h2>사이트맵</h2>
  <!-- 전체 페이지 구조 -->
</nav>
```

**가이드라인 2.4.6 - 제목과 레이블**

제목과 레이블이 주제나 목적을 설명해야 함

```html
<!-- ✅ 명확한 제목 -->
<h1>채용공고 검색 결과</h1>
<h2>프론트엔드 개발자 채용</h2>

<!-- ✅ 설명적인 레이블 -->
<label for="search-jobs">채용공고 검색</label>
<input id="search-jobs" type="search" />
```

**가이드라인 2.4.7 - 포커스 표시**

포커스가 시각적으로 명확히 보여야 함

```css
/* 기본 브라우저 outline 제거 금지! */

/* ✅ 커스텀 포커스 스타일 */
a:focus,
button:focus,
input:focus {
  outline: 2px solid #00A1E0;
  outline-offset: 2px;
}

/* 고대비 모드에서도 보이도록 */
@media (prefers-contrast: high) {
  *:focus {
    outline: 3px solid;
  }
}
```

#### 2.5 입력 방식 (Input Modalities) - WCAG 2.1

**가이드라인 2.5.1 - 포인터 제스처**

다중 포인터 제스처에 대해 단일 포인터 대안 제공

```javascript
// ❌ 핀치 줌만 지원
element.addEventListener('gesturechange', handlePinch);

// ✅ 버튼으로 줌 대안 제공
<button onclick="zoomIn()">확대</button>
<button onclick="zoomOut()">축소</button>
```

**가이드라인 2.5.2 - 포인터 취소**

실수로 인한 클릭 방지 (mouseup에서 실행)

```javascript
// ✅ mouseup/touchend에서 실행
button.addEventListener('mouseup', handleClick);

// ❌ mousedown/touchstart에서 즉시 실행
button.addEventListener('mousedown', handleClick);
```

**가이드라인 2.5.3 - 레이블을 포함한 이름**

시각적 레이블이 접근 가능한 이름에 포함되어야 함

```html
<!-- ✅ aria-label이 시각적 텍스트 포함 -->
<button aria-label="지원하기">
  지원
</button>

<!-- ❌ aria-label과 시각적 텍스트 불일치 -->
<button aria-label="submit">
  지원하기
</button>
```

**가이드라인 2.5.4 - 동작 기반 작동**

흔들기, 기울이기 등 동작 기반 기능에 대안 제공

```html
<!-- 흔들기 대신 버튼 제공 -->
<p>피드백을 보내시려면 기기를 흔들거나 아래 버튼을 클릭하세요</p>
<button>피드백 보내기</button>
```

---

### 원칙 3: 이해 가능 (Understandable)

#### 3.1 읽기 쉬움 (Readable)

**가이드라인 3.1.1 - 페이지 언어**

페이지의 기본 언어를 명시해야 함

```html
<html lang="ko">
  <head>
    <title>NURI - 학생-기업 연결 플랫폼</title>
  </head>
</html>
```

**가이드라인 3.1.2 - 부분 언어**

부분적으로 다른 언어 사용 시 명시

```html
<p>
  최신 <span lang="en">React</span> 기술을 활용한
  <span lang="en">SaaS</span> 플랫폼입니다.
</p>
```

#### 3.2 예측 가능 (Predictable)

**가이드라인 3.2.1 - 포커스 시**

포커스만으로 문맥 변화가 일어나지 않아야 함

```javascript
// ❌ 나쁜 예: 포커스 시 자동 제출
input.addEventListener('focus', () => {
  form.submit();
});

// ✅ 좋은 예: 명시적 버튼 클릭으로 제출
button.addEventListener('click', () => {
  form.submit();
});
```

**가이드라인 3.2.2 - 입력 시**

입력만으로 문맥 변화가 일어나지 않아야 함

```html
<!-- ❌ 나쁜 예: 선택 시 자동 이동 -->
<select onchange="location.href=this.value">
  <option value="/jobs">채용공고</option>
  <option value="/companies">기업</option>
</select>

<!-- ✅ 좋은 예: 버튼으로 명시적 이동 -->
<select id="page-select">
  <option value="/jobs">채용공고</option>
  <option value="/companies">기업</option>
</select>
<button onclick="navigateTo()">이동</button>
```

**가이드라인 3.2.3 - 일관된 네비게이션**

반복되는 네비게이션은 일관된 순서 유지

```html
<!-- 모든 페이지에서 동일한 순서 -->
<nav>
  <a href="/">홈</a>
  <a href="/jobs">채용공고</a>
  <a href="/profile">프로필</a>
  <a href="/applications">지원 현황</a>
</nav>
```

**가이드라인 3.2.4 - 일관된 식별**

동일한 기능은 동일하게 식별되어야 함

```html
<!-- ✅ 모든 페이지에서 검색 아이콘 동일 -->
<button aria-label="검색">
  <svg><!-- 검색 아이콘 --></svg>
</button>

<!-- ❌ 페이지마다 다른 레이블 -->
<!-- Page 1 --> <button aria-label="찾기">
<!-- Page 2 --> <button aria-label="검색">
<!-- Page 3 --> <button aria-label="Search">
```

#### 3.3 입력 지원 (Input Assistance)

**가이드라인 3.3.1 - 오류 식별**

입력 오류가 자동으로 감지되면 오류 항목 식별 및 설명

```html
<form>
  <label for="email">이메일</label>
  <input
    id="email"
    type="email"
    aria-describedby="email-error"
    aria-invalid="true"
  />
  <span id="email-error" role="alert">
    유효한 이메일 주소를 입력하세요 (예: user@example.com)
  </span>
</form>
```

**가이드라인 3.3.2 - 레이블 또는 지침**

사용자 입력이 필요한 경우 레이블이나 지침 제공

```html
<label for="password">
  비밀번호
  <span aria-label="필수 항목">*</span>
</label>
<input
  id="password"
  type="password"
  aria-describedby="password-hint"
  required
/>
<span id="password-hint">
  8자 이상, 대문자, 소문자, 숫자, 특수문자 포함
</span>
```

**가이드라인 3.3.3 - 오류 제안**

오류 감지 시 수정 방법 제안

```html
<input
  type="email"
  value="user@gmailcom"
  aria-describedby="email-error"
  aria-invalid="true"
/>
<span id="email-error" role="alert">
  '@' 뒤에 도메인이 올바르지 않습니다. 'user@gmail.com'을 의도하셨나요?
</span>
```

**가이드라인 3.3.4 - 오류 방지 (법적, 금융, 데이터)**

중요한 제출 전 확인, 취소, 검토 기회 제공

```html
<!-- 지원서 제출 전 확인 -->
<div role="dialog" aria-labelledby="confirm-title">
  <h2 id="confirm-title">지원서 제출 확인</h2>
  <p>제출 후에는 수정할 수 없습니다. 제출하시겠습니까?</p>

  <button onclick="cancelSubmit()">취소</button>
  <button onclick="confirmSubmit()">확인</button>
</div>
```

---

### 원칙 4: 견고함 (Robust)

#### 4.1 호환성 (Compatible)

**가이드라인 4.1.1 - 구문 분석**

HTML이 올바르게 작성되어야 함

```html
<!-- ✅ 유효한 HTML -->
<div id="unique-id">
  <button type="button">클릭</button>
</div>

<!-- ❌ 중복 ID -->
<div id="duplicate-id">...</div>
<div id="duplicate-id">...</div>

<!-- ❌ 닫히지 않은 태그 -->
<div>
  <p>텍스트
</div>
```

**가이드라인 4.1.2 - 이름, 역할, 값**

UI 컴포넌트의 이름, 역할, 값이 프로그래밍 방식으로 식별 가능해야 함

```html
<!-- ✅ 커스텀 체크박스 (ARIA 사용) -->
<div
  role="checkbox"
  aria-checked="false"
  aria-labelledby="agree-label"
  tabindex="0"
  onkeypress="toggleCheckbox(event)"
>
  <span id="agree-label">이용약관에 동의합니다</span>
</div>

<!-- ✅ 더 좋은 방법: 네이티브 HTML -->
<label>
  <input type="checkbox" />
  이용약관에 동의합니다
</label>
```

**가이드라인 4.1.3 - 상태 메시지 (WCAG 2.1 추가)**

상태 메시지가 스크린 리더에 전달되어야 함

```html
<!-- 폼 제출 성공 -->
<div role="status" aria-live="polite">
  프로필이 성공적으로 저장되었습니다.
</div>

<!-- 긴급 알림 -->
<div role="alert" aria-live="assertive">
  세션이 곧 만료됩니다. 작업을 저장하세요.
</div>

<!-- 로딩 상태 -->
<div role="status" aria-live="polite" aria-busy="true">
  채용공고를 불러오는 중...
</div>
```

---

## 키보드 네비게이션

### 전역 단축키

| 키 | 동작 | 구현 |
|----|------|------|
| `Tab` | 다음 포커스 요소로 이동 | 브라우저 기본 동작 |
| `Shift + Tab` | 이전 포커스 요소로 이동 | 브라우저 기본 동작 |
| `Enter` | 버튼 클릭, 링크 이동 | 브라우저 기본 동작 |
| `Space` | 버튼 클릭, 체크박스 토글 | 브라우저 기본 동작 |
| `Esc` | 모달/드롭다운 닫기 | 커스텀 구현 필요 |
| `/` | 검색창으로 포커스 이동 | 커스텀 구현 (선택) |

### 컴포넌트별 키보드 인터랙션

#### 1. 모달 (Dialog)

```javascript
// 모달 오픈 시
function openModal(modalElement) {
  // 이전 포커스 저장
  previousFocus = document.activeElement;

  // 모달 표시
  modalElement.style.display = 'block';
  modalElement.setAttribute('aria-hidden', 'false');

  // 첫 번째 포커스 가능 요소로 포커스
  const firstFocusable = modalElement.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  firstFocusable.focus();

  // 포커스 트랩 활성화
  trapFocus(modalElement);
}

// 모달 닫기 시
function closeModal(modalElement) {
  modalElement.style.display = 'none';
  modalElement.setAttribute('aria-hidden', 'true');

  // 이전 포커스 복원
  previousFocus.focus();
}

// ESC 키로 닫기
modalElement.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal(modalElement);
  }
});
```

#### 2. 드롭다운 (Dropdown Menu)

| 키 | 동작 |
|----|------|
| `Enter` / `Space` | 드롭다운 열기/닫기 |
| `↓` (Arrow Down) | 다음 옵션으로 이동 |
| `↑` (Arrow Up) | 이전 옵션으로 이동 |
| `Home` | 첫 번째 옵션으로 이동 |
| `End` | 마지막 옵션으로 이동 |
| `Esc` | 드롭다운 닫기 |

```html
<div class="dropdown">
  <button
    id="menu-button"
    aria-haspopup="true"
    aria-expanded="false"
    onclick="toggleMenu()"
  >
    메뉴
  </button>

  <ul
    role="menu"
    aria-labelledby="menu-button"
    hidden
  >
    <li role="menuitem"><a href="/profile">프로필</a></li>
    <li role="menuitem"><a href="/settings">설정</a></li>
    <li role="menuitem"><a href="/logout">로그아웃</a></li>
  </ul>
</div>

<script>
function toggleMenu() {
  const button = document.getElementById('menu-button');
  const menu = button.nextElementSibling;
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  button.setAttribute('aria-expanded', !isExpanded);
  menu.hidden = isExpanded;

  if (!isExpanded) {
    menu.querySelector('[role="menuitem"]').focus();
  }
}

// 화살표 키 네비게이션
menu.addEventListener('keydown', (e) => {
  const items = menu.querySelectorAll('[role="menuitem"]');
  const currentIndex = Array.from(items).indexOf(document.activeElement);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % items.length;
    items[nextIndex].focus();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    items[prevIndex].focus();
  } else if (e.key === 'Escape') {
    toggleMenu();
    button.focus();
  }
});
</script>
```

#### 3. 탭 (Tabs)

| 키 | 동작 |
|----|------|
| `Tab` | 탭 패널 내부로 포커스 이동 |
| `←` / `→` | 이전/다음 탭으로 이동 |
| `Home` | 첫 번째 탭으로 이동 |
| `End` | 마지막 탭으로 이동 |

```html
<div class="tabs">
  <div role="tablist" aria-label="채용공고 상세">
    <button
      role="tab"
      aria-selected="true"
      aria-controls="panel-1"
      id="tab-1"
      tabindex="0"
    >
      채용 정보
    </button>
    <button
      role="tab"
      aria-selected="false"
      aria-controls="panel-2"
      id="tab-2"
      tabindex="-1"
    >
      기업 소개
    </button>
  </div>

  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
    채용 정보 내용...
  </div>

  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
    기업 소개 내용...
  </div>
</div>

<script>
// 화살표 키로 탭 전환
tablist.addEventListener('keydown', (e) => {
  const tabs = tablist.querySelectorAll('[role="tab"]');
  const currentIndex = Array.from(tabs).indexOf(document.activeElement);

  let nextIndex;
  if (e.key === 'ArrowRight') {
    nextIndex = (currentIndex + 1) % tabs.length;
  } else if (e.key === 'ArrowLeft') {
    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  } else if (e.key === 'Home') {
    nextIndex = 0;
  } else if (e.key === 'End') {
    nextIndex = tabs.length - 1;
  }

  if (nextIndex !== undefined) {
    e.preventDefault();
    selectTab(tabs[nextIndex]);
  }
});
</script>
```

#### 4. 캐러셀 (Carousel)

| 키 | 동작 |
|----|------|
| `Tab` | 캐러셀 컨트롤로 포커스 이동 |
| `←` / `→` | 이전/다음 슬라이드 |
| `Space` | 자동 재생 일시정지/재개 |

```html
<div class="carousel" role="region" aria-label="추천 채용공고">
  <button aria-label="이전 슬라이드" onclick="prevSlide()">‹</button>

  <div class="slides">
    <div class="slide" aria-label="슬라이드 1 / 5">
      <!-- 슬라이드 내용 -->
    </div>
  </div>

  <button aria-label="다음 슬라이드" onclick="nextSlide()">›</button>

  <button
    aria-label="자동 재생 일시정지"
    onclick="toggleAutoplay()"
  >
    ⏸
  </button>
</div>
```

---

## 스크린 리더 지원

### ARIA (Accessible Rich Internet Applications)

#### ARIA 역할 (Roles)

**랜드마크 역할 (Landmark Roles)**

```html
<header role="banner">
  <nav role="navigation" aria-label="주요 네비게이션">
    <!-- 메뉴 -->
  </nav>
</header>

<main role="main">
  <section aria-labelledby="jobs-heading">
    <h1 id="jobs-heading">채용공고</h1>
  </section>
</main>

<aside role="complementary" aria-label="관련 정보">
  <!-- 사이드바 -->
</aside>

<footer role="contentinfo">
  <!-- 푸터 -->
</footer>
```

**위젯 역할 (Widget Roles)**

```html
<!-- 버튼 -->
<div role="button" tabindex="0" onclick="handleClick()">클릭</div>

<!-- 체크박스 -->
<div role="checkbox" aria-checked="false" tabindex="0">동의</div>

<!-- 탭 -->
<div role="tablist">
  <button role="tab" aria-selected="true">탭 1</button>
</div>

<!-- 다이얼로그 -->
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">제목</h2>
</div>

<!-- 알림 -->
<div role="alert">오류가 발생했습니다</div>

<!-- 상태 -->
<div role="status">저장 중...</div>
```

#### ARIA 속성 (Properties)

**레이블 (Labels)**

```html
<!-- aria-label: 직접 레이블 제공 -->
<button aria-label="검색">🔍</button>

<!-- aria-labelledby: 다른 요소의 ID 참조 -->
<h2 id="section-title">추천 채용공고</h2>
<div aria-labelledby="section-title">
  <!-- 콘텐츠 -->
</div>

<!-- aria-describedby: 추가 설명 -->
<input
  type="password"
  aria-describedby="password-hint"
/>
<span id="password-hint">8자 이상 입력하세요</span>
```

**상태 (States)**

```html
<!-- aria-expanded: 확장/축소 상태 -->
<button aria-expanded="false" aria-controls="menu">메뉴</button>
<ul id="menu" hidden>...</ul>

<!-- aria-selected: 선택 상태 -->
<button role="tab" aria-selected="true">탭 1</button>

<!-- aria-checked: 체크 상태 -->
<div role="checkbox" aria-checked="true">동의함</div>

<!-- aria-pressed: 토글 버튼 -->
<button aria-pressed="false">음소거</button>

<!-- aria-disabled: 비활성화 -->
<button aria-disabled="true">제출</button>

<!-- aria-invalid: 입력 오류 -->
<input aria-invalid="true" />

<!-- aria-busy: 로딩 중 -->
<div aria-busy="true">로딩 중...</div>
```

**실시간 영역 (Live Regions)**

```html
<!-- aria-live: 변경 사항 알림 -->
<div aria-live="polite">
  검색 결과: 15개
</div>

<!-- aria-live="assertive": 즉시 알림 (긴급) -->
<div aria-live="assertive">
  세션이 곧 만료됩니다!
</div>

<!-- role="status": 암묵적 aria-live="polite" -->
<div role="status">
  파일 업로드 중... 50%
</div>

<!-- role="alert": 암묵적 aria-live="assertive" -->
<div role="alert">
  폼 제출에 실패했습니다.
</div>
```

#### 스크린 리더 전용 텍스트

```html
<!-- 시각적으로 숨기고 스크린 리더에만 노출 -->
<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>

<button>
  <svg aria-hidden="true"><!-- 아이콘 --></svg>
  <span class="sr-only">관심 등록</span>
</button>

<a href="/job/123">
  더 보기
  <span class="sr-only">프론트엔드 개발자 채용 상세</span>
</a>
```

### 스크린 리더 테스트

**주요 스크린 리더:**
- **NVDA** (Windows, 무료)
- **JAWS** (Windows, 유료)
- **VoiceOver** (macOS/iOS, 내장)
- **TalkBack** (Android, 내장)

**VoiceOver 단축키 (macOS):**
- `Cmd + F5`: VoiceOver 켜기/끄기
- `VO + A`: 페이지 읽기 시작
- `VO + →`: 다음 항목
- `VO + ←`: 이전 항목
- `VO + U`: 로터 열기 (랜드마크, 헤딩, 링크 탐색)

**테스트 시나리오:**
1. 페이지 제목이 정확히 읽히는가?
2. 랜드마크로 빠르게 탐색 가능한가?
3. 버튼과 링크의 목적이 명확한가?
4. 폼 입력 시 레이블과 힌트가 읽히는가?
5. 에러 메시지가 자동으로 알려지는가?

---

## 시각적 접근성

### 컬러 접근성

#### 색상 대비 검증 도구
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Colour Contrast Analyser**: https://www.tpgi.com/color-contrast-checker/
- **Chrome DevTools**: Lighthouse 감사

#### NURI 컬러 시스템 대비율

| 전경색 | 배경색 | 대비율 | 통과 | 용도 |
|--------|--------|--------|------|------|
| #16325C (Dark Blue) | #FFFFFF | 12.6:1 | AAA ✅ | 본문 텍스트 |
| #3E3E3C (Gray-900) | #FFFFFF | 14.1:1 | AAA ✅ | 본문 텍스트 |
| #706E6B (Gray-600) | #FFFFFF | 4.6:1 | AA ✅ | 보조 텍스트 |
| #FFFFFF | #00A1E0 (Blue) | 3.5:1 | Large Only ⚠️ | 버튼 텍스트 (18px+) |
| #16325C | #F3F2F2 (Gray-100) | 11.2:1 | AAA ✅ | 배경 텍스트 |

#### 색맹 대응

**색상만으로 정보 전달 금지**

```html
<!-- ❌ 나쁜 예: 색상으로만 구분 -->
<span style="color: green;">합격</span>
<span style="color: red;">불합격</span>

<!-- ✅ 좋은 예: 아이콘 + 텍스트 -->
<span class="status-pass">
  <svg aria-hidden="true"><!-- 체크 아이콘 --></svg>
  합격
</span>
<span class="status-fail">
  <svg aria-hidden="true"><!-- X 아이콘 --></svg>
  불합격
</span>
```

**시뮬레이션 도구:**
- Chrome DevTools: Rendering > Emulate vision deficiencies
- Sim Daltonism (macOS)
- Color Oracle (Windows/macOS/Linux)

### 반응형 텍스트 크기

```css
/* 기본 폰트 크기 설정 (사용자 브라우저 설정 존중) */
html {
  font-size: 100%;  /* 16px */
}

/* rem 단위 사용 */
body {
  font-size: 1rem;  /* 16px */
}

h1 {
  font-size: 2rem;  /* 32px */
}

h2 {
  font-size: 1.5rem;  /* 24px */
}

/* 절대 단위(px) 사용 금지 */
/* ❌ */
p {
  font-size: 14px;  /* 사용자가 확대 불가 */
}

/* 200% 확대 테스트 */
@media (min-width: 1920px) {
  html {
    font-size: 120%;  /* 큰 화면에서 자동 확대 */
  }
}
```

### 포커스 표시 (Focus Indicators)

```css
/* 기본 브라우저 outline 제거 금지! */
/* ❌ */
*:focus {
  outline: none;  /* 절대 금지! */
}

/* ✅ 커스텀 포커스 스타일 */
a:focus,
button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 2px solid #00A1E0;
  outline-offset: 2px;
}

/* :focus-visible로 키보드 포커스만 표시 (선택) */
button:focus-visible {
  outline: 2px solid #00A1E0;
}

button:focus:not(:focus-visible) {
  outline: none;  /* 마우스 클릭 시 outline 제거 */
}

/* 고대비 모드 지원 */
@media (prefers-contrast: high) {
  *:focus {
    outline: 3px solid;
    outline-offset: 2px;
  }
}

/* 다크 모드 포커스 */
@media (prefers-color-scheme: dark) {
  *:focus {
    outline-color: #4ECDC4;
  }
}
```

---

## 폼 접근성

### 레이블 및 힌트

```html
<!-- ✅ 명시적 레이블 연결 -->
<label for="email">이메일</label>
<input
  id="email"
  type="email"
  required
  aria-describedby="email-hint"
/>
<span id="email-hint">
  회사 이메일을 입력하세요 (예: user@company.com)
</span>

<!-- ✅ 암묵적 레이블 (레이블 내부에 input) -->
<label>
  비밀번호
  <input type="password" required />
</label>

<!-- ❌ 레이블 없음 -->
<input type="text" placeholder="이름" />  <!-- 접근성 위반 -->
```

### 필수 입력 표시

```html
<!-- ✅ 시각적 + 스크린 리더 표시 -->
<label for="name">
  이름
  <span aria-label="필수 항목" class="required">*</span>
</label>
<input
  id="name"
  type="text"
  required
  aria-required="true"
/>

<style>
.required {
  color: #EA001E;
  font-weight: bold;
}
</style>
```

### 에러 메시지

```html
<form>
  <label for="email">이메일</label>
  <input
    id="email"
    type="email"
    aria-describedby="email-error"
    aria-invalid="true"
  />

  <!-- 에러 메시지 (role="alert"로 즉시 알림) -->
  <span id="email-error" role="alert" class="error">
    <svg aria-hidden="true"><!-- 경고 아이콘 --></svg>
    유효한 이메일 주소를 입력하세요
  </span>
</form>

<style>
.error {
  color: #EA001E;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}
</style>
```

### 폼 그룹 (Fieldset)

```html
<!-- 라디오/체크박스 그룹 -->
<fieldset>
  <legend>희망 고용 형태</legend>

  <label>
    <input type="checkbox" name="employment" value="fulltime" />
    정규직
  </label>

  <label>
    <input type="checkbox" name="employment" value="contract" />
    계약직
  </label>

  <label>
    <input type="checkbox" name="employment" value="intern" />
    인턴
  </label>
</fieldset>
```

### 자동완성 (Autocomplete)

```html
<!-- 브라우저 자동완성 지원 -->
<form autocomplete="on">
  <label for="name">이름</label>
  <input id="name" type="text" autocomplete="name" />

  <label for="email">이메일</label>
  <input id="email" type="email" autocomplete="email" />

  <label for="tel">전화번호</label>
  <input id="tel" type="tel" autocomplete="tel" />

  <label for="address">주소</label>
  <input id="address" type="text" autocomplete="street-address" />
</form>
```

---

## 에러 처리 접근성

### 실시간 검증 피드백

```javascript
const emailInput = document.getElementById('email');

emailInput.addEventListener('blur', () => {
  if (!emailInput.validity.valid) {
    // 에러 표시
    emailInput.setAttribute('aria-invalid', 'true');

    const errorMsg = document.getElementById('email-error');
    errorMsg.textContent = '유효한 이메일 주소를 입력하세요';
    errorMsg.setAttribute('role', 'alert');  // 스크린 리더에 즉시 알림
  } else {
    // 에러 해제
    emailInput.setAttribute('aria-invalid', 'false');
    document.getElementById('email-error').textContent = '';
  }
});
```

### 폼 제출 에러 요약

```html
<!-- 페이지 상단에 에러 요약 표시 -->
<div
  id="error-summary"
  role="alert"
  aria-labelledby="error-heading"
  class="error-summary"
  hidden
>
  <h2 id="error-heading">폼 제출 오류</h2>
  <p>다음 3개 항목을 수정해주세요:</p>
  <ul>
    <li><a href="#email">이메일: 유효한 이메일 주소를 입력하세요</a></li>
    <li><a href="#password">비밀번호: 8자 이상 입력하세요</a></li>
    <li><a href="#terms">이용약관: 동의가 필요합니다</a></li>
  </ul>
</div>

<script>
function validateForm() {
  const errors = [];

  // 검증 로직...

  if (errors.length > 0) {
    // 에러 요약 표시
    const summary = document.getElementById('error-summary');
    summary.hidden = false;
    summary.focus();  // 포커스 이동

    // 페이지 최상단으로 스크롤
    window.scrollTo(0, 0);

    return false;
  }

  return true;
}
</script>
```

---

## 모바일 접근성

### 터치 타겟 크기

**최소 크기: 44x44px (Apple HIG, WCAG 2.1 권장)**

```css
/* 터치 타겟 최소 크기 */
button,
a,
input[type="checkbox"],
input[type="radio"] {
  min-width: 44px;
  min-height: 44px;
}

/* 시각적으로 작지만 터치 영역 확대 */
.icon-button {
  width: 24px;
  height: 24px;
  padding: 10px;  /* 총 44x44px */
}

/* 링크 간 충분한 간격 */
nav a {
  padding: 12px 16px;
  margin: 4px 0;
}
```

### 확대/축소 허용

```html
<!-- ✅ 사용자 확대 허용 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- ❌ 확대 금지 (접근성 위반) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
```

### 가로 방향 지원

```css
/* 세로/가로 모두 지원 */
@media (orientation: landscape) {
  .container {
    flex-direction: row;
  }
}

@media (orientation: portrait) {
  .container {
    flex-direction: column;
  }
}
```

---

## 테스트 체크리스트

### 자동화 테스트 도구

#### 1. axe DevTools (Chrome Extension)
- **사용법**: 개발자 도구 > axe DevTools 탭
- **장점**: 실시간 접근성 이슈 감지
- **테스트 항목**: ARIA, 컬러 대비, 키보드 접근성

#### 2. Lighthouse (Chrome DevTools)
- **사용법**: 개발자 도구 > Lighthouse > Accessibility
- **장점**: 종합적인 접근성 점수 제공
- **테스트 항목**: 100점 만점 기준, 90점 이상 목표

#### 3. WAVE (Web Accessibility Evaluation Tool)
- **URL**: https://wave.webaim.org/
- **장점**: 시각적으로 이슈 표시
- **테스트 항목**: 에러, 경고, 구조 문제

### 수동 테스트 체크리스트

#### ✅ 키보드 접근성
- [ ] Tab 키로 모든 인터랙티브 요소 접근 가능
- [ ] Shift+Tab으로 역순 네비게이션 가능
- [ ] Enter/Space로 버튼 및 링크 활성화
- [ ] Esc로 모달 닫기 가능
- [ ] 포커스 표시(outline)가 명확히 보임
- [ ] 키보드 트랩 없음 (모달 제외)

#### ✅ 스크린 리더
- [ ] 페이지 제목이 명확함
- [ ] 랜드마크로 섹션 탐색 가능
- [ ] 모든 이미지에 대체 텍스트 존재
- [ ] 버튼/링크 목적이 명확함
- [ ] 폼 레이블과 입력 필드 연결됨
- [ ] 에러 메시지가 자동으로 읽힘

#### ✅ 시각적 접근성
- [ ] 텍스트 대비율 4.5:1 이상
- [ ] 200% 확대 시 콘텐츠 손실 없음
- [ ] 색상만으로 정보 전달하지 않음
- [ ] 포커스 표시가 2px 이상
- [ ] 호버 효과가 명확함

#### ✅ 모바일 접근성
- [ ] 터치 타겟 최소 44x44px
- [ ] 가로/세로 방향 모두 지원
- [ ] 확대/축소 허용됨
- [ ] 가로 스크롤 없음

#### ✅ 폼 접근성
- [ ] 모든 입력 필드에 레이블 존재
- [ ] 필수 입력 항목 명시
- [ ] 에러 메시지가 명확함
- [ ] 제출 전 확인 단계 제공
- [ ] 자동완성 지원

### 테스트 시나리오

#### 시나리오 1: 채용공고 검색 및 지원
1. Tab 키로 검색창 접근
2. 검색어 입력 후 Enter
3. 화살표 키로 결과 탐색
4. 공고 카드 클릭 (Enter)
5. 상세 페이지에서 "지원하기" 버튼 찾기
6. 지원서 작성 폼 입력
7. 제출

**예상 소요 시간**: 3-5분
**성공 기준**: 키보드만으로 전 과정 완료 가능

#### 시나리오 2: 프로필 편집
1. 대시보드에서 프로필 메뉴 접근
2. 편집 버튼 클릭
3. 각 필드 수정
4. 프로젝트 추가 모달 열기
5. 정보 입력 후 저장
6. 모달 닫기 (Esc)
7. 전체 프로필 저장

**예상 소요 시간**: 5-7분
**성공 기준**: 모든 입력 필드 접근 가능, 에러 처리 명확

#### 시나리오 3: 스크린 리더로 페이지 탐색
1. VoiceOver/NVDA 켜기
2. 페이지 제목 확인
3. 랜드마크로 메인 콘텐츠 이동
4. 채용공고 카드 정보 청취
5. 링크 목적 파악
6. 이미지 대체 텍스트 확인

**예상 소요 시간**: 10-15분
**성공 기준**: 모든 정보가 논리적 순서로 읽힘

---

## 구현 우선순위

### Phase 1: 필수 (MVP 출시 전)
- ✅ 시맨틱 HTML
- ✅ 키보드 네비게이션
- ✅ 대체 텍스트
- ✅ 폼 레이블
- ✅ 컬러 대비 4.5:1
- ✅ 포커스 표시

### Phase 2: 중요 (MVP 출시 후 1개월)
- ⚠️ ARIA 속성 추가
- ⚠️ 에러 처리 개선
- ⚠️ 스크린 리더 최적화
- ⚠️ 모달 포커스 트랩

### Phase 3: 개선 (장기)
- ○ 단축키 지원
- ○ 고대비 모드
- ○ 다크 모드
- ○ 다국어 지원

---

## 책임 및 프로세스

### 개발 단계별 접근성 체크

| 단계 | 책임자 | 활동 |
|------|--------|------|
| **설계** | UX 디자이너 | • 컬러 대비 확인<br>• 터치 타겟 크기<br>• 키보드 네비게이션 설계 |
| **개발** | 프론트엔드 | • 시맨틱 HTML<br>• ARIA 속성<br>• 키보드 이벤트 구현 |
| **테스트** | QA | • axe/Lighthouse 실행<br>• 키보드 테스트<br>• 스크린 리더 테스트 |
| **배포 전** | PM | • 접근성 점수 90+ 확인<br>• 체크리스트 검토 |

### 이슈 심각도 분류

| 심각도 | 설명 | 대응 |
|--------|------|------|
| **Critical** | 주요 기능 사용 불가 (예: 키보드 접근 불가) | 즉시 수정, 배포 차단 |
| **High** | 일부 사용자 어려움 (예: 대비율 부족) | 1주 내 수정 |
| **Medium** | 개선 권장 (예: ARIA 속성 누락) | 2주 내 수정 |
| **Low** | 사소한 개선 (예: 불필요한 ARIA) | 다음 스프린트 |

---

## 참고 자료

### 공식 문서
- **WCAG 2.1**: https://www.w3.org/TR/WCAG21/
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/
- **WebAIM**: https://webaim.org/

### 도구
- **axe DevTools**: https://www.deque.com/axe/devtools/
- **WAVE**: https://wave.webaim.org/
- **Lighthouse**: Chrome DevTools
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/

### 교육
- **A11ycasts (YouTube)**: https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g
- **Web Accessibility (Udacity)**: https://www.udacity.com/course/web-accessibility--ud891

---

**문서 버전**: 1.0
**마지막 업데이트**: 2026-02-10
**담당자**: Gagahoho UX Team
**검토자**: CEO 강승식

**관련 문서**:
- [User Flow Document](./user-flow.md)
- [Wireframes](./wireframes/README.md)
- [Component Library](./components/README.md)

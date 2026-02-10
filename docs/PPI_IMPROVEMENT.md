# PPI 개선 작업 문서

## 📋 문서 정보
- **프로젝트명**: NURI (National University-Research-Industry)
- **프로젝트 코드**: 0001
- **작성일**: 2026-02-10
- **작업 유형**: UI/UX 개선
- **우선순위**: High

---

## 🎯 개선 목표

### 주요 목표
NURI 플랫폼의 다양한 디바이스(모바일, 태블릿, 데스크톱)에서 최적의 화면 선명도와 사용자 경험을 제공하기 위한 PPI(Pixels Per Inch) 최적화 작업

### 기대 효과
1. **사용자 경험 향상**: Retina 및 고해상도 디스플레이에서 선명한 UI 제공
2. **브랜드 이미지 제고**: 전문적이고 세련된 비주얼 품질
3. **접근성 개선**: 모든 디바이스에서 일관된 가독성 확보
4. **성능 최적화**: 불필요한 고해상도 이미지 로딩 방지

---

## 📊 현황 분석

### 타겟 디바이스별 PPI 기준

| 디바이스 유형 | 화면 크기 | 표준 PPI | 최적 이미지 배율 |
|--------------|----------|---------|----------------|
| 모바일 (iPhone 15 Pro) | 6.1" | 460 PPI | 3x |
| 모바일 (Galaxy S24) | 6.2" | 416 PPI | 3x |
| 태블릿 (iPad Pro) | 12.9" | 264 PPI | 2x |
| 데스크톱 (MacBook Pro) | 16" | 254 PPI | 2x |
| 데스크톱 (일반 모니터) | 24" | 92 PPI | 1x |

### 개선 대상 컴포넌트

#### 1. 공통 UI 요소
- [ ] 로고 (헤더, 푸터)
- [ ] 아이콘 세트 (내비게이션, 버튼)
- [ ] 배경 이미지 (히어로 섹션, 섹션 구분)
- [ ] 일러스트레이션 (온보딩, 빈 상태)

#### 2. 학생 프로필 관련
- [ ] 프로필 사진
- [ ] 포트폴리오 썸네일
- [ ] 자격증 스캔 이미지
- [ ] 프로젝트 스크린샷

#### 3. 기업/채용 관련
- [ ] 기업 로고
- [ ] 채용공고 배너
- [ ] 회사 소개 이미지
- [ ] 오피스 사진

#### 4. 산학협력 프로젝트
- [ ] 프로젝트 대표 이미지
- [ ] 연구 결과물 시각화
- [ ] 발표 자료 썸네일
- [ ] PDF 문서 미리보기

---

## 🛠️ 기술 구현 방안

### 1. 반응형 이미지 전략

#### HTML `srcset` 및 `sizes` 활용
```html
<img
  src="/images/logo.png"
  srcset="
    /images/logo@1x.png 1x,
    /images/logo@2x.png 2x,
    /images/logo@3x.png 3x
  "
  alt="NURI Logo"
  width="200"
  height="60"
/>
```

#### Next.js Image 컴포넌트 (추천)
```tsx
import Image from 'next/image';

<Image
  src="/images/hero-bg.jpg"
  alt="Hero Background"
  width={1920}
  height={1080}
  quality={85}
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

#### CSS `image-set()` 함수
```css
.hero-section {
  background-image: image-set(
    url('/images/hero@1x.jpg') 1x,
    url('/images/hero@2x.jpg') 2x,
    url('/images/hero@3x.jpg') 3x
  );
}
```

### 2. SVG 최우선 사용
아이콘 및 로고는 가능한 SVG 포맷 사용 (무한 확장 가능)

```tsx
// Salesforce Lightning Design System 스타일 아이콘 컴포넌트
const IconWrapper = styled.div`
  width: 1rem;
  height: 1rem;
  color: #00A1E0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

<IconWrapper>
  <svg viewBox="0 0 24 24">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
  </svg>
</IconWrapper>
```

### 3. 이미지 최적화 파이프라인

#### Sharp 라이브러리 활용 (Node.js)
```typescript
import sharp from 'sharp';

async function generateResponsiveImages(inputPath: string) {
  const sizes = [1, 2, 3]; // 배율

  for (const scale of sizes) {
    await sharp(inputPath)
      .resize({ width: 200 * scale })
      .webp({ quality: 85 })
      .toFile(`output@${scale}x.webp`);
  }
}
```

#### WebP 포맷 우선 적용
```html
<picture>
  <source srcset="/images/hero@2x.webp 2x, /images/hero@1x.webp 1x" type="image/webp">
  <source srcset="/images/hero@2x.jpg 2x, /images/hero@1x.jpg 1x" type="image/jpeg">
  <img src="/images/hero@1x.jpg" alt="Hero">
</picture>
```

### 4. CSS 픽셀 밀도 미디어 쿼리
```css
/* 표준 디스플레이 (1x) */
.logo {
  background-image: url('/images/logo@1x.png');
}

/* 고해상도 디스플레이 (2x) */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo {
    background-image: url('/images/logo@2x.png');
  }
}

/* 초고해상도 디스플레이 (3x) */
@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
  .logo {
    background-image: url('/images/logo@3x.png');
  }
}
```

---

## 📐 Salesforce Lightning Design System (SLDS) 적용

### 이미지 카드 컴포넌트
```tsx
import styled from 'styled-components';

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #dddbda;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #dddbda;
  background: #f3f2f2;
  font-weight: bold;
  color: #16325c;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const ResponsiveImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export function ProjectCard({ title, imageUrl }: { title: string; imageUrl: string }) {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <ResponsiveImage
          src={imageUrl}
          srcSet={`
            ${imageUrl}?w=400&q=85 1x,
            ${imageUrl}?w=800&q=85 2x,
            ${imageUrl}?w=1200&q=85 3x
          `}
          alt={title}
          loading="lazy"
        />
      </CardBody>
    </Card>
  );
}
```

---

## 🔄 이미지 변환 자동화

### Builder 에이전트 활용
BMAD Elite 4의 **Builder (🔨)** 에이전트를 통해 이미지 에셋 자동 생성

```typescript
// bmad_elite_4_nodes.ts 내 generate_assets 도구 활용
const generate_assets = new DynamicStructuredTool({
  name: "generate_assets",
  description: "Generate UI images, icons, and graphics for web/mobile apps.",
  schema: z.object({
    type: z.enum(["logo", "icon", "banner", "illustration"]),
    size: z.string().describe("Dimensions in WxH format (e.g., 200x60)"),
    scale: z.enum(["1x", "2x", "3x"]).optional(),
  }),
  func: async ({ type, size, scale }) => {
    // 실제 DALL-E 3 또는 Midjourney API 호출
    return `Generated ${type} at ${size} with ${scale || "1x"} scale`;
  },
});
```

### CI/CD 파이프라인 통합
```yaml
# .github/workflows/optimize-images.yml
name: Optimize Images

on:
  push:
    paths:
      - 'public/images/**'

jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Sharp
        run: npm install -g sharp-cli
      - name: Generate @2x and @3x
        run: |
          for img in public/images/*.png; do
            sharp -i "$img" -o "${img%.png}@2x.png" resize 2
            sharp -i "$img" -o "${img%.png}@3x.png" resize 3
          done
      - name: Commit Changes
        run: |
          git config user.name "GitHub Actions"
          git add public/images
          git commit -m "chore: generate high-DPI images"
          git push
```

---

## 📈 성능 최적화

### Lazy Loading 적용
```tsx
<img
  src="/images/profile.jpg"
  loading="lazy"
  decoding="async"
  alt="Student Profile"
/>
```

### CDN 캐싱 전략
```nginx
# Nginx 설정 예시
location ~* \.(jpg|jpeg|png|webp|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

### Lighthouse 성능 목표
- **Performance Score**: 90+ (모바일), 95+ (데스크톱)
- **LCP (Largest Contentful Paint)**: < 2.5초
- **CLS (Cumulative Layout Shift)**: < 0.1

---

## ✅ 검증 체크리스트

### 개발 단계
- [ ] 모든 이미지에 `@1x`, `@2x`, `@3x` 버전 생성 완료
- [ ] SVG 파일 최적화 (불필요한 메타데이터 제거)
- [ ] WebP 포맷 변환 및 fallback 이미지 제공
- [ ] Next.js Image 컴포넌트로 교체 완료

### 테스트 단계
- [ ] Chrome DevTools (디바이스 에뮬레이션) 테스트
  - iPhone 15 Pro (3x)
  - iPad Pro (2x)
  - MacBook Pro (2x)
  - 일반 모니터 (1x)
- [ ] 실제 디바이스 테스트 (최소 3종)
- [ ] Lighthouse 성능 스코어 90+ 달성
- [ ] 네트워크 속도별 테스트 (3G, 4G, Wi-Fi)

### 배포 전
- [ ] 이미지 파일 총 용량 측정 및 최적화
- [ ] CDN 캐시 설정 확인
- [ ] 모니터링 알림 설정 (Core Web Vitals)

---

## 📅 마일스톤

### Phase 1: 분석 및 계획 (Week 1)
- [x] 현황 분석 문서 작성
- [ ] 기존 이미지 에셋 목록 작성
- [ ] 우선순위 설정 (Critical Path 이미지 선정)

### Phase 2: 핵심 컴포넌트 개선 (Week 2-3)
- [ ] 공통 UI (로고, 아이콘) 교체
- [ ] 학생 프로필 페이지 최적화
- [ ] 기업 대시보드 최적화

### Phase 3: 전체 페이지 적용 (Week 4-5)
- [ ] 나머지 페이지 일괄 적용
- [ ] PDF 생성 로직 개선
- [ ] 성능 테스트 및 최적화

### Phase 4: 모니터링 및 개선 (Week 6)
- [ ] Lighthouse CI 설정
- [ ] Real User Monitoring (RUM) 데이터 수집
- [ ] 사용자 피드백 수렴

---

## 🚨 리스크 관리

### 예상 리스크
1. **파일 용량 증가**: 3배수 이미지로 인한 저장 공간 증가
   - **대응**: CDN 최적화, WebP 포맷, Lazy Loading

2. **레거시 브라우저 지원**: 구형 브라우저에서 WebP 미지원
   - **대응**: `<picture>` 태그로 fallback 제공

3. **개발 시간 지연**: 수동 이미지 변환 작업량
   - **대응**: Builder 에이전트 자동화, CI/CD 파이프라인

4. **성능 저하**: 모바일 네트워크에서 로딩 지연
   - **대응**: 적응형 이미지 로딩, Progressive JPEG

---

## 📚 참고 자료

### 디자인 시스템
- [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/)
- [Material Design - Density Independence](https://material.io/design/layout/pixel-density.html)

### 기술 문서
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [MDN - Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)

### 성능 최적화
- [Web.dev - Optimize Images](https://web.dev/fast/#optimize-your-images)
- [Core Web Vitals](https://web.dev/vitals/)

---

## 👥 담당자

| 역할 | 담당자 | 비고 |
|-----|--------|------|
| 프로젝트 매니저 | TBD | 전체 일정 관리 |
| UX 아키텍트 | Gagahoho AI Agent | SLDS 디자인 적용 |
| 프론트엔드 개발 | TBD | Next.js Image 컴포넌트 구현 |
| 백엔드 개발 | TBD | 이미지 변환 API 구축 |
| QA 엔지니어 | BMAD Critic 🔧 | 성능 및 품질 검증 |

---

**작성자**: Gagahoho AI Agent (BMAD Elite 4)
**최종 업데이트**: 2026-02-10
**문서 버전**: 1.0
**승인 상태**: 🟡 대표님 검토 대기 중

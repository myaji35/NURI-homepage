# NURI 홈페이지 배포 가이드

## 현재 상태
- ✅ 정적 웹사이트 완성 (`public/` 폴더)
- ✅ 로컬 서버 작동 확인 (http://localhost:8080)

## 배포 옵션

### 1. Vercel (추천 - 무료)
```bash
cd /Volumes/Extreme\ SSD/02_GitHub.nosync/0001_NURI
npx vercel --prod
# 브라우저에서 로그인 후 배포 완료
# URL: https://nuri-farm.vercel.app (자동 생성)
```

### 2. Netlify (무료)
```bash
npm install -g netlify-cli
cd /Volumes/Extreme\ SSD/02_GitHub.nosync/0001_NURI
netlify deploy --prod --dir=public
# 브라우저에서 로그인 후 배포 완료
# URL: https://nuri-farm.netlify.app (자동 생성)
```

### 3. GitHub Pages (무료)
1. GitHub에 저장소 생성: `NURI-homepage`
2. `public/` 폴더 내용 푸시
3. Settings > Pages > Source: `main` branch
4. URL: https://[username].github.io/NURI-homepage

### 4. Surge.sh (무료 - 가장 간단)
```bash
cd /Volumes/Extreme\ SSD/02_GitHub.nosync/0001_NURI/public
npx surge --domain nuri-farm.surge.sh
# 이메일/비밀번호 입력
# URL: https://nuri-farm.surge.sh
```

### 5. Vultr 서버 (유료 $6/월)
```bash
# Root Control Center에서 자동 배포
cd /Volumes/Extreme\ SSD/02_GitHub.nosync/9999_master_root/root_control_center
rails console
# VultrApiClient.new.create_instance(folder: Folder.find_by(code: "0001"))
```

## 로컬 테스트
```bash
cd /Volumes/Extreme\ SSD/02_GitHub.nosync/0001_NURI/public
python3 -m http.server 8080
# http://localhost:8080 접속
```

## 파일 구조
```
public/
├── index.html          # 메인 페이지
├── goesan.html         # 괴산점 상세
├── dashboard.html      # 대시보드
├── 5year-plan.html     # 5개년 계획
└── images/             # 이미지 파일
```

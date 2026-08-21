책책책 📖 v1.6

이번 버전
- 앱 이름: 책책책 📖
- 하얀 배경 + 손글씨 느낌 제목/문구
- 연한 하늘색 포인트 컬러
- 아이폰 Safari에서 화면 폭이 밀리지 않도록 모바일 레이아웃 보강
- 표지 이미지 URL 입력칸 숨김
- 별점 0.5점 표시 수정: 별 자체는 제자리에 있고 내부 색만 반만 채워짐
- 별 5개를 터치해 0.5점 단위 선택
- 알라딘 검색 후 ISBN13으로 상세조회해 쪽수를 한 번 더 가져오도록 변경
- 기존 실제 책더미 스타일 / 백업 / 복원 유지

중요: 쪽수 상세조회 기능을 쓰려면 Cloudflare Worker도 업데이트해야 합니다.

1. GitHub 저장소에 아래 파일 교체
   index.html
   manifest.json
   sw.js
   icon-192.png
   icon-512.png

2. Cloudflare Worker 편집 화면에서
   worker-protected-v1.6.js 내용을 기존 코드 전체와 교체한 뒤 Deploy

3. ALADIN_TTB_KEY Secret은 그대로 두면 됩니다.

화면에 v1.6이 보이면 적용 완료입니다.

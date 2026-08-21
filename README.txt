나의 책더미 v1.5

변경 사항
- 홈의 책을 더 실제 책처럼 보이도록 수정
- 알라딘 표지 이미지를 책의 겉표지/책등 질감처럼 사용
- 왼쪽에 종이 페이지 단면 표현
- 상단 책 모서리와 그림자 추가
- 쪽수에 따라 두께 변화 유지
- 책마다 길이/기울기 차이 유지
- v1.4의 별점 0.5점 터치 기능과 백업/복원 유지
- Cloudflare Worker 검색 구조 유지

GitHub 저장소 최상위에 아래 파일을 교체하세요.
index.html
manifest.json
sw.js
icon-192.png
icon-512.png

worker-protected.js는 Cloudflare Worker를 다시 수정할 때만 사용하면 됩니다.

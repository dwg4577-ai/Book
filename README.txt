나의 책더미 v1.2

추가 기능
- 알라딘 OpenAPI 기반 국내도서 검색
- 설정 메뉴에서 TTBKey 저장/삭제
- 백업 JSON 내보내기
- 백업 JSON 불러오기
- API 키 발급 방법을 앱 안에 표시
- API 키는 브라우저 localStorage에 저장하며 백업 파일에는 포함하지 않음

GitHub 저장소 최상위에 아래 파일을 업로드/교체하세요.
- index.html
- manifest.json
- sw.js
- icon-192.png
- icon-512.png

알라딘 API 키 설정
1. 알라딘 로그인
2. https://www.aladin.co.kr/ttb/wblog_manage.aspx 에서 OpenAPI 사용 URL 등록
3. GitHub Pages 웹앱 주소 등록
4. 발급된 TTBKey 복사
5. 웹앱 > ⚙︎ 설정 > 알라딘 API 키 > 붙여넣기 > 저장

주의
- GitHub Pages처럼 브라우저에서 직접 API를 호출하므로, 알라딘 측 브라우저 접근 정책에 따라 검색이 제한될 수 있습니다.
- API 키는 파일에 하드코딩하지 않고 현재 브라우저에만 저장됩니다.
- 백업 파일에는 도서 기록만 포함되고 API 키는 포함되지 않습니다.

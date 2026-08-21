책책책 📖 v2.0

수정 사항
1. 홈 전체 스크롤 차단을 더 강하게 적용
   - body를 고정
   - 홈 전체는 움직이지 않고 책더미 영역만 세로 스크롤

2. 검색 결과 스크롤 수정
   - 검색 결과 목록 자체가 최대 높이를 가지고 세로 스크롤됨

3. 월별 책더미
   - 기본은 숨김
   - '월별 책더미' 버튼을 누르면 펼쳐짐
   - 월 표시는 8월, 9월처럼 표시
   - 여러 해가 섞일 때만 연도도 함께 표시
   - 펼쳤을 때 가장 최근 달로 자동 이동

4. 쪽수 조회 재수정
   - ItemLookUp 요청의 파라미터를 알라딘 표기와 맞춤
   - 불필요한 OptResult 제거
   - bookinfo.itemPage / subInfo.itemPage / itemPage 모두 확인
   - 자동 조회가 없는 책은 직접 입력 가능

GitHub에 교체:
index.html
manifest.json
sw.js
icon-192.png
icon-512.png

Cloudflare Worker도 반드시 교체:
worker-protected-v2.0.js 전체 내용을 기존 Worker 코드와 교체 → Deploy
ALADIN_TTB_KEY Secret은 그대로 유지

화면에 v2.0이 보이면 적용 완료입니다.

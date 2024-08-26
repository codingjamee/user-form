### ADMIN

- [x] 구글폼 만들기 기능
  - [x] mission-2에서 구현
- [x] 구글폼 발행하기
  - [x] 제출 클릭시 id 응답으로 보내고 해당 url로 navigate
  - [x] 제출하면 해당 데이터를 백엔드에서 받기
- [x] 응답 요약화면 (form_id로 요청)
  - [x] 응답 갯수
  - [x] 성별 PieChart
- [x] 생성한 구글폼 목록 가져오기
  - [x] 클릭시 해당 구글폼으로 이동(응답)

### USER FORM

- [x] 발행된 폼으로 응답 입력 할 수 있게 하기
- [x] 유저가 click시 form option array를 설정할 수 있도록
  - [x] 해제 시 해당 id를 array에서 비울 수 있도록
- [x] 제출 시 required 필드를 확인하여 비어있다면 제출이 되지 않고 alert문구 뜨게
- [x] 제출 시 api에서 유저 응답 데이터 받기
- [x] admin에 응답한 데이터 받기

### 구글폼 admin 생성 및 응답 확인

- 질문 생성하기 /forms/${formId}/edit

  - [x] 프론트에서 ulid설정
  - 제출 시
    - [x] 제출 후 id로 navigate

- 응답 확인하기 /forms/${formId}/responses
  - [ ] 제출 전 : 응답 버튼 보여주지 않게 ?
    - [ ] (응답에 해당 id로 데이터가 오면 버튼 보이게)
  - [ ] 제출 후 : 응답 버튼 보여주게
  - [x] 응답의 갯수 확인
  - [x] pieChart를 활용하여 통계 확인

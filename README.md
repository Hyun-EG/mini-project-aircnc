# 수강생들을 위한 숙박업소 에어씨엔씨

<br>

<br>
<br>

## Userflow

![userflow-real](https://github.com/Iam-Sanghwa/KDT_FE8_Mini-Project/assets/106307387/7fbe3649-8073-4321-89af-d895f825f9ac)

<br>
<br>

## ✨FE 팀원 소개✨

| 김상화(대장)                                                                                                                                                         | 박성현(사원)                                                                                                                                                        | 변희준(팀장)                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![adacca](https://github.com/Iam-Sanghwa/KDT_FE8_Mini-Project/assets/106307387/c9a6f615-a0ea-490d-a61d-362fe2619e7a)                                                 | ![adacca](https://github.com/Iam-Sanghwa/KDT_FE8_Mini-Project/assets/106307387/c9a6f615-a0ea-490d-a61d-362fe2619e7a)                                                | ![adacca](https://github.com/Iam-Sanghwa/KDT_FE8_Mini-Project/assets/106307387/c9a6f615-a0ea-490d-a61d-362fe2619e7a)                                                               |
| [`https://github.com/Iam-Sanghwa`](https://github.com/Iam-Sanghwa)                                                                                                   | [`https://github.com/Hyun-EG`](https://github.com/Hyun-EG)                                                                                                          | [`https://github.com/hejuby`](https://github.com/hejuby)                                                                                                                           |


<br>
<br>
<br>

## 🔨 사용한 기술 스택

|            | 개발 환경                                                                                                                                                                                                                                                                                                                                           |
| :--------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 개발 환경  | <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">                                        |
|  유틸리티  | <img src="https://img.shields.io/badge/ESlint-4B32C3?style=for-the-badge&logo=ESlint&logoColor=white"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">                                                                                                                                   |
|   디자인   | <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">                                                                                                                                                                                                                                                |
| 상태 관리  | <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/React--Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white">                                                                                                                              |
| 라이브러리 | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src ="https://img.shields.io/badge/Styled--Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> |
|    배포    | <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">                                                                                                                                                                                                                                            |
|   협업툴   | <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">                                                                                                                                             |

## ✨프로젝트 소개

제작기간 : `2024.06.17 ~ 2024.07.07`
제작인원 : `3명 [김상화 박성현 변희준]`

<br>

### 헤더

- 헤더 내 로고 클릭시 메인페이지 이동
- 도시/체크인 및 체크아웃 선택/인원수 검색 설정
- 캘린더 선택 시 유효성 검사
- 검색 내용 redux로 관리
- 로그인/로그아웃 버튼

<hr/>

### 로그인/회원가입

- 회원가입 시 e-mail, 비밀번호 규칙 유효성 검사
- 회원가입 시 e-mail, 닉네임 중복 검사
- 로그인시 엑세스 토큰 관리

![로그인](https://github.com/Iam-Sanghwa/KDT_FE8_Mini-Project/assets/106307387/532dfb7a-614e-494b-8095-af563e699008)

![회원가입](https://github.com/Iam-Sanghwa/KDT_FE8_Mini-Project/assets/106307387/0a2409b7-b9dd-46f5-a06c-9e9db21a0b1d)

<hr/>

### 메인 페이지

- Geolocation API를 활용한 현재 위치 업데이트
- 현 위치 주변 숙소 검색 후 숙소 표시

![main](https://github.com/Iam-Sanghwa/KDT_FE8_Mini-Project/assets/106307387/b298c59a-6984-41ce-8097-a62383de8e17)

<hr/>

### 서치 페이지

- 헤더 검색 기능
  - 리덕스로 관리하는 검색 쿼리를 활용하여 검색 진행
  - 카드로 표시된 숙소의 위치(좌표)를 활용하여 네이버 맵 API에 마커 표시
  - intersection observer를 활용한 무한스크롤 구현
  - 카드로 표시된 숙소를 맵에서 모두 보여주기 위한 bounce설정
  - 카드 호버시 마커 확대 기능
- 맵 검색 기능
  - 맵을 사용자가 임의로 이동/확대하였을 때 '지도 검색'모드 활성화
  - 네이버 맵 상, 하, 좌, 우 좌표를 활용하여 검색 api 요청
  - intersection observer를 활용한 무한스크롤 구현

![search](https://github.com/Iam-Sanghwa/KDT_FE8_Mini-Project/assets/106307387/4a916d0b-c20a-47bd-b6d7-22f270d6b6a9)

<hr/>

### 인포 페이지

- 체크인, 체크아웃 날짜 선택
- 숙박 인원 선택
- 예약 결제 금액 표시
- 예약하기, 장바구니 담기 기능

![info](https://github.com/Iam-Sanghwa/KDT_FE8_Mini-Project/assets/106307387/825f4f7f-114f-4fcc-9f20-908404d0858e)

<hr/>

### 예약목록 페이지

- 예약된 숙소의 체크인/체크아웃 일정 등 정보 표시

![reser](https://github.com/Iam-Sanghwa/KDT_FE8_Mini-Project/assets/106307387/106f0625-0817-4162-a639-14838b0edd36)

<hr/>
  
### 위시리스트 페이지

- 위시리스트에 추가한 숙소의 사진 정보 표시

![wish](https://github.com/Iam-Sanghwa/KDT_FE8_Mini-Project/assets/106307387/2235052e-8169-489e-a520-a04e85e42e8a)

<br>
<br>


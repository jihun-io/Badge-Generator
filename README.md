# GitHub README 배지 생성기
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Nextdotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=for-the-badge&logo=CloudflarePages&logoColor=white)

<img width="540" alt="badge.jihun.io 로고" src="https://github.com/user-attachments/assets/6ebcab44-ce20-4fdb-95b9-38f42dc467e0">


<img width="960" alt="README 배지 생성기 페이지의 스크린샷" src="https://github.com/user-attachments/assets/6fe4e3c5-f811-4068-8285-6d3e5897020a">


## 링크
[https://badge.jihun.io](https://badge.jihun.io)

## 프로젝트 소개

GitHub README 문서를 꾸밀 때 배지를 다는 과정이 귀찮아서 만든 배지 생성기입니다.

## 기능 설명

- 기술 검색 창에 검색어를 입력하면 [Simple Icons](https://simpleicons.org/)의 아이콘 목록 데이터를 기반으로 검색 결과를 제공합니다.
- 원하는 기술을 선택하면 해당하는 아이콘과 컬러를 바탕으로 [Shields.io](https://shields.io)의 API를 활용하여 배지 이미지로 만들어 줍니다.
- 생성된 배지 이미지를 마우스 오른쪽 클릭으로 이미지로 저장하거나, 하단의 텍스트 박스에서 마크다운 문법을 복사하여 마크다운 문서에 붙여 넣을 수 있습니다.

## 작동 과정
```mermaid
sequenceDiagram
    participant User as 사용자
    participant Web as 웹 앱
    participant API as API 서버
    participant Shields as Shields.io

    User->>Web: 검색어 입력
    Web->>API: 검색어로 시작하는 아이콘 리스트 요청
    API-->>Web: 아이콘 리스트 반환

    User->>Web: 아이콘 선택
    Web->>API: 선택된 아이콘 정보 요청
    API-->>Web: 아이콘 이름과 색상 값 반환

    Web->>Shields: 배지 이미지 기본 값 요청
    Shields-->>Web: 기본 배지 이미지 반환

    alt 기본 이미지의 텍스트가 흰색인 경우
        Web->>Shields: 흰색 아이콘 배지 요청
    else 기본 이미지의 텍스트가 흰색이 아닌 경우
        Web->>Shields: 검은색 아이콘 배지 요청
    end

    Shields-->>Web: 최종 배지 이미지 반환
    Web-->>User: 배지 이미지와 마크다운 문법 출력
```

## 알려진 문제

- Java의 아이콘이 Simple Icons에서 삭제되었기 때문에 Java 배지를 생성할 수 없습니다.

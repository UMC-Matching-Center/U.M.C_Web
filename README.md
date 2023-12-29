# U.M.C_Web

UMC Matching Center Web (React)

## 📄 Introduce

UMC(University MakeUs Challenge) 동아리 매칭 서비스 구축 프로젝트 프론트엔드입니다.

## ⚙️ Develop Environment

- **Framework** : React
- **Node** : 18.xx.x

## ✉️ Git Message Convension

### 1. **Commit 메시지 구조**

> 기본 적인 커밋 메시지 구조는 제목,본문,꼬리말 세가지 파트로 나누고, 각 파트는 빈줄을 두어 구분한다.

```Groovy
type : subject

body

footer
```

### **2. Commit Type**

> 타입은 태그와 제목으로 구성되고, 태그는 영어로 쓰되 첫 문자는 대문자로 한다.

태그 : 제목의 형태이며, :뒤에만 space가 있음에 유의한다.

- `Dev` : 새로운 기능 추가
- `Fix` : 버그 수정
- `Docs` : 문서 추가/수정
- `Design` : CSS 등 사용자 UI 디자인 변경
- `Style` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- `Refactor` : 코드 리펙토링
- `Chore` : 빌드 업무 수정, 패키지 매니저 수정
- `Rename` : 파일 혹은 폴더명을 수정하거나 옮기는 작업만
- `Remove` : 파일을 삭제하는 작업만 수행
- `!HOT FIX` : 치명적 버그 수정
- `!BREAKING CHANGE`: 커다란 API 변경

### 3. Subject

> 제목은 최대 50글자가 넘지 않도록 하고 **마침표 및 특수기호는 사용하지 않는다**.\
> 영문으로 표기하는 경우 **동사(원형)를 가장 앞**에 두고 **첫 글자는 대문자로 표기**한다. (과거 시제를 사용하지 않는다.)\
> 제목은 **개조식 구문**으로 작성한다. --> 완전한 서술형 문장이 아니라, 간결하고 요점적인 서술을 의미.

```Groovy
- Fixed --> Fix
- Added --> Add
- Modified --> Modify
```

### 4. Body

> 본문은 다음의 규칙을 지킨다.

- 본문은 한 줄 당 72자 내로 작성
- 본문 내용은 양에 구애받지 않고 최대한 상세히 작성
- 본문 내용은 어떻게 변경했는지 보다 무엇을 변경했는지 또는 왜 변경했는지를 설명

## 5. footer

> 꼬릿말은 다음의 규칙을 지킨다.

- 꼬리말은 optional이고 이슈 트래커 ID를 작성
- 꼬리말은 "유형: #이슈 번호" 형식으로 사용
- 여러 개의 이슈 번호를 적을 때는 쉼표(,)로 구분
- 이슈 트래커 유형은 다음 중 하나를 사용
  - `Fixes`: 이슈 수정중 (아직 해결되지 않은 경우)
  - `Resolves`: 이슈를 해결했을 때 사용
  - `Ref`: 참고할 이슈가 있을 때 사용
  - `Related to`: 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)
    ex) Fixes: #45 Related to: #34, #23

### 6. 커밋예시

```Groovy
✨ Dev: "회원 가입 기능 구현"

SMS, 이메일 중복확인 개발

Resolves: #123
Ref: #456
Related to: #48, #45

```

### 7. Commit Message Emogji

| 아이콘 | 코드                          | 커밋 타입                       | 설명                                                              |
| ------ | ----------------------------- | ------------------------------- | ----------------------------------------------------------------- |
| ✨     | `:sparkles:`                  | `Dev`                           | 새로운 기능 추가                                                  |
| 🐞     | `:beetle:`                    | `Fix`                           | 버그 수정                                                         |
| 📝     | `:memo:`                      | `Docs`                          | 문서 추가/수정                                                    |
| 🎨     | `:art:`                       | `Design`                        | CSS 등 사용자 UI 디자인 변경                                      |
| ♻️     | `:recycle:`                   | `Style` / `Refactor`            | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 / 코드 리팩토링 |
| ➕     | `:heavy_plus_sign:`           | `Chore`                         | 의존성 추가                                                       |
| ➖     | ` :heavy_minus_sign:`         | `Chore`                         | 의존성 제거                                                       |
| 📦     | `:package:`                   | `Rename`                        | 파일 혹은 폴더명을 수정하거나 옮기는 작업                         |
| 🔥     | `:fire:`                      | `Remove`                        | 코드/파일 삭제                                                    |
| 🚑     | `:ambulance:`                 | `!HOT FIX` / `!BREAKING CHANGE` | 치명적 버그 수정 , 커다란 API 변경의 경우                         |
| 🔀     | `:twisted_rightwards_arrows:` | `Merge`                         | 브랜치 합병                                                       |
| 🙈     | `:see_no_evil:`               | `Ignore`                        | .gitignore 추가/수정                                              |

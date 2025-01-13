# 프로젝트명: Pixtory

### 픽셀(레트로)이미지 변환 앱 👀

### 배포주소

픽토리 바로가기: <https://elena7993.github.io/pixtory/>

### 1. 앱 이미지

<img src="./public/pixtory_imgs/pictory_home.png" alt="홈화면" width="300" height="500" />

<img src="./public/pixtory_imgs/pictory_main.png" alt="홈화면" width="300" height="500" />

### 2.목적

- 사용자가 원하는 이미지를 레트로아트로 만들 수 있다.
- 나만의 독특한 아이콘, 로고 등을 만들 수 있다.

### 3.기능

- 이미지 업로드와 다운로드
- 이미지 변환
- 변환된 이미지링크를 공유(안드로이트 모바일 제외)

### 4. 스택

- HTML/CSS, JS, React, Canvas, Node.js

### 5. 개발 스케쥴

| 날짜         | 작업 내용                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| **화 17.12** | 프로젝트명 몇 기획안 작성 <br> 레퍼런스 조사 및 피그마로 디자인 작업 <br> 코드 초기세팅 및 깃허브 연동 |
| **수 18.12** | 디자인 완료 <br> 개발 시작 <br> 홈 화면 및 메인페이지 로직 구현 (이미지 업로드, 다운로드)              |
| **목 19.12** | 메인페이지 로직 구현 (이미지 쉐어, 이미지 변환)                                                        |
| **금 20.12** | 전체 코드 점검 및 수정 <br> 디버깅 후 배포                                                             |

### 6. 개발 시 느꼈던 점 📖

우선 Canvas를 사용해 픽셀아트를 구현해 보고자한 위풍당당했던 첫출발이 우여곡절 끝에 레트로 아트로 마무리 되었다. 디테일한 사용이 무척이나 까다로움을 느꼈고 선생님과 챗지피티와 사투(?)를 벌인 끝에 빈지티스러운 창작물을 만들어낼 수 있었다. 픽셀화 정도와 색상 단순화를 조절해봤지만 내가 원하는 픽셀아트수준으론 나타낼 수 없어 아쉬웠다. 이 부분은 좀 더 공부할 필요성을 느꼈다!

또한 안드로이드 모바일에서 링크가 카피되지 않는 문제점이 발견되어 해매던 중 navigator.clipboard가 안드로이드의 일부 브라우저에서는 지원되지 않을 수 있고 안드로이드에서는 브라우저마다 클립보드 API 구현 방식이 다를 수 있어서 정상적으로 작동하지 않을 수 있다는 사실을 알게되었다...
자 일은 벌어졌고.. 어떻게 해결해야할까.. 배포일정은 다가오고 나의 심장은 타들어가고 머리카락은 빠지고 있다...
내가 할 수 있는 있는 방법은 링크공유가 아닌 공유방법을 사용하는 것과 링크공유는 하되 안드로이드는 제외시키는 것. 나는 후자를 선택하였고 그 이유는 일단 하기로한 링크공유를 계속 진행시키고 싶기 때문이었다. 또한 새로 알게된 deviceType이 신기해서 써보고 싶었다! deviceType으로 안드로이드일경우 렌더링되지 않도록 설정했다..! 미안하다..하지만 나도 갤럭시다..!!

결론적으로 안드로이드 모바일에서는 카피버튼이 사라지게 되었으니 ui는 나아졌다고 할 수 있을까? 하지만 ux적으로는 모르겠다. 어쩌면 링크공유방법을 고집했기때문에 ux는 최적화에는 실패했을 수도 있겠다. 내가 하고싶은 개발도 중요하지만 사용자가 필요한 개발을 더 신경써야겠다는 다짐을 오늘도 하지만... 쉽지않다. 오늘도 한번 했으니 언젠가 도달하겠지!!💪🏼

매번 작업하면서 느끼는거지만 개발의 과정은 운전하는 것과 비슷한 것 같다. 한적한 바닷길을 달릴 때도 있지만 꽉 막힌 도심속에서 지난한 시간을 보내기도 해야하니까. 그럼에도 달려야겠지. 재밌으니까 😋

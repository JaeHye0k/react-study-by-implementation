## 왜 React를 직접 구현해보려고 하는가?

- 내부 동작원리를 이해해 성능 최적화나 복잡한 버그 발생 시 논리적인 근거를 마련하기 위함

## 학습 목표

- 단순히 구현방법(결과물)이 아닌 “왜” 이렇게 만들었는지(접근법)를 이해하고 구현
- '리액트의 동작 원리'를 그림을 그려가며 10분간 막힘없이 설명
- 직접 만든 리액트로 투두 리스트 구현

## 학습 계획

### 1주차: JSX & Virtual DOM 구현 (`createElement`, `render` 함수)

- 학습목표: “선언적 프로그래밍이란 무엇인가?” “리액트의 선언적 프로그래밍이 어떻게 인지 부하를 낮추는가?” 이해
- 액션아이템: 바닐라 JS로 만든 TODO리스트를 `createElement` 와 `render`함수로 마이그레이션하기
- 참고자료:
    - [createElement(), \_jsx()](https://github.com/facebook/react/blob/65eec428c40d542d4d5a9c1af5c3f406aecf3440/packages/react/src/jsx/ReactJSXElement.js)

- “나라면 어떻게 구현했을까?”에 초점을 맞춰 구현
- 웹 브라우저에서만 사용되는 리액트라고 가정
- JSX를 JS로 변환하려면 트랜스파일러가 필요하기 때문에 일단 JSX는 고려하지 않기
- [x] React와 html이 연결되는 entry point 구현

    ```jsx
    // index.js
    import App from "./App.js"
    import ReactDOM from

    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(App);
    ```

- [x] `createElement` 함수로 App 컴포넌트 구현
    - https://ko.react.dev/reference/react/createElement#creating-an-element-without-jsx
    - 일단 div 엘리먼트만 고려해서 PoC
    - PoC성공 했으면 어떻게 범용적으로 만들것인지 고민
- [x] `ReactElement` 를 실제로 DOM에 렌더링하는 `render` 함수 구현
    - querySelector 는 `ReactElement`가 아니라 `HTMLElement`를 반환하기 때문에 `render` 함수가 없음. 따라서 root 엘리먼트를 리액트 엘리먼트로 변환시켜줄 함수가 필요함. → 그래서 `querySlector()` 대신 `ReactDOM.createRoot()` 를 사용하는 거구나.
- [ ] createElemen의 children에 ReactElement가 중첩되어있는 경우 처리
    - 재귀

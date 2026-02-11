## createElment

- 역할: `ReactElement`를 생성하고 반환
- 사용 예시:

    ```js
    // createElement(type, config, children)
    createElement("div", {
        className: "parent",
        children: createElement("div", {
            className: "child",
        }),
    });
    ```

- 구현체: [createElement](https://github.com/facebook/react/blob/65eec428c40d542d4d5a9c1af5c3f406aecf3440/packages/react/src/jsx/ReactJSXElement.js#L610-L746)
- 분석

    ```js
    if (__DEV__) {
        // We don't warn for invalid element type here because with owner stacks,
        // we error in the renderer. The renderer is the only one that knows what
        // types are valid for this particular renderer so we let it error there.

        // Skip key warning if the type isn't valid since our key validation logic
        // doesn't expect a non-string/function type and can throw confusing
        // errors. We don't want exception behavior to differ between dev and
        // prod. (Rendering will throw with a helpful message and as soon as the
        // type is fixed, the key warnings will appear.)
        for (let i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i]);
        }

        // Unlike the jsx() runtime, createElement() doesn't warn about key spread.
    }
    ```

    - 주석 의미:
        - 유효하지 않은 엘리먼트 타입에 대해 여기서 경고하지 않고, 대신 렌더러(React DOM, React Native)에서 에러를 발생시킴. 어떤 타입(`<div>`, `View`)이 유효한지는 해당 렌더러만 알기 때문.
        - 타입이 유효하지 않으면 키 경고가 괜한 혼란을 줄 수 있기 때문에 키 경고를 스킵함. `key` 검사는 string이 아니거나 함수가 아닌 타입들은 에러를 발생시키는데 타입이 `undefined`와 같은 유효하지 않은 타입일 경우 `key` 검사시 에러가 발생하여 키가 잘못된 건지 타입이 잘못된건지 혼란을 줄 수 있기 때문이다. 또한 키 검사는 개발 환경에서만 진행되기 때문에 개발환경에서는 에러가 발생하고 프로덕션 환경에서 잘 되는 이러한 불일치를 없애기 위함이다.
    - 키 검사를 DEV 모드에서만 하는 이유는 '성능 개선'

- 질문
    - 리액트 엘리먼트에 key를 설정하는 이유는? key에 인덱스 사용을 지양하는 이유는?
    - 리액트 앨리먼트의 [$$typeof속성의 역할](https://overreacted.io/why-do-react-elements-have-typeof-property/)은?
    - 리액트는 왜 TypeScript 대신 Flow를 사용할까?
    - 리액트에서는 왜 html attribute 이름을 그대로 안쓸까?
      예: class -> className
        - JSX는 JS로 트랜스파일링 되기 떄문에 `class`와 같은 속성명을 그대로 사용하면 JS 예약어 때문에 에러가 발생할 수 있음
    - 왜 Virtual DOM을 사용할까?
    - 상태 변화시 왜 즉각적으로 업데이트 하지 않고 배치 업데이트를 할까?
    - 왜 리액트 훅은 조건문 안에서 호출되면 안될까?
    - 왜 리액트 훅은 컴포넌트나 커스텀훅 안에서만 호출돼야할까?
    - 리액트는 왜 `useState`의 순서에 신경쓸까?

### ReactElement

## TODO

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
- [x] createElement의 children에 ReactElement가 중첩되어있는 경우 처리
    - 재귀 -> 어떻게 children을 재귀적으로 렌더링할까?
      -> 현재 요소에 children 요소를 appendChild 한다.
      -> 결국에 children 요소와 현재 요소 모두 실제 DOM 요소로 변환되어야 한다.
      -> ReactElement가 자기 자신에 대응하는 실제 DOM 요소를 반환할 수 있어야 한다.
- [x] 기존 HTML Todo List를 React.createElement로 마이그레이션
    - 배운점: `<input type="text" />`의 `change` 이벤트는 매 타이핑마다 발생하지 않고, `focus`를 잃었을 때 발생한다. 따라서 실제로 `<input>` 요소의 타이핑 시점에 이벤트를 처리하려면 `change` 이벤트 대신 `input` 이벤트를 수신해야한다.
- [x] UI 로직을 명령형에서 선언형으로 변경 (어떻게 그릴 것인가 -> 무엇을 그릴 것인가)
    - 기존: `createTodoItem` 함수에서 '어떤' 요소를 '어떻게' 그릴지 일일이 명시해야 함.
    - 변경: `React.createElement`를 이용해 **UI가 데이터(`todoItems`)를 투영**하도록 구현
- [ ] 상태 변화에 따른 리렌더링 구현
    - [x] 리렌더링이란 무엇인가?
        -   1. 컴포넌트가 다시 실행되고,
        -   2. 변경된 상태를 기반으로 `ReactElement`를 다시 반환되어
        -   3. 반환된 `ReactElement`를 실제 DOM에 그린다.
    - [x] 상태 변화를 어떻게 감지할까?
        - 특정 인터페이스(`setState`)를 통해 상태를 변화시키도록 한다. 그리고 `setState` 내부에서 리렌더링 트리거를 호출한다.
    - [x] 컴포넌트를 다시 실행했을 때 기존 상태를 어떻게 유지할 수 있을까?
        - 컴포넌트의 상태를 유지한다는 말은 `useState`가 다시 실행되어도 상태가 초기화되지 않는다는 뜻이다.
        - `useState`를 통해 반환한 상태값이 어딘가 저장되어 있다가, 컴포넌트가 리렌더링되어 `useState`를 재호출했을 때 저장되어있던 상태값을 반환해야 한다.
        - 컴포넌트가 리렌더링되어도 상태가 유지되려면 상태는 컴포넌트 외부 어딘가에 저장되어있어야 한다.
        - `useState`는 하나의 컴포넌트에서 여러번 호출될 수도 있고, 여러 컴포넌트에서 호출될 수 있다. 그럼 어떤 `useState`가 어떤 상태를 반환해야하는지 어떻게 구분할 수 있을까?
        - `useState`의 호출 순서를 통해 식별한다.
        - 초기 렌더링 시 `useState`가 반환하는 상태는 `useState` 외부 큐에 enqueu된다.
        - 컴포넌트가 리렌더링되고 다시 `useState`가 실행되면 큐의 요소를 dequeue하며 상태를 반환한다.
        - `useState`가 반환하는 상태는 호출 순서에 따라 상태를 유지하고 관리하기 때문에 `useState`의 호출 순서가 런타임에 동적으로 변경되면 다른 `useState`의 값을 반환할 수도 있다. 이러한 이유로 리액트 훅에는 조건문, 반복문 내부에서 훅을 사용할 수 없다는 규칙이 있다.
          예:

        ```jsx
        function App() {
            const [on, setOn] = useState(true);

            let [varB, varC] = [null, null];

            if (on) {
                const [b, setB] = useState("b");
                const [c, setC] = useState("c");
                varB = b;
                varC = c;
            } else {
                const [c, setC] = useState("c");
                const [b, setB] = useState("b");
                varB = b;
                varC = c;
            }
            return (
                <section>
                    <button onClick={() => setOn(!on)}>토글</button>
                    <p>switch: {on.toString()}</p>
                    {/* b는 계속 "b" 이어야 하지만 "b" <-> "c" 로 바뀜 */}
                    <p>b: {varB.toString()}</p>
                    {/* c는 계속 "c" 이어야 하지만 "c" <-> "b" 로 바뀜 */}
                    <p>c: {varC.toString()}</p>
                </section>
            );
        }
        ```

        - [React useState 동작 원리 이해하기](https://d5br5.dev/blog/deep_dive/react_useState_understanding)

    - [ ] 리렌더링 트리거는 정확히 어떤 일을 할까?
        - 자신을 호출한 컴포넌트를 재실행한다. -> `useState` 내부에서 자신을 호출한 컴포넌트가 무엇인지 알려면 `useState`에 인자로 전달해줘야되는데, 리액트는 `useState`의 인자로 컴포넌트 자기 자신을 전달해주지 않음
        - `root.render()`를 재실행하고 비교 알고리즘을 통해 변경된 부분만 실제로 DOM에 업데이트한다.

- [ ] batch 업데이트 구현
- [ ] Virtual DOM 구현
    - 문제점: `createElement`마다 매번 실제 DOM을 조작함. 실제 DOM을 조작할 때마다 리페인트, 리플로우가 발생하는데, 해당 과정은 비용이 많이 드는 과정임. (성능 저하)
    - 해결책: 가상 DOM을 구현하여 브라우저 화면에 실제로 DOM을 반영하는건 한번만

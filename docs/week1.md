## createElment

- 역할: `ReactElement`를 생성하고 반환
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
        - 타입이 유효하지 않으면 키 경고가 괜한 혼란을 줄 수 있기 때문에 키 경고를 스킵함. `key` 검사는 string이 아니거나 함수가 아닌 타입들은 에러를 발생시키는데  타입이 `undefined`와 같은 유효하지 않은 타입일 경우 `key` 검사시 에러가 발생하여 키가 잘못된 건지 타입이 잘못된건지 혼란을 줄 수 있기 때문이다. 또한 키 검사는 개발 환경에서만 진행되기 때문에 개발환경에서는 에러가 발생하고 프로덕션 환경에서 잘 되는 이러한 불일치를 없애기 위함이다.
    - 키 검사를 DEV 모드에서만 하는 이유는 '성능 개선'
- 질문
    - 리액트 엘리먼트에 key를 설정하는 이유는? key에 인덱스 사용을 지양하는 이유는?
    - 리액트 앨리먼트의 [$$typeof속성의 역할](https://overreacted.io/why-do-react-elements-have-typeof-property/)은? 

### ReactElement

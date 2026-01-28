/**
 *
 * @param {ReactElement} el
 */
function render(reactEl) {
    // ReactElement를 DOM 엘리먼트 생성에 필요한 형식으로 변환
    // 엘리먼트 생성
    // DOM에 연결

    // div.root 를 생성해서 body에 붙인다고 가정해보자.
    const body = document.querySelector("body");
    const realEl = document.createElement(reactEl.type);
    realEl.classList.add(reactEl.config.className);
    body.appendChild(realEl);
}

export default {
    render,
};

function findParent(
    element: Element | null,
    condition: (el: Element) => boolean,
): Element | null {
    if (!element || !element.parentElement) {
        return null;
    }
    if (condition(element.parentElement)) {
        return element.parentElement;
    }
    return findParent(element.parentElement, condition);
}

function findChild(
    element: Element | null,
    condition: (element: Element) => boolean,
): Element | null {
    if (!element) {
        return null;
    }
    const children = element.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (condition(child)) {
            return child;
        }
        const result = findChild(child, condition);
        if (result) {
            return result;
        }
    }
    return null;
}

function getParentsRecursively(element: Element | null): Element[] {
    const parents: Element[] = [];
    while (element && element.parentElement) {
        parents.push(element.parentElement);
        element = element.parentElement;
    }
    return parents;
}

function getChildrenRecursively(element: Element | null): Element[] {
    const children: Element[] = [];
    if (!element) {
        return children;
    }
    for (let i = 0; i < element.children.length; i++) {
        const child = element.children[i];
        children.push(child);
        children.push(...getChildrenRecursively(child));
    }
    return children;
}

function getNParentsRecursively(element: Element | null, n: number): Element[] {
    const parents: Element[] = [];
    while (element && element.parentElement && parents.length < n) {
        parents.push(element.parentElement);
        element = element.parentElement;
    }
    return parents;
}

function getNChildrenRecursively(
    element: Element | null,
    n: number,
): Element[] {
    const children: Element[] = [];
    if (!element) {
        return children;
    }
    for (let i = 0; i < element.children.length && children.length < n; i++) {
        const child = element.children[i];
        children.push(child);
        children.push(...getNChildrenRecursively(child, n - children.length));
    }
    return children;
}

function getSiblings(
    element: Element,
    siblingType: "both" | "next" | "prev" = "both",
): Element[] {
    const parent = element.parentElement;
    if (!parent) {
        return [];
    }
    const allSiblings = Array.from(parent.children) as Element[];
    const elementIndex = allSiblings.indexOf(element);
    let siblings: Element[];
    switch (siblingType) {
        case "prev":
            siblings = allSiblings.slice(0, elementIndex);
            break;
        case "next":
            siblings = allSiblings.slice(elementIndex + 1);
            break;
        case "both":
        default:
            siblings = allSiblings.filter((sibling) => sibling !== element);
            break;
    }
    return siblings;
}

function findSiblings(
    element: Element,
    condition: (element: Element) => boolean,
    siblingType: "both" | "next" | "prev" = "both",
): Element[] {
    const siblings = getSiblings(element, siblingType);
    return siblings.filter(condition);
}

function simplifyHTML(htmlString: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const elements = doc.querySelectorAll("*");
    elements.forEach((element: Element) => {
        const attributes = Array.from(element.attributes);
        attributes.forEach((attr: Attr) => element.removeAttribute(attr.name));
    });
    return doc.body.innerHTML;
}

function simplifyHTMLWithRegex(htmlString: string): string {
    const strippedAttributes = htmlString.replace(/<([\w]+)\s*[^>]*>/g, "<$1>");
    const strippedSelfClosing = strippedAttributes.replace(
        /<([\w]+)\s*\/>/g,
        "<$1>",
    );
    return strippedSelfClosing;
}

function replaceAllElements(htmlString: string, newElement: string): string {
    const replacedOpeningTags = htmlString.replace(
        /<(\w+)(\s*[^>]*)>/g,
        `<${newElement}$2>`,
    );
    const replacedTags = replacedOpeningTags.replace(
        /<\/\w+>/g,
        `</${newElement}>`,
    );
    return replacedTags;
}

function replaceElementName(
    htmlString: string,
    oldElement: string,
    newElement: string,
): string {
    const replacedOpeningTags = htmlString.replace(
        new RegExp(
            `<${oldElement}(\\s*
[^>]*)>`,
            "gi",
        ),
        `<${newElement}$1>`,
    );
    const replacedTags = replacedOpeningTags.replace(
        new RegExp(`</${oldElement}>`, "gi"),
        `</${newElement}>`,
    );
    return replacedTags;
}

function removeChildren(parentElement: Element): void {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}
function addClassToAll(selector: string, className: string): void {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => element.classList.add(className));
}

function addClassesToAll(selector: string, ...classNames: string[]): void {
    const elements = document.querySelectorAll(selector);
    for (let index = 0; index < classNames.length; index++) {
        const cls = classNames[index];
        elements.forEach((element) => element.classList.add(cls));
    }
}

function css(
    selector: string,
    propertyName: string,
    value: string,
): HTMLElement | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    el.style.setProperty(propertyName, value);
    return el;
}

function attr(
    selector: string,
    attribute: string,
    value: string,
): HTMLElement | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    el.setAttribute(attribute, value);
    return el;
}

function removeAttr(selector: string, attribute: string): HTMLElement | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    el.removeAttribute(attribute);
    return el;
}

function hasClass(selector: string, className: string): boolean {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return false;
    }
    return el.classList.contains(className);
}

function addClass(selector: string, className: string): HTMLElement | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    el.classList.add(className);
    return el;
}
function addClasses(
    selector: string,
    ...classNames: string[]
): HTMLElement | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    for (let index = 0; index < classNames.length; index++) {
        const cls = classNames[index];
        el.classList.add(cls);
    }
    return el;
}
function removeClass(selector: string, className: string): HTMLElement | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    el.classList.remove(className);
    return el;
}
function removeClasses(
    selector: string,
    ...classNames: string[]
): HTMLElement | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    for (let index = 0; index < classNames.length; index++) {
        const cls = classNames[index];
        el.classList.remove(cls);
    }
    return el;
}

function toggleClass(selector: string, className: string): HTMLElement | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    el.classList.toggle(className);
    return el;
}

function offsetOf(el: HTMLElement): { left: number; top: number } {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
    };
}

function offset(selector: string): { left: number; top: number } | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
    };
}

function parent(selector: string): HTMLElement | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    return el.parentElement;
}

function parentNode(selector: string): ParentNode | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    return el.parentNode;
}

function dataOf(
    element: HTMLElement,
    key: string,
    value?: unknown,
): string | undefined {
    if (typeof value !== "undefined") {
        element.dataset[key] = String(value);
    } else {
        return element.dataset[key];
    }
}

function data(
    selector: string,
    key: string,
    value?: unknown,
): null | string | undefined {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) {
        return null;
    }
    if (typeof value !== "undefined") {
        element.dataset[key] = String(value);
    } else {
        return element.dataset[key];
    }
}

function positionOf(el: HTMLElement): { left: number; top: number } {
    return { left: el.offsetLeft, top: el.offsetTop };
}

function position(selector: string): { left: number; top: number } | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    return { left: el.offsetLeft, top: el.offsetTop };
}

function scrollTopOf(el: HTMLElement, value?: number): HTMLElement | number {
    if (value !== undefined) {
        el.scrollTop = value;
        return el;
    } else {
        return el.scrollTop;
    }
}

function scrollLeftOf(el: HTMLElement, value?: number): HTMLElement | number {
    if (value !== undefined) {
        el.scrollLeft = value;
        return el;
    } else {
        return el.scrollLeft;
    }
}

function scrollTop(
    selector: string,
    value?: number,
): HTMLElement | null | number {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    if (value !== undefined) {
        el.scrollTop = value;
        return el;
    } else {
        return el.scrollTop;
    }
}

function scrollLeft(
    selector: string,
    value?: number,
): HTMLElement | null | number {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    if (value !== undefined) {
        el.scrollLeft = value;
        return el;
    } else {
        return el.scrollLeft;
    }
}

function heightOf(el: HTMLElement, value?: string): HTMLElement | number {
    if (value !== undefined) {
        el.style.height = value;
        return el;
    } else {
        return el.offsetHeight;
    }
}

function height(selector: string, value?: string): HTMLElement | null | number {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    if (value !== undefined) {
        el.style.height = value;
        return el;
    } else {
        return el.offsetHeight;
    }
}

function removeOf(el: HTMLElement): void {
    el.parentNode?.removeChild(el);
}

function removeBy(selector: string): void {
    const el = document.querySelector(selector) as HTMLElement;
    if (el) el.parentNode?.removeChild(el);
}

function emptyOf(el: HTMLElement): HTMLElement {
    el.innerHTML = "";
    return el;
}

function empty(selector: string): HTMLElement | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    el.innerHTML = "";
    return el;
}

function cloneOf(el: HTMLElement): HTMLElement {
    return el.cloneNode(true) as HTMLElement;
}

function cloneBy(selector: string): HTMLElement | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    return el.cloneNode(true) as HTMLElement;
}

function htmlOf(el: HTMLElement, value?: string): HTMLElement | string {
    if (value !== undefined) {
        el.innerHTML = value;
        return el;
    } else {
        return el.innerHTML;
    }
}

function textOf(el: HTMLElement, value?: string): HTMLElement | null | string {
    if (value !== undefined) {
        el.textContent = value;
        return el;
    } else {
        return el.textContent;
    }
}

function html(selector: string, value?: string): HTMLElement | null | string {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    if (value !== undefined) {
        el.innerHTML = value;
        return el;
    } else {
        return el.innerHTML;
    }
}

function text(selector: string, value?: string): HTMLElement | null | string {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
        return null;
    }
    if (value !== undefined) {
        el.textContent = value;
        return el;
    } else {
        return el.textContent;
    }
}

function append(el: HTMLElement, child: HTMLElement): HTMLElement {
    el.appendChild(child);
    return el;
}

function prepend(el: HTMLElement, child: HTMLElement): HTMLElement {
    el.insertBefore(child, el.firstChild);
    return el;
}

function afterHTMLElement(el: HTMLElement, sibling: HTMLElement): void {
    el.parentNode?.insertBefore(sibling, el.nextSibling);
}

function beforeHTMLElement(el: HTMLElement, sibling: HTMLElement): void {
    el.parentNode?.insertBefore(sibling, el);
}

function replaceWith(el: HTMLElement, newEl: HTMLElement): void {
    el.parentNode?.replaceChild(newEl, el);
}

function appendTo(el: HTMLElement, parent: HTMLElement): HTMLElement {
    parent.appendChild(el);
    return el;
}

function prependTo(el: HTMLElement, parent: HTMLElement): HTMLElement {
    parent.insertBefore(el, parent.firstChild);
    return el;
}

function insertAfter(el: HTMLElement, refEl: HTMLElement): void {
    refEl.parentNode?.insertBefore(el, refEl.nextSibling);
}

function insertBefore(el: HTMLElement, refEl: HTMLElement): void {
    refEl.parentNode?.insertBefore(el, refEl);
}

function replaceAll(el: HTMLElement, selector: string): void {
    document.querySelectorAll(selector).forEach((targetEl) => {
        const cloneEl = el.cloneNode(true) as HTMLElement;
        targetEl.parentNode?.replaceChild(cloneEl, targetEl);
    });
}

function findHTMLElement(
    el: HTMLElement,
    selector: string,
): NodeListOf<Element> {
    return el.querySelectorAll(selector);
}

function filterHTMLElement(
    els: HTMLElement[],
    filterFn: (el: HTMLElement) => boolean,
): HTMLElement[] {
    return els.filter(filterFn);
}

function hasHTMLElement(el: HTMLElement, selector: string): boolean {
    return el.querySelector(selector) !== null;
}

function not(
    els: HTMLElement[],
    filterFn: (el: HTMLElement) => boolean,
): HTMLElement[] {
    return els.filter((e) => !filterFn(e));
}

function is(el: HTMLElement, selector: string): boolean {
    return el.matches(selector);
}

function addHTMLElement(
    el: HTMLElement,
    ...elements: HTMLElement[]
): HTMLElement[] {
    return [el, ...elements];
}

function contents(el: HTMLElement): Node[] {
    return Array.from(el.childNodes);
}

function closest(el: HTMLElement, selector: string): Element | null {
    return el.closest(selector);
}

function parents(el: HTMLElement, selector?: string): Element[] {
    const parents = [];
    for (let parent = el.parentElement; parent; parent = parent.parentElement) {
        if (!selector || parent.matches(selector)) {
            parents.push(parent);
        }
    }
    return parents;
}

function parentOf(el: HTMLElement): Element | null {
    return el.parentElement;
}

function children(el: HTMLElement, selector?: string): Element[] {
    return Array.from(el.children).filter(
        (child) => !selector || child.matches(selector),
    );
}

function siblings(el: HTMLElement, selector?: string): Element[] {
    return Array.from(el.parentElement?.children || []).filter(
        (sibling) => sibling !== el && (!selector || sibling.matches(selector)),
    );
}

function prevHTMLElement(el: HTMLElement): Element | null {
    return el.previousElementSibling;
}

function nextHTMLElement(el: HTMLElement): Element | null {
    return el.nextElementSibling;
}

function index(el: HTMLElement): number {
    return Array.from(el.parentElement?.children || []).indexOf(el);
}

function wrapHTMLElement(el: HTMLElement, wrapper: HTMLElement): void {
    el.parentNode?.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

function wrapAll(els: HTMLElement[], wrapper: HTMLElement): void {
    if (els.length === 0) return;
    els[0].parentNode?.insertBefore(wrapper, els[0]);
    els.forEach((el) => wrapper.appendChild(el));
}

function wrapInner(el: HTMLElement, wrapper: HTMLElement): void {
    Array.from(el.childNodes).forEach((child) => wrapper.appendChild(child));
    el.appendChild(wrapper);
}

function unwrap(el: HTMLElement): void {
    const parent = el.parentNode;
    if (!parent) return;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
}

function val(
    el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    value?: string,
): HTMLElement | string {
    if (value !== undefined) {
        el.value = value;
        return el;
    } else {
        return el.value;
    }
}

function on(
    el: HTMLElement,
    event: string,
    handler: (ev: Event) => void,
): HTMLElement {
    el.addEventListener(event, handler);
    return el;
}

function off(
    el: HTMLElement,
    event: string,
    handler: (ev: Event) => void,
): HTMLElement {
    el.removeEventListener(event, handler);
    return el;
}
function contains(container: Node, contained: Node): boolean {
    return container.contains(contained);
}
function one(
    el: HTMLElement,
    event: string,
    handler: (ev: Event) => void,
): HTMLElement {
    const listener = (ev: Event) => {
        el.removeEventListener(event, listener);
        handler(ev);
    };
    el.addEventListener(event, listener);
    return el;
}

function trigger(el: HTMLElement, event: string): HTMLElement {
    const evt = new CustomEvent(event, {
        bubbles: true,
        cancelable: false,
    });
    el.dispatchEvent(evt);
    return el;
}

function show(el: HTMLElement): HTMLElement {
    el.style.display = "";
    return el;
}

function hide(el: HTMLElement): HTMLElement {
    el.style.display = "none";
    return el;
}

function toggle(el: HTMLElement): HTMLElement {
    el.style.display = el.style.display === "none" ? "" : "none";
    return el;
}

function $(selector: string): Element | null {
    return document.querySelector(selector);
}

function $$(selector: string): NodeListOf<Element> {
    return document.querySelectorAll(selector);
}

export {
    $,
    $$,
    addClass,
    addClassToAll,
    addClasses,
    addClassesToAll,
    addHTMLElement,
    afterHTMLElement,
    append,
    appendTo,
    attr,
    beforeHTMLElement,
    children,
    cloneBy,
    cloneOf,
    closest,
    contains,
    contents,
    css,
    data,
    dataOf,
    empty,
    emptyOf,
    filterHTMLElement,
    findChild,
    findHTMLElement,
    findParent,
    findSiblings,
    getChildrenRecursively,
    getNChildrenRecursively,
    getNParentsRecursively,
    getParentsRecursively,
    getSiblings,
    hasClass,
    hasHTMLElement,
    height,
    heightOf,
    hide,
    html,
    htmlOf,
    index,
    insertAfter,
    insertBefore,
    is,
    nextHTMLElement,
    not,
    off,
    offset,
    offsetOf,
    on,
    one,
    parent,
    parentNode,
    parentOf,
    parents,
    position,
    positionOf,
    prepend,
    prependTo,
    prevHTMLElement,
    removeAttr,
    removeBy,
    removeChildren,
    removeClass,
    removeClasses,
    removeOf,
    replaceAll,
    replaceAllElements,
    replaceElementName,
    replaceWith,
    scrollLeft,
    scrollLeftOf,
    scrollTop,
    scrollTopOf,
    show,
    siblings,
    simplifyHTML,
    simplifyHTMLWithRegex,
    text,
    textOf,
    toggle,
    toggleClass,
    trigger,
    unwrap,
    val,
    wrapAll,
    wrapHTMLElement,
    wrapInner,
};

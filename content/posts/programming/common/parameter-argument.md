---
title: "Parameter and Argument"
tags: [Programming]
category: "Programming"
date: "2021-12-11T21:31:22.120Z"
---

## 매번 혼동되는 두 용어

보통 parameter나 argument나 혼용해서 쓰기도 하고 대부분 문맥에서 무슨 뜻으로 쓰이는지 알고 있기 때문에 나도 그렇게 사용했는데 그러다 보니 두 용어의 의미를 정확히 구분하지 못할때가 있었다.

**Parameter(매개변수)**는 함수 선언의 일부분, 즉 함수 정의부에 나열되는 변수들을 의미한다. **Argument(인자 또는 인수)** 는 선언한 함수를 호출할 때 전달되는 실제 데이터 혹은 값이다. 따라서 일반적으로 paremeter는 variable로 보고 argument는 value로 본다.

```js
function fn(param1, param2) {
    console.log(arguments);
}

fn(1, 2); // Arguments(2) [1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

`fn(param1, param2)` 함수 선언식에서 `param1`과 `param2`가 parameters이며 실제 함수를 호출할 때 전달된 `1`, `2`가 arguments이다.

## Reference
- "매개변수 (컴퓨터 프로그래밍)", *Wikipedia*, https://ko.wikipedia.org/wiki/%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98_(%EC%BB%B4%ED%93%A8%ED%84%B0_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D).
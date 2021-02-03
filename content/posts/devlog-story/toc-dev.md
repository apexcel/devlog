---
title: 포스트 TOC 기능 삽질기
tags: [TOC,Table of Contents,Javascript,Typescript,React,Gatsby,Devlog]
date: 2021-01-31T12:17:33.313Z
---

## 도입

미디엄, 티스토리, Velog 혹은 다른 개인 블로그이든 요즘에는 `목차(TOC, Table of Contents)`를 보여주는 기능을 웬만해서는 다 갖고 있는 것 같다.
원하는 위치에 목차를 생성하고 나타내는 것은 크게 어렵지 않았으나 나를 발목 잡은 것은 하이라이팅 기능이었다. 해당하는 목차의 부분을 읽고 있을 때
사용자가 위치를 파악할 수 있도록 목차를 강조해주는 기능을 만들고 싶었다. 그 과정에서 겪은 삽질기를 작성한다.

## 목차 가져오기

현재 이 블로그는 `개츠비(Gatsby)`를 통해 개발했고 `allMarkdownRemark`를 사용하고 있다. [mdx](https://mdxjs.com/)는 `markdown` 파일에 `jsx` 문법을 사용할 수 있게 해준다. 개츠비는 `mdx` 플러그인도 제공하는데 둘의 큰 차이점은 `markdownRemark`의 경우는 `tableOfContents`를 긁어오면 HTML 문자열 형태로 반환하는 반면 `mdx`는 객체 형태로 반환한다. 편의성이나 확장성 측면에서는 `mdx`가 더 좋은 것 같다. 도중에 `mdx`로 바꿔서 진행도 해봤는데 기존의 `KaTeX` 플러그인과 충돌이 생겨 제대로 작동하지 않는 이슈가 있었고 그래서 기존대로 진행하였다.

```graphql
query MyQuery {
  markdownRemark {
    tableOfContents(absolute: false)
  }
}
```

### 문자열 파싱

가져온 문자열에서 원하는 부분만 추출하기 위해 `DOMParser`로 파싱을 한 뒤 쿼리셀럭터로 원하는 태그들을 가져온 뒤 리액트 컴포넌트로 만들었다가 코드가 너무 번잡해져서
정규식으로 불필요한 태그 들은 날린뒤 원하는 태그들만 추출해서 가져온다음 돔에 직접 삽입하는 방법을 사용했다.

```ts
const replaceTableOfContents = (ref: React.RefObject<HTMLElement>, toc: string) => {
    const replaced = toc.replace(/(<p>)|(<\/p>)/g, '').replace(/(<a)\b/g, `<a class='toc-headings'`);
    return <nav ref={ref} className='toc-list' dangerouslySetInnerHTML={{ __html: replaced }} />
}
```

### 플러그인 설치

포스트내의 헤더 

```
npm install gatsby-remark-autolink-headers
```

첫 번째 시도는 `addEventListener` 메서드를 통해 스크롤 이벤트를 추가하여 사용하는 것이었다.
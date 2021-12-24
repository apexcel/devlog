---
title: "최장 증가 부분 수열(Logest Increasing Subsequence, LIS)"
tags: ["Algorithm", "LIS", "Dynamic Programming", "Binary Search"]
category: "Algorithm"
date: "2021-12-24T04:51:15.402Z"
---

## 개요

부분 수열이란 주어진 수열의 일부 항을 원래 순서대로 나열하여 얻을 수 있는 수열이다. 부분 수열에 포함된 숫자들이 순증가(stricyly increase)하면 이를 증가 부분 수열이라 부른다. 두 인접한 숫자 중 앞의 것이 더 작으면 순증가 한다고 말하며, 두 인접한 숫자가 같을 수도 있으면 단조 증가(monotonically increasing) 한다고 한다.

예를 들어 어떤 수열 $S = (1, 5, 2, 3, 7)$가 있을 때 $(5, 2, 3)$은 $S$의 부분 수열이지만 증가 부분 수열은 아니다. $(1, 2, 3, 7)$은 부분 수열이면서 순증가하므로 가장 긴 증가 부분 수열이 된다.

## 완전 탐색

선택한 배열 원소보다 큰 원소들만 골라내어 새로운 배열에 담고 재귀 호출을 하는 구조이다. 선택한 원소보다 큰 원소들만 골라 담기 때문에 호출될 재귀 함수에서는 이전에 선택한 원소에 대해서는 알 필요가 없다.

```js
function lis1(arr) {
    if (!arr.length) return 0;
    let ret = 0;

    for (let i = 0; i < arr.length; i += 1) {
        let temp = [];
        for (let j = i + 1; j < arr.length; j += 1) {
            if (arr[i] < arr[j]) temp.push(arr[j]);
        }
        ret += Math.max(ret, 1 + lis1(temp));
    }
    return ret;
}
```

### 시간 복잡도

함수 내부에 두 개의 `for`문과 재귀로 반복된다. 가장 많이 호출하는 경우는 $(1, 2, 3)$과 같이 수열이 정렬된 경우이다. 이 경우 배열 `arr`의 두 원소를 비교하여 새로운 배열에 넣는 동작을 $n-1$부터 $1$까지 수행하고 그 횟수 만큼 재귀 호출을 수행한다.

> $f(n) = f(n-1) + f(n-2) + ... + 1$

$f(0)$는 기저 사례이므로 1이 된다.

>  $f(n-1) = f(n-2) + f(n-3) + ... + 1$

$f(n-1)$을 1번 식에 대입한다.

> $f(n) = 2f(n-1) = 2 × 2f(n-2) = ... = 2^n × f(0) + C = O(2^n)$

## 동적 계획법

앞선 완전 탐색을 이용한 방법에서는 중복해서 호출하는 경우가 생긴다. 대부분 이렇게 중복되는 부분 문제들은 동적 계획법을 이용해서 최적화할 수 있다. `lis2(begin)`는 배열 인덱스인 `begin`에서 시작하는 부분 증가 수열의 최대 길이를 반환한다. `begin`보다 뒤에 있으면서 더 큰 수라면 지금까지 찾은 LIS보다 더 긴지 아닌지 판단하는 것이다.

```js
const dp = Array(arr.length).fill(-1);

function lis2(begin) {
    let ret = dp[begin];
    if (ret !== -1) return ret;
    ret = 1;
    for (let next = begin + 1; next < arr.length; next += 1) {
        if (arr[begin] < arr[next]) {
            ret = Math.max(ret, lis2(next) + 1);
        }
    }
    return ret;
}
```

### 시간 복잡도

$f(n)$은 완전 탐색과 비슷하게 $n-1$ 개 부분 문제로 나뉘고 이는 중복된다. 한 번 계산한 문제들은 `dp`배열에 저장되므로 이후 중복 되는 계산을 하지 않고 바로 반환하기 때문에 $O(1)$이 된다. 따라서 $n$개의 부분 문제를 $n$번 탐색한 것과 같으므로 $O(n^2)$이다.

## 이진 탐색 + 동적 계획법

이 방법은 지금까지 찾은 부분 수열 중 최소의 마지막 값을 기억하고 값을 이진 탐색으로 검색하는 방법이다. 예를 들면 $(5, 6, 7, 1, 2)$의 수열이 있다고 할 때 이 수열의 LIS는 $(5, 6, 7)$이고 길이가 2인 부분 증가 수열은 $(5, 6)$, $(6, 7)$, $(1, 2)$가 있다. 이 때 $(1, 2)$가 가장 유리한데 그 이유는 만약 수열의 다음 수로 $3$이나 $4$와 같은 숫자가 주어진다면 계속해서 이어나갈 수 있기 때문이다.

> $C[i] =$ 길이가 i인 부분 수열 중 가장 작은 마지막 값

위와 같은 배열을 이용한다. 

```js
function binSearch(arr, target) {
    let lo = 0, hi = arr.length - 1, mid;
    while (lo < hi) {
        mid = Math.floor((lo + hi) / 2);
        arr[mid] < target ? lo = mid + 1 : hi = mid;
    }
    return lo;
}

function lis3(seq) {
    if (!seq.length) return 0;
    const tails = [seq[0]];
    let idx = 0;

    for (let i = 1; i < seq.length; i += 1) {
        if (tails[idx] < seq[i]) {
            idx += 1;
            tails[idx] = seq[i];
        }
        else {
            const last = binSearch(tails, seq[i]);
            tails[last] = seq[i];
        }
    }
    
    return idx + 1; // 최소 1개는 존재하므로
}
```

`idx`는 $C$배열인 `tails`의 마지막 인덱스이며 지금까지 찾아낸 LIS의 길이를 나타낸다. `tails`의 마지막 요소 값보다 크면 계속해서 이어나가면 되기 때문에 배열의 맨 끝에 값을 추가한다. 하지만 마지막 값보다 작을 경우 해당 값을 `tails`배열내 어딘가에 위치시켜야 한다.

`tails`배열이 커지는 경우는 `idx`의 마지막 요소 값보다 큰 경우에만 발생하므로 이 배열은 오름차순으로 정렬된다는 것을 알 수 있다. 배열이 정렬된 경우 빠르게 탐색할 수 있는 방법인 이진 탐색으로 위치를 찾아내고 해당 인덱스의 값은 변경한다.

### 시간 복잡도

$n$번 순회하면서 이진 탐색을 수행하므로 최대 $O(n\log n)$이 된다.

## Reference(참조)

- 구종만, *알고리즘 문제 해결 전략*, (인사이트, 2012).
- "부분 수열", *Wikipedia*, https://ko.wikipedia.org/wiki/%EB%B6%80%EB%B6%84_%EC%88%98%EC%97%B4.
- "Longest Increasing Subsequence Size (N log N)", *GeeksforGeeks*, https://www.geeksforgeeks.org/longest-monotonically-increasing-subsequence-size-n-log-n/.
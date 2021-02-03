---
title: MST(Minimun Spanning Tree)
tags: ["Algorithm"]
---

## 최소 신장 트리

최소 신장 트리(MST, Minimum Spanning Tree)

## Kruskal Algorithm

- 간선들을 가중치의 오름차순으로 정렬
- 간선들을 그 순서대로 하나씩 선택, 이미 선택된 간선들과 사이클(cycle)을 형성하면 선택되지 않는다.
- n-1개의 간선이 선택되면 종료한다.

연결 요소를 하나의 집합으로 생각하고 사이클 검사를 하면 된다.
{a}, {b, c}, {d, e, f} 각 집합은 연결되지 않은 것이라 생각하면 된다.
const V = 4, INF = 987654321;
const A = Array.from(Array(V), () => Array.from(Array(V), () => Array(V).fill(0)));
const data = `
0 3 7 X
X 0 X 9
5 12 0 X
X 1 8 0
`.trim().split('\n').map(d => d.split(' ').map(e => e === 'X' ? INF : parseInt(e)));

for (let i = 0; i < V; i += 1) {
    for (let j = 0; j < V; j += 1) {
        A[0][i][j] = Math.min(data[i][j], data[i][0] + data[0][j]);
    }
}

for (let k = 1; k < V; k += 1) {
    for (let i = 0; i < V; i += 1) {
        for (let j = 0; j < V; j += 1) {
            A[k][i][j] = Math.min(
                A[k - 1][i][j],
                A[k - 1][i][k] + A[k - 1][k][j]
            );
        }
    }
}
console.table(A[3])
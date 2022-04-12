const V = 4, INF = 987654321;
const A = `
0 3 7 X
X 0 X 9
5 12 0 X
X 1 8 0
`.trim().split('\n').map(d => d.split(' ').map(e => e === 'X' ? INF : parseInt(e)));

for (let k = 0; k < V; k += 1) {
    for (let i = 0; i < V; i += 1) {
        for (let j = 0; j < V; j += 1) {
            A[i][j] = Math.min(
                A[i][j],
                A[i][k] + A[k][j]
            );
        }
    }
}
console.table(A)
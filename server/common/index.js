
// 布伦克-瓦里安相关算法实现
function blomqvistBeta(x, y) {
    if (x.length !== y.length) {
        throw new Error('Input arrays must have the same length');
    }

    const n = x.length;

    // Calculate quartiles for X and Y
    const xQuartiles = calculateQuartiles(x);
    const yQuartiles = calculateQuartiles(y);

    let countXLessQ1Y = 0;
    let countXMoreQ3Y = 0;
    let countYLessQ1X = 0;
    let countYMoreQ3X = 0;

    for (let i = 0; i < n; i++) {
        if (x[i] < yQuartiles[0]) {
            countXLessQ1Y++;
        }
        if (x[i] > yQuartiles[2]) {
            countXMoreQ3Y++;
        }
        if (y[i] < xQuartiles[0]) {
            countYLessQ1X++;
        }
        if (y[i] > xQuartiles[2]) {
            countYMoreQ3X++;
        }
    }

    return Math.min((countXLessQ1Y + countXMoreQ3Y) / (2 * n), (countYLessQ1X + countYMoreQ3X) / (2 * n));
}

// Helper function to calculate quartiles
function calculateQuartiles(arr) {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const n = sortedArr.length;
    const q1Index = Math.floor(n / 4);
    const q3Index = Math.floor(3 * n / 4);

    return [
        sortedArr[q1Index],
        sortedArr[Math.floor(n / 2)],
        sortedArr[q3Index]
    ];
}

// 计算组合数
function combination(n, m) {
    if (m > n || m < 0 || n < 0) {
        return 0;
    }
    let result = 1;
    for (let i = n; i >= n - m + 1; i--) {
        result *= i;
    }
    for (let i = 2; i <= m; i++) {
        result /= i;
    }
    return result;
}

module.exports = {
    blomqvistBeta,
    combination,
};

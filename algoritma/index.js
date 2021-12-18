const reverseStringExceptNumber = (string) => {
    const numbers = string.match(/\d+/g);
    const nonNumbers = string.replace(/\d+/g, '');
    const reversedNonNumbers = nonNumbers.split('').reverse().join('');
    const reversedNumbers = numbers.map(number => {
        return number.split('').reverse().join('');
    });
    return reversedNonNumbers + reversedNumbers.join('');
}

console.log(reverseStringExceptNumber('NEGIE1'));

const isLongestWordFromSentence = (sentence) => {
    const words = sentence.split(' ');
    let longestWord = '';
    words.forEach(word => {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    });
    return `${longestWord} : ${longestWord.length} character`;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma"
console.log(isLongestWordFromSentence(sentence));

INPUT = ['xc', 'dz', 'bbb', 'dz']
QUERY = ['bbb', 'ac', 'dz']

const countEachValueOnQueryArrayIncludeOnInput = (input, query) => {
        let result = [];
        query.forEach(q => {
            let count = 0;
            input.forEach(i => {
                if (i === q) {
                    count++;
                }
            })
            result.push(count);
        })
        return `[${result}] karena ${result.map((r, idx) => `kata ${query[idx]} ${r == 0 ? 'tidak ada' : 'terdapat'} di INPUT`)}`;
}

console.log(countEachValueOnQueryArrayIncludeOnInput(INPUT, QUERY));

const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

const calculateDiffDiagonalOfMatrix = (matrix) => {
    let diagonals = {
        one: { values: [], sum: 0 },
        two: { values: [], sum: 0 }
    }
    for (let i = 0; i < matrix.length; i++) {
        const one = matrix[i][i];
        const two = matrix[i][matrix.length - 1 - i];
        diagonals.one.values.push(one);
        diagonals.two.values.push(two);
        diagonals.one.sum += one;
        diagonals.two.sum += two;
    }

    return `diagonal pertama = ${diagonals.one.values.join(' + ')}\ndiagonal kedua ${diagonals.two.values.join(' + ')}\nmaka hasilnya adalah ${diagonals.one.sum} - ${diagonals.two.sum} = ${diagonals.one.sum - diagonals.two.sum}`;
}

console.log(calculateDiffDiagonalOfMatrix(matrix));
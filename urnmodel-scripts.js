const typeField = document.getElementById('type-select')

const totalField = document.getElementById('total')
const rightAmountField = document.getElementById('right-amount')
const pickAmountField = document.getElementById('pick-amount')
const rightPicksAmountField = document.getElementById('right-picks-amount')

const rightPicksAmountDiv = document.getElementById('right-picks-div')

const button = document.querySelector('.btn')
const resultDiv = document.getElementById('result-div')
const resultField = document.getElementById('result-field')

typeField.addEventListener('change', function() {
    if (typeField.value === '1-й тип (все извлечённые нужные)')
        rightPicksAmountDiv.style.display = 'none'
    else
        rightPicksAmountDiv.style.display = 'block'
})

button.addEventListener('click', function() {
    let x = Calculate()
    resultDiv.style.display = 'flex'
    resultDiv.innerText = 'Результат: ' + x
})

function Calculate() {
    let n = Number.parseFloat(totalField.value)
    let m = Number.parseFloat(rightAmountField.value)
    let k = Number.parseFloat(pickAmountField.value)
    let r = Number.parseFloat(rightPicksAmountField.value)
    if (n % 1 !== 0 || m % 1 !== 0 || k % 1 !== 0 ||
        n <= 0 || m <= 0 || k <= 0)
        return 'все числа должны быть целыми и больше нуля'

    if (m > n) return 'правильных элементов не может быть больше чем всего элементов'
    if (k > n) return 'нельзя вытащить больше элементов чем есть всего в куче'
    
    switch (typeField.value) {
        case '1-й тип (все извлечённые нужные)': {
            if (k > m) return 'количество доставаемых элементов должно быть ' 
                            + 'меньше чем количество правильных элементов в куче'
            return (fact(m) / (fact(k) * fact(m - k))) / 
                   (fact(n) / (fact(k) * fact(n - k)))
        }
        default:
            if (r % 1 !== 0 || r <= 0) return 'все числа должны быть целыми и больше нуля'
            if (r > k) return 'нельзя получить больше правильных элементов чем выбираемое количество'
            if (r > m) return 'нельзя вытащить больше правильных элементов чем всего есть в куче'
            if (k - (n - m) > r) 
            return `нельзя достать так мало правильных элементов ` 
                + `(пояснение: p = n - m = ${n - m} - количество неправильных элементов, ` 
                + `k - p = ${k - (n - m)} - количество правильных элементов, которое мы ` 
                + `вытащим, если вытащим все неправильные элементы)`
            return (fact(m) / (fact(r) * fact(m - r))) * 
                   (fact(n - m) / (fact(k - r) * fact(n - m - k + r))) / 
                   (fact(n) / (fact(k) * fact(n - k)))
    }
}

function fact(x) {
    let res = 1
    for(let i = 1; i <= x; i++) {
        res *= i
    }
    return res
}
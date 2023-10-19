const selectElement = document.getElementById('type-select')
const repeatField = document.getElementById('repeat-select')

const totalDiv = document.getElementById('total-div')
const totalField = document.getElementById('total')

const chooseDiv = document.getElementById('choose-div')
const chooseField = document.getElementById('choose-amount')

const groupDiv = document.getElementById('group-div')
const groupField = document.getElementById('group-amount')

const permutationGroupsDiv = document.querySelector('.permutation-groups')
const permutationGroupInput = document.getElementById('group-amount')

const button = document.querySelector('.btn')

const resultDiv = document.getElementById('result-div')
const resultField = document.getElementById('result-field')

repeatField.addEventListener('change', function() {
    if (selectElement.value === 'Перестановки' && repeatField.value === 'Да') {
        chooseDiv.style.display = 'none'
        groupDiv.style.display = 'block'
        permutationGroupsDiv.style.display = 'flex'
    } else if (selectElement.value === 'Перестановки' && repeatField.value === 'Нет') {
        chooseDiv.style.display = 'none'
        groupDiv.style.display = 'none'
        permutationGroupsDiv.style.display = 'none'
    } else {
        chooseDiv.style.display = 'block'
        groupDiv.style.display = 'none'
        permutationGroupsDiv.style.display = 'none'
    }
})

selectElement.addEventListener('change', function() {
    if (selectElement.value === 'Перестановки' && repeatField.value === 'Да') {
        chooseDiv.style.display = 'none'
        groupDiv.style.display = 'block'
        permutationGroupsDiv.style.display = 'flex'

    } else if (selectElement.value === 'Перестановки' && repeatField.value === 'Нет') {
        chooseDiv.style.display = 'none'
        groupDiv.style.display = 'none'
        permutationGroupsDiv.style.display = 'none'
    } else {
        chooseDiv.style.display = 'block'
        groupDiv.style.display = 'none'
        permutationGroupsDiv.style.display = 'none'
    }
})

groupField.addEventListener('change', function() {
    let x = Number.parseFloat(groupField.value)
    if (x % 1 === 0) {
        permutationGroupsDiv.innerHTML = ''
        for (let i = 0; i < x; i++) {
            let str = 
            `<div class="col-md-2 input-field-group permutation-field-group">
                <div class="input-field">
                    <label class="form-sublabel"><i>n${i} =</i></label>
                    <input type="number" class="form-control permutation-field">
                </div>
            </div>`
            permutationGroupsDiv.innerHTML += str 
        }
        permutationGroupsDiv.style.display = 'flex'
    }
})

button.addEventListener('click', function() {
    let x = Calculate()
    resultDiv.style.display = 'flex'
    resultDiv.innerText = 'Результат: ' + x
})

function Calculate() {
    k = Number.parseFloat(chooseField.value)
    n = Number.parseFloat(totalField.value)
    repeat = repeatField.value 
    if (n % 1 !== 0 || n <= 0) return 'все числа должны быть целыми и больше нуля'

    switch (selectElement.value) {
        case 'Перестановки': {
            let k1 = Number.parseFloat(groupField.value)
            if (k1 > n) return 'k не может быть больше n'  
            if (k1 % 1 !== 0 || k1 <= 0) return 'все числа должны быть целыми и больше нуля'
            if (repeat === 'Нет') return fact(n - k)
            else {
                let valuesInputs = document.querySelectorAll('.permutation-field')
                let sum = 0
                let result = fact(n)
                for (let i = 0; i < valuesInputs.length; i++) {
                    let x = Number.parseFloat(valuesInputs[i].value)
                    if (x % 1 !== 0 || x <= 0) return 'все числа должны быть целыми и больше нуля'
                    sum += Number.parseInt(valuesInputs[i].value)
                    result /= fact(Number.parseInt(valuesInputs[i].value))
                }
                if (sum !== n) return 'сумма элементов всех групп должна давать n'
                return result
            }
        }
        case 'Размещения': {
            if (k % 1 !== 0 || k <= 0) return 'все числа должны быть целыми и больше нуля'
            if (repeat === 'Нет') { 
                if (k > n) return 'k не может быть больше n'
                return fact(n) / fact(n - k)
            }
            else return Math.pow(n, k)
        }
        
        case 'Сочетания': {
            if (k % 1 !== 0 || k <= 0) return 'все числа должны быть целыми и больше нуля'
            if (repeat === 'Нет') {
                if (k > n) return 'k не может быть больше n'
                return fact(n) / (fact(k) * fact(n - k))
            }
            else return fact(n + k - 1) / (fact(k) * fact(n - 1))
        }
    }
}

function fact(x) {
    let res = 1
    for(let i = 1; i <= x; i++) {
        res *= i
    }
    return res
}
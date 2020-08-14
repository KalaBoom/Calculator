const buttons = document.getElementById('buttons')
const result = document.getElementById('result-answer')
const list = document.getElementById('history-list')
const btnClear = document.getElementById('clearButton')
const btnBack = document.getElementById('backButton')

const 
    addition = (x,y) => x + y,
    substraction = (x,y) => x - y,
    multiplication = (x,y) => x * y,
    division = (x,y) => {
        if (y === 0) alert('Division by zero')
        else return x / y
    }

function showHistory(historCalc) {
    historCalc += '=' + arrayCalculation[0]
    let elemHis = document.createElement('li')
    let text = document.createTextNode(historCalc)
    elemHis.append(text)
    list.append(elemHis)
}

function calculateResult() {
    let arr = arrayCalculation.filter(item => item !== "" && item !== null)
    
    function findBrakets() {
        let indexBegin = -1
        let indexEnd = -1
        arr.forEach((item, index) => {
            if (item === '(') indexBegin = index
        })
        indexEnd = arr.indexOf(')', indexBegin)
        return {begin: indexBegin, end: indexEnd}
    }

    function calculation(arr) {
        let firstNum = +arr[0]
        let operand = arr[1]
        let secondNum = +arr[2]
        let result
        
        switch (operand) {
            case '+':
                result = addition(firstNum, secondNum)
                break;
            
            case '-':
                result = substraction(firstNum, secondNum)
                break;

            case '*':
                result = multiplication(firstNum, secondNum)
                break;

            case '/':
                result = division(firstNum, secondNum)
                break;

            default:
                console.log('Неизвенствый операнд', operand)
                break;
        }

        return result.toString()
    }

    function findOperand(arrCalc) {
        let mult = arrCalc.indexOf('*')
        let div = arrCalc.indexOf('/')
        let add = arrCalc.indexOf('+')
        let sub = arrCalc.indexOf('-')

        if (mult !== -1 && div !== -1 && mult < div) return mult
        else if (mult !== -1 && div !== -1 && div < mult) return div
        else if (mult !== -1) return mult
        else if (div !== -1) return div

        else if (add !== -1 && sub !== -1 && add < sub) return add
        else if (add !== -1 && sub !== -1 && sub < add) return sub 
        else if (add !== -1) return add
        else if (sub !== -1) return sub
        else return null
    } 

    function changeCalcArray(calcArray, operand) {
        if (operand !== null) {
            let newArr = calcArray.slice(operand - 1, operand + 2)
            let newNum
            try {
                newNum = calculation(newArr)
            } catch {
                return false
            }
            calcArray.splice(operand - 1, 3, newNum)
            return calcArray
        } else {
            console.log(calcArray)
        }
    }
    let exit = false
    while (arr.length !== 1 && exit !== true) {
        let brakets = findBrakets()
        if (brakets.begin !== -1 && brakets.end !== -1) {
            let diff = Math.abs(brakets.begin - brakets.end)
            let calcArray =  diff <= 2 ? arr.slice(brakets.begin+1, brakets.end) : arr.slice(brakets.begin, brakets.end + 1)
            if (calcArray.length !== 1) {
                let operand = findOperand(calcArray)
                let newArray = changeCalcArray(calcArray, operand)
                if (newArray !== false) arr.splice(brakets.begin, Math.abs(brakets.begin - brakets.end - 1), ...newArray)
                else exit = true
            } else {
                arr.splice(brakets.begin, 1)
                arr.splice(brakets.end - 1, 1)
            }
        } else {
            let operand = findOperand(arr)
            let newArr = changeCalcArray(arr, operand)
            if (newArr !== false) arr = newArr
            else exit = true
        }
    }
    
    arrayCalculation = []
    arrayCalculation[0] = arr
}

let arrayCalculation = []
arrayCalculation[0] = ""

function calculation(event) {
    let element = event.target.textContent
    let nowIndex = arrayCalculation.length - 1 >= 0 ? arrayCalculation.length - 1 : 0
    let prevElement = arrayCalculation[nowIndex] === "" ? arrayCalculation[nowIndex - 1] : arrayCalculation[nowIndex]

    if (prevElement === undefined) prevElement = ""

    function addElement() {
        arrayCalculation[nowIndex] += element
    }

    function newElement(newElement = element) {
        arrayCalculation.push(newElement)
        arrayCalculation.push("")
    }

    function checkDot(str) {
        if (str.includes('.')) return true
        else return false
    }

    switch (element) {
        case '.':
            if (arrayCalculation[nowIndex] === "") element = "0."
            if(!checkDot(arrayCalculation[nowIndex])) addElement()
            break

        case '=':
            calculateResult()
            showHistory(result.innerText)
            break

        case '()':
            let countLeftBrakets = arrayCalculation.filter(item => item === '(').length
            let countRigthBrakets = arrayCalculation.filter(item => item === ')').length

            if (element === '(') countLeftBrakets++
            if (element === ')') countRigthBrakets++

            if (prevElement === ')' && countRigthBrakets === countLeftBrakets) {
                arrayCalculation.push('*')
                element ='('
            } else if (prevElement.match(/[0-9]/) && countLeftBrakets > countRigthBrakets || prevElement === ')') {
                element = ')'
            } else if (prevElement.match(/[0-9]/)) {
                arrayCalculation.push('*')
                element = '('
            } else {
                element = '('
            }
            newElement()
            break
    
        case '+/-':
            let nowElement = arrayCalculation[nowIndex]
            if ((nowElement.match(/[0-9]/) || {}).input) {
                nowElement = -nowElement
                arrayCalculation[nowIndex] = nowElement.toString()
            }
            break
        
        case (element.match(/[\+\-\/\*]/) || {}).input: // + - * /
            if (nowIndex > 0) {
                let isOperand = (prevElement.match(/[\+\-\/\*]$/) || {}).input
                if (isOperand) {
                    arrayCalculation[nowIndex - 1] = element
                } else if (!isOperand && nowIndex !== 0 && prevElement !== '(') {
                    newElement()
                }
            } else {    
                newElement()
            }
            break

        case (element.match(/[0-9]/) || {}).input: // числа
            if (prevElement === ')') {
                arrayCalculation[nowIndex] = '*'
                nowIndex++
                arrayCalculation.push("")
            }
            addElement()
            break

        default:
            console.log('Неожиданный символ', element)
            break
    }
    //console.log(arrayCalculation, nowIndex)
    result.innerText = arrayCalculation.join('')
} 

function clear() {
    arrayCalculation = []
    arrayCalculation[0] = ""
    result.innerText = ""
    let li = document.querySelectorAll('li')
    li.forEach(item => list.removeChild(item))
}

function back() {
    let last = arrayCalculation[arrayCalculation.length - 1].split('')
    if (last.length === 1) arrayCalculation.pop()
    else if (last.length > 1) {
        arrayCalculation.pop()
        last.pop()
        arrayCalculation.push(last.join(''))
    }
    result.innerText = arrayCalculation.join('')
}

buttons.addEventListener('mousedown', calculation)
btnClear.addEventListener('mousedown', clear)
btnBack.addEventListener('mousedown', back)
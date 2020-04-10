const buttons = document.getElementById('buttons')
const result = document.getElementById('result-answer')
const dot = '.'
const historyDom = document.getElementById('history')
const list = document.getElementById('history-list')
const clearButton = document.getElementById('mode-button')

const 
    addition = (x,y) => x + y,
    substraction = (x,y) => x - y,
    multiplication = (x,y) => x * y,
    division = (x,y) => x / y

function falseAll() {
    addition.operand = false
    substraction.operand = false
    multiplication.operand = false
    division.operand = false
}
falseAll()

let historyCalculation = ""
let newNum = 0
let oldNum = 0
let operand = false

buttons.addEventListener('mousedown', calculator)

clearButton.addEventListener('mousedown', () => {
    result.innerText = ""
    newNum = 0
    oldNum = 0

    let li = document.querySelectorAll('li')
    li.forEach(item => list.removeChild(item))
})

function calculator(element) {
    let elem = element.target.innerText
    let dotWas = result.innerText.includes(dot)

    historyCalculation += elem

    function clear() {
        result.innerText = ""
    }

    function showHistory(historCalc) {
        let elemHis = document.createElement('li')
        let text = document.createTextNode(historCalc)
        elemHis.append(text)
        list.append(elemHis)
    }
    switch (elem) {
        
        case '.':
            if (dotWas) break
            result.innerText += elem
            break
        
        case '+':
            oldNum = parseFloat(result.innerText)
            addition.operand = true
            clear()
            break
        
        case '-':
            oldNum = parseFloat(result.innerText)
            substraction.operand = true
            clear()
            break
        
        case '*':
            oldNum = parseFloat(result.innerText)
            multiplication.operand = true
            clear()
            break
        
        case '/':
            oldNum = parseFloat(result.innerText)
            division.operand = true
            clear()
            break

        case '=':
            newNum = parseFloat(result.innerText)
            if (addition.operand) result.innerText = oldNum = addition(oldNum, newNum)
            else if (substraction.operand) result.innerText = oldNum = substraction(oldNum, newNum)
            else if (multiplication.operand) result.innerText = oldNum = multiplication(oldNum, newNum)
            else if (division.operand) {
                if (newNum === 0) {
                    result.innerText = 'Don`t divine by zero'
                } else {
                    result.innerText = oldNum = division(oldNum, newNum)
                }
            }
            falseAll()
            if (newNum === 0) {
                showHistory('Divine by zero')
                historyCalculation = ""
                operand = true
            } else {
                showHistory(historyCalculation += oldNum)
                historyCalculation = oldNum
            }
            break

        default:
            if(operand) result.innerText = elem
            else result.innerText += elem 
    }
}
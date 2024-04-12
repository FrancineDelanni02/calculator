const buttonNumbers = document.querySelectorAll('[data-number]');
const buttonOperators = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('[data-clear]');
const allClearButton = document.querySelector('[all-clear-button]');
const equalsButton = document.querySelector('[data-equals]');
const inputText = document.querySelector('#text');

    let operator = undefined;
    let number1 = "";
    let number2 = "";
    let text = "";
    let result;

    //Limpa todas as variáveis
    function clearAll(){ 
        text = "";
        number1 = "";
        number2 = "";
        operator = undefined; 
    }

    //Atualiza os caracteres na tela
    function updateDisplay(){
        inputText.innerText = text; 
    } 

    //Apagar o último caractere 
    function clear(){ 
        if(text[text.length-1] === operator){
            operator = "";
            number1 = "";
        }
         text = text.slice(0,text.length-1);
    }

    //Método inserir números na tela 
    function insert(number){
        if(text == "" && number == '.'){
            text = '0';
        }else if(text[text.length-1] == operator && number == '.'){
            text += '0';
        }else if(text[text.length-1] == ('.') && number === '.')
        {
            return
        }

        if(text == "Infinity"){
            clearAll();
        }

        text = `${text}${number}`; 
    }

    //Método de calcular
    function calculate(operator){
        if(number1 != ""){
            number2 = text.split(operator);
            number2 = number2[1]; 
        }

        if(number2 == "" && operator != '%'){
            return;
        }

        const n1 = parseFloat(number1);
        const n2 = parseFloat(number2);
        
        switch(operator){
            case '+':
                result = n1 + n2;
                break;
            case '*':
                result = n1 * n2;
                break;
            case '-':
                result = n1 - n2;
                break;
            case '/':
                result = n1 / n2;
                break;
            case '%':
                result = n1 / 100;
                break;
        }

        text = result;
        number1 = "";
        number2 = "";
    }

    //Método de identificação do operador --> Sem operações em sequência
    function insertOperator(operation){

        if(text == "Infinity"){
            return;
        }

        if(text[text.length-1] === '.'){
            text += '0';
        }

        if(text[text.length-1] === operator){
            return;
        }

        if(number1 == ""){
            number1 = text;
        }else if(operator != '%'){
            calculate(operator);
            number1 = result;
        }

        operator = operation;
        text = `${text}${operation}`;
    }


//----------------------------------------------------------------------
//Ação dos botões 

    allClearButton.addEventListener('click',function(){
        clearAll();
        updateDisplay();
    });

    clearButton.addEventListener('click',function(){
        clear();
        updateDisplay();
    });

    for(const buttonNumber of buttonNumbers){
        buttonNumber.addEventListener('click',function(){
            insert(buttonNumber.innerText);
            updateDisplay();
        });
    }

    for(const buttonOperator of buttonOperators){
        buttonOperator.addEventListener('click',function(){
            insertOperator(buttonOperator.innerText);
            updateDisplay();
        });
    }

    equalsButton.addEventListener('click',function(){
        calculate(operator);
        updateDisplay();
    });














 

const listOne = document.querySelector('.listOne');
const listTwo = document.querySelector('.listTwo');
const textOne = document.querySelector('.textOne');
const textTwo = document.querySelector('.textTwo');

const endpoint = "https://economia.awesomeapi.com.br/json/last/";
const coins = "USD-BRL,EUR-BRL,BTC-BRL,USD-NOK,EUR-GBP";

//colocar moedas no primeiro select
//se eu conseguir colocar o primeiro select com opções baseadas no segundo, não é necessario tirar os repetidos
//mas talvez eu tenha que tirar a opção padrão do select, ou colocar uma manualmente

fetch(endpoint + coins).then(res=>{
    return res.json();
}).then(data=>{
    Object.values(data).forEach((item)=>{

        let aux = false;
        let teste = [...listOne.options]
        teste.forEach((i)=>{
            if(i.value == item.code){
                aux = true;
                }
            })

            if(aux == true){
                return;
            }
            
        let option = document.createElement("option")
        option.text = item.code;
        listOne.add(option)
        aux = false;
        })

        selectTwo()
        calculate();
    })

    //colocar moedas no segundo select com base na opção selecionada do primeiro
function selectTwo(){
    fetch(endpoint + coins).then(res=>{
        return res.json()
    }).then(data=>{
        for(let i=0;listTwo.options.length > 0;i++){
            listTwo.innerHTML = "";
        }

        Object.values(data).forEach((item)=>{
            let option = document.createElement("option")
            if(item.code == listOne.value){
                option.text = item.codein;
                listTwo.add(option);
                }
            })
    })
}

//método de calcular
function calculate(){
    fetch(endpoint + coins).then(res=>{
        return res.json()
    }).then(data=>{
        let result;
        Object.keys(data).forEach((item)=>{
            if(item == listOne.value+listTwo.value){
                result = textOne.value * (data[item].bid);
            }
        })
        textTwo.value = result;
    })
}

//-------------------------------------------------------------
listOne.addEventListener('change',function(){
    selectTwo();
    calculate();
})

listTwo.addEventListener('change',function(){
    calculate();
})

textOne.addEventListener('change',function(){
    calculate();
})









// CALENDARIO

const calendario = document.getElementById('calendario') //pegando a div
const hoje = new Date() //cria uma data de hoje

//descobrir a segunda-feira da semana atual
function pegarSegunda(data) {
    const dia = data.getDay() // retorna um numero de 0 a 6 (dias da semana. ex: 0=D 1=S 2=T)
    const diferenca = dia === 0 ? -6 : 1 - dia // (quantos dias preciso chegar para tras ou para frente para chegar na segunda )

    const segunda = new Date(data)// copia a data original
    segunda.setDate(data.getDate() + diferenca) // aplica a diferença

    return segunda
}
// Formato da data ex: 'Seg 15/06'
function formatarData(data) {
    const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']

    const nomeDia = dias[data.getDay()]
    const dia = String(data.getDate()).padStart(2, '0')//o padStart >> se o texto tiver menos que 2 caracteres, completa com 0 a esquerda, 9 vira 09 
    const mes = String(data.getMonth() + 1).padStart(2, '0')// o +1 serve para corrigir a contagem do array, se nao junho seria 05 ja que a contagem começa em 0

    return `${nomeDia} ${dia}/${mes}`
}

function criarSemana(titulo, dataInicial){
    //cria e insere o titulo
    const h3 = document.createElement('h3')
    h3.innerText = titulo
    calendario.appendChild(h3)

    //cria a div que vai segurar os botoes
    const divDatas = document.createElement('div')
    divDatas.classList.add('datas')

    for (let i = 0; i < 6 ; i++){
        const data = new Date(dataInicial)
        data.setDate(dataInicial.getDate() + i)

        const botao = document.createElement('button')
        botao.innerText = formatarData(data)

        divDatas.appendChild(botao)
    }
    calendario.appendChild(divDatas)
}

const segundaAtual = pegarSegunda(hoje)

criarSemana('Semana atual', segundaAtual)

const segundaProxima = new Date(segundaAtual)
segundaProxima.setDate(segundaAtual.getDate() + 7)

criarSemana('Proxima semana', segundaProxima)




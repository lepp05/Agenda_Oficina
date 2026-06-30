// CALENDARIO

const calendario = document.getElementById('calendario') //pegando a div
const hoje = new Date() //cria uma data de hoje

const dataSelecionada = document.getElementById('dataSelecionada')


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

        //guarda informação no botão clicado
        botao.dataset.data = data.toISOString()

        botao.addEventListener('click', function(e){

            //faz com que somente o botao/data clicado seja selecionado
            const botoes = document.querySelectorAll('.datas button')
            botoes.forEach(function(botao){
                botao.classList.remove('selecionado')
            })
            e.target.classList.add('selecionado')
            
            const dataEscolhida = new Date(e.target.dataset.data) //→ new Date() → data (objeto Date de volta) (recupera no clique)
            
            dataSelecionada.innerText = `Data escolhida : ${e.target.innerText}`

            btnConfirmar.style.display = 'block'
        })

        divDatas.appendChild(botao)
 
    }
    calendario.appendChild(divDatas)
}

const segundaAtual = pegarSegunda(hoje)

criarSemana('Semana atual', segundaAtual)

const segundaProxima = new Date(segundaAtual)
segundaProxima.setDate(segundaAtual.getDate() + 7)

criarSemana('Proxima semana', segundaProxima)



//criando FORMULÁRIO após confirmação      
   
btnConfirmar.addEventListener('click', function(){ // function ao clicar no botão

    if(!document.querySelector('form')){  // se nao tiver form, ele cria..

    const formulario = document.createElement('form') // cria a tag <form> 
    const section = document.querySelector('.agend') // pega a section que ja existe no html
    section.appendChild(formulario)                   //.. e coloca dentro da section   
    
    
    formulario.classList.add('modal') // adiciona o formulario a um modal/caixa no centro feito no css

    // OVERLAY / EMBAÇAMENTO AO ABRIR O MODAL

    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    document.body.appendChild(overlay)


//BOTÃO X
        const fecharFormulario = document.createElement('button')
        fecharFormulario.innerHTML = 'X'
        formulario.appendChild(fecharFormulario)
        fecharFormulario.classList.add('x')

        fecharFormulario.addEventListener('click', function(){ // o que acontece quando eu clico no x 
            formulario.remove()  // fecha o formulario..
            overlay.remove()  //.. junto com o overlay
        })


//NOME
    const labelNome = document.createElement('label') // cria um texto para identifcar oq digitar no campo
    labelNome.innerText = 'Nome : '
    formulario.appendChild(labelNome) // e adiciona no form

    const inNome = document.createElement('input') // cria o espaço de escrita/input
    formulario.appendChild(inNome) // e adiona no form
//TELEFONE
    const labelNumero = document.createElement('label')
    labelNumero.innerText = 'Telefone : '
    formulario.appendChild(labelNumero)

    const inNumero = document.createElement('input')
    formulario.appendChild(inNumero)
//PLACA
    const labelPlaca = document.createElement('label')
    labelPlaca.innerText = 'Placa : '
    formulario.appendChild(labelPlaca)

    const inPlaca = document.createElement('input')
    formulario.appendChild(inPlaca)
//MODELO
    const labelModelo = document.createElement('label')
    labelModelo.innerText = 'Modelo da moto : '
    formulario.appendChild(labelModelo)

    const inModelo = document.createElement('input')
    inModelo.setAttribute('list', 'modelos')
    formulario.appendChild(inModelo)
    

    const inDataList = document.createElement('datalist')
    inDataList.setAttribute('id', 'modelos')
    formulario.appendChild(inDataList)

    const option1 = document.createElement('option')
    inDataList.appendChild(option1)
    option1.value = 'CG 160'

    const option2 = document.createElement('option')
    inDataList.appendChild(option2)
    option2.value = 'CG 150'

    const option3 = document.createElement('option')
    inDataList.appendChild(option3)
    option3.value = 'XRE 300'

    const option4 = document.createElement('option')
    inDataList.appendChild(option4)
    option4.value = 'FALCON 400'

// PREÇOS
        const precos = {
            'CG 150' : 300,
            'CG 160' : 300, 
            'XRE 300' : 350,
            'FALCON 400' : 400,
        }
        //para que o exibirPreco nao fique travado
        const exibirPreco = document.createElement('p') // crio o <p> fora do event..
            formulario.appendChild(exibirPreco)

        inModelo.addEventListener('change', function(){
            const modelo = inModelo.value
            const precoE = precos[modelo]
           if(precoE !== undefined){
            exibirPreco.innerHTML =  //.. e no event só atualizo o html
            `A revisão da ${modelo} custa R$ ${precoE.toFixed(2)}` 
            } else{
                exibirPreco.innerHTML = 'Modelo não encontrado na tabela de preços, consultar antes pelo WPP'
            }
        })

       

//botão enviar formulário
    const envio = document.createElement('button')
    envio.innerHTML = 'Enviar'
    formulario.appendChild(envio)
    envio.classList.add('enviar')

//função de enviar as informações
    envio.addEventListener('click', function(e){
        const nome_ = inNome.value
        const telefone_ = inNumero.value
        const placa_ = inPlaca.value
        const modelo_ = inModelo.value
        const data_ = dataSelecionada.innerText
        
        // LINK WHATSAPP
        const mensagem = `Olá, gostaria de agendar uma revisão. \n- ${data_} \n- ${nome_} \n- ${telefone_} \n- ${placa_} \n- ${modelo_}`
        const url = `https://wa.me/557193369806?text=${encodeURIComponent(mensagem)}`
        window.open(url)


        e.preventDefault()
    })
    

    
    
     
    // ..e evita a repetiçaõ do form 
    }else{
    return ''
}
})






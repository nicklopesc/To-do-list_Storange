//Referenciar o input
let input = document.querySelector('input[name=tarefa]');

//Referenciar o button
let btn = document.querySelector('#botao');

//Referenciar a lista
let lista = document.querySelector('#lista');

//Card
let card = document.querySelector('.card');

//JSON.parse pega o JSON que está lá em baixo e transforma num array que está aqui. Todo resto é feito no array.
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];


//Renderizando a aplicação
function renderizarTarefas(){

    //Limpar a listagem antes de renderizar novamente a tela
    lista.innerHTML = '';


    for(tarefa of tarefas){
        //Criar o item da lista
        let itemLista = document.createElement('li');

        //ADD classes no li
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        //Adicionar evento de click no item da lista
        itemLista.onclick = function(){
            deletarTarefa(this);
        }

        //Criar um texto
        let itemTexto = document.createTextNode(tarefa);

        //Adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        //Adicionar o item da lista na lista
        lista.appendChild(itemLista);
    }
}

//Executando a função para executar as tarefas
renderizarTarefas();


//Inserir dados na aplicação
//Escutar o evento de click no botao
btn.onclick = function(){

   //Capturar o valor digitado pelo usuário no input
   let novaTarefa = input.value;

   if(novaTarefa !== "") {
       
        //Atualizar a nova tarefa na nossa lista (array) de tarefas e renderizar a tela
        tarefas.push(novaTarefa);

        //Executando a função para executar as tarefas
        renderizarTarefas();

        //Limpar o input
        input.value = '';

        //Limpar mensagens de span(erro)
        removerSpans();

        //Salva os novos dados no banco de dados
        salvarDadosNosStorange();
   } else{
       //Limpar mensagens de span(erro)
       removerSpans();

       let span = document.createElement('span');
       span.setAttribute('class', 'alert alert-warning');

       let msg = document.createTextNode('Você precisa informar a Tarefa');
       span.appendChild(msg);

       card.appendChild(span);
   }

}

function removerSpans(){
    let spans = document.querySelectorAll('span');

    for(let i = 0; i < spans.length; i++){
        card.removeChild(spans[i]);
    }
}

//Deletar item ao clicar
function deletarTarefa(tar){
    //Remove a tarefa do array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    //Renderiza novamente a tela
    renderizarTarefas();

    //Salva os novos dados no banco de dados
    salvarDadosNosStorange();
}

//Armazenar dados no storange do navegador - armazenar em um banco de dados local
//Salvando dados no Storange
function salvarDadosNosStorange(){

    //Todo navegador web possi a capacidade/ possui storange
    //localStorange só aceita string. Neste caso, o JSON foi usado para transformar o array tarefas em string
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

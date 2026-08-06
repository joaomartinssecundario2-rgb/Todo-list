const inputTarefa = document.getElementById('inputTarefa');
const btnAdicionar = document.getElementById('btnadicionar');
const listaTarefas = document.getElementById('listaTarefas');
const totalTarefas = document.getElementById('totalTarefas');

let tarefas = [];

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }
    renderizarTarefas();
}

carregarTarefas();

function adicionarTarefa() {
    const texto = inputTarefa.value.trim();

    if (texto === '') {
        alert('Digite uma tarefa válida!');
        return;
    }

    const jaExiste = tarefas.some(t => t.texto.toLowerCase() === texto.toLowerCase());
    if (jaExiste) {
        alert('Essa tarefa já foi adicionada!');
        return;
    }

    tarefas.push({ texto: texto, concluida: false });
    inputTarefa.value = '';

    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    renderizarTarefas();
}

function renderizarTarefas() {
    listaTarefas.innerHTML = '';

    tarefas.forEach(function (tarefa, indice) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = tarefa.texto;
        if (tarefa.concluida) {
            span.style.textDecoration = 'line-through';
            span.style.color = '#888';
        }
        const btnConcluir = document.createElement('button');
        btnConcluir.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';
        btnConcluir.className = tarefa.concluida ? 'btn-acao btn-desfazer' : 'btn-acao btn-concluir';
        btnConcluir.addEventListener('click', function () {
            tarefas[indice].concluida = !tarefas[indice].concluida;
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            renderizarTarefas();
        });

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.className = 'btn-acao btn-remover';
        btnRemover.addEventListener('click', function () {
            removerTarefa(indice);
        });

        const divBotoes = document.createElement('div');
        divBotoes.className = 'btn-acao-group';
        divBotoes.appendChild(btnConcluir);
        divBotoes.appendChild(btnRemover);

        li.appendChild(span);
        li.appendChild(divBotoes);
        listaTarefas.appendChild(li);
    });

    totalTarefas.textContent = tarefas.length;
}

function alternarConclusao(indice) {
    tarefas[indice].concluida = !tarefas[indice].concluida;
    renderizarTarefas();
}

function removerTarefa(indice) {
    tarefas.splice(indice, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    renderizarTarefas();
}

btnAdicionar.addEventListener('click', adicionarTarefa);

inputTarefa.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

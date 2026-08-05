const inputTarefa = document.getElementById('inputTarefa');
const btnAdicionar = document.getElementById('btnadicionar');
const listaTarefas = document.getElementById('listaTarefas');
const totalTarefas = document.getElementById('totalTarefas');

let tarefas = [];

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

    renderizarTarefas();
}

function renderizarTarefas() {
    listaTarefas.innerHTML = '';

    tarefas.forEach(function (tarefa, indice) {
        const li = document.createElement('li');

        const estiloRisco = tarefa.concluida ? 'style="text-decoration: line-through; color: #888;"' : '';
        const textoBotaoConcluir = tarefa.concluida ? 'Desmarcar' : 'Concluir';

        li.innerHTML = `
            <span ${estiloRisco}>${tarefa.texto}</span>
            <div>
                <button class="btn-concluir" data-indice="${indice}">${textoBotaoConcluir}</button>
                <button class="btn-remover" data-indice="${indice}">Remover</button>
            </div>
        `;
        listaTarefas.appendChild(li);
    });

    totalTarefas.textContent = tarefas.length;

    document.querySelectorAll('.btn-remover').forEach(function (botao) {
        botao.addEventListener('click', function () {
            const indice = parseInt(this.getAttribute('data-indice'));
            removerTarefa(indice);
        });
    });

    document.querySelectorAll('.btn-concluir').forEach(function (botao) {
        botao.addEventListener('click', function () {
            const indice = parseInt(this.getAttribute('data-indice'));
            alternarConclusao(indice);
        });
    });
}

function alternarConclusao(indice) {
    tarefas[indice].concluida = !tarefas[indice].concluida;
    renderizarTarefas();
}

function removerTarefa(indice) {
    tarefas.splice(indice, 1);
    renderizarTarefas();
}

btnAdicionar.addEventListener('click', adicionarTarefa);

inputTarefa.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

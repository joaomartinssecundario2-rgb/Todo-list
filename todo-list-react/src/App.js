import { useState, useEffect } from 'react';
import './App.css';

function App() {
 
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem('tarefas-react');
    return salvas ? JSON.parse(salvas) : [];
  });

  const [input, setInput] = useState('');

 
  useEffect(() => {
    localStorage.setItem('tarefas-react', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = () => {
    if (input.trim() === '') return;
    setTarefas([...tarefas, { id: Date.now(), texto: input, concluida: false }]);
    setInput('');
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  const concluirTarefa = (id) => {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  };

  return (
    <div className="container">
      <h1>📋 Lista de Tarefas (React)</h1>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite uma nova tarefa..."
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>
            <span style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
              {tarefa.texto}
            </span>
            <button onClick={() => concluirTarefa(tarefa.id)}>
              {tarefa.concluida ? 'Desfazer' : 'Concluir'}
            </button>
            <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <p>Total de tarefas: {tarefas.length}</p>
    </div>
  );
}

export default App;
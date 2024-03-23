// Seleção de elementos
const todoForm = document.querySelector("#todo-form"); // Formulário responsável por adicionar tarefas
const todoInput = document.querySelector("#todo-input"); // Input de texto para adicionar tarefas
const todoList = document.querySelector("#todo-list"); // Lista de tarefas
const editForm = document.querySelector("#edit-form"); // Formulário responsável por editar tarefas
const editInput = document.querySelector("#edit-input"); // Input de texto para editar tarefas
const cancelEditBtn = document.querySelector("#cancel-edit-btn"); // Botão para cancelar a edição de tarefas
const searchInput = document.querySelector("#search-input"); // Input de texto para pesquisar tarefas
const eraseBtn = document.querySelector("#erase-button"); // Botão para limpar o campo de pesquisa
const filterBtn = document.querySelector("#filter-select"); // Select para filtrar tarefas

let oldInputValue; // Variável para armazenar o valor antigo do input de edição

// Funções
const saveTodo = (text, done = 0, save = 1) => { // Adicionando valores padrão para os parâmetros done e save
  const todo = document.createElement("div"); // Criando um elemento div
  todo.classList.add("todo"); // Adicionando a classe "todo" ao elemento div

  const todoTitle = document.createElement("h3"); // Criando um elemento h3
  todoTitle.innerText = text; // Adicionando o texto do input ao elemento h3
  todo.appendChild(todoTitle); // Adicionando o elemento h3 ao elemento div

  const doneBtn = document.createElement("button"); // Criando um elemento button
  doneBtn.classList.add("finish-todo"); // Adicionando a classe "finish-todo" ao elemento button
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'; // Adicionando um ícone ao elemento button
  todo.appendChild(doneBtn); // Adicionando o elemento button ao elemento div

  const editBtn = document.createElement("button"); // Criando um elemento button
  editBtn.classList.add("edit-todo"); // Adicionando a classe "edit-todo" ao elemento button
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'; // Adicionando um ícone ao elemento button
  todo.appendChild(editBtn); // Adicionando o elemento button ao elemento div

  const deleteBtn = document.createElement("button"); // Criando um elemento button
  deleteBtn.classList.add("remove-todo"); // Adicionando a classe "remove-todo" ao elemento button
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'; // Adicionando um ícone ao elemento button
  todo.appendChild(deleteBtn); // Adicionando o elemento button ao elemento div

  // Utilizando dados da localStorage
  if (done) { // Se done for verdadeiro
    todo.classList.add("done"); // Adiciona a classe "done" ao elemento div
  }

  if (save) { // Se save for verdadeiro
    saveTodoLocalStorage({ text, done: 0 }); // Salva a tarefa na localStorage
  }

  todoList.appendChild(todo); // Adicionando o elemento div à lista de tarefas

  todoInput.value = ""; // Limpando o input de texto
};

const toggleForms = () => { // Função para alternar entre os formulários de adição e edição de tarefas
  editForm.classList.toggle("hide"); // Alternando a visibilidade do formulário de edição
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => { // Função para atualizar o texto da tarefa
  const todos = document.querySelectorAll(".todo"); // Selecionando todas as tarefas

  todos.forEach((todo) => { // Iterando sobre todas as tarefas
    let todoTitle = todo.querySelector("h3"); // Selecionando o título da tarefa

    if (todoTitle.innerText === oldInputValue) { // Se o texto da tarefa for igual ao valor antigo do input
      todoTitle.innerText = text; // Atualiza o texto da tarefa

      // Utilizando dados da localStorage
      updateTodoLocalStorage(oldInputValue, text); // Atualiza o texto da tarefa na localStorage
    }
  });
};

const getSearchedTodos = (search) => { // Função para pesquisar tarefas
  const todos = document.querySelectorAll(".todo"); // Selecionando todas as tarefas

  todos.forEach((todo) => { // Iterando sobre todas as tarefas
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase(); // Selecionando o título da tarefa e convertendo para minúsculas

    todo.style.display = "flex"; // Exibindo a tarefa

    console.log(todoTitle); // Exibindo o título da tarefa

    if (!todoTitle.includes(search)) { // Se o título da tarefa não incluir o texto pesquisado
      todo.style.display = "none"; // Oculta a tarefa
    }
  });
};

const filterTodos = (filterValue) => { // Função para filtrar tarefas
  const todos = document.querySelectorAll(".todo"); // Selecionando todas as tarefas

  switch (filterValue) { // Verificando o valor do filtro
    case "all": // Se o valor do filtro for "all"
      todos.forEach((todo) => (todo.style.display = "flex")); // Exibe todas as tarefas

      break;

    case "done": // Se o valor do filtro for "done"
      todos.forEach((todo) => // Iterando sobre todas as tarefas
        todo.classList.contains("done") // Se a tarefa contém a classe "done"
          ? (todo.style.display = "flex") // Exibe a tarefa
          : (todo.style.display = "none") // Oculta a tarefa
      );

      break;

    case "todo": // Se o valor do filtro for "todo"
      todos.forEach((todo) => // Iterando sobre todas as tarefas
        !todo.classList.contains("done") // Se a tarefa não contém a classe "done"
          ? (todo.style.display = "flex") // Exibe a tarefa
          : (todo.style.display = "none") // Oculta a tarefa
      );

      break;

    default:
      break;
  }
};

// Eventos
todoForm.addEventListener("submit", (e) => { // Evento de envio do formulário de adição de tarefas
  e.preventDefault(); // Prevenindo o comportamento padrão do formulário

  const inputValue = todoInput.value; // Obtendo o valor do input de texto

  if (inputValue) { // Se o valor do input for verdadeiro
    saveTodo(inputValue); // Adiciona a tarefa
  }
});

document.addEventListener("click", (e) => { // Evento de clique
  const targetEl = e.target; // Elemento clicado
  const parentEl = targetEl.closest("div"); // Elemento pai do elemento clicado
  let todoTitle; // Título da tarefa

  if (parentEl && parentEl.querySelector("h3")) { // Se o elemento pai existir e contiver um elemento h3
    todoTitle = parentEl.querySelector("h3").innerText || ""; // Obtendo o texto do elemento h3
  }

  if (targetEl.classList.contains("finish-todo")) { // Se o elemento clicado contiver a classe "finish-todo"
    parentEl.classList.toggle("done"); // Alternando a classe "done" no elemento pai

    updateTodoStatusLocalStorage(todoTitle); // Utilizando dados da localStorage
  }

  if (targetEl.classList.contains("remove-todo")) { // Se o elemento clicado contiver a classe "remove-todo"
    parentEl.remove(); // Remove o elemento pai

    // Utilizando dados da localStorage
    removeTodoLocalStorage(todoTitle); // Remove a tarefa da localStorage
  }

  if (targetEl.classList.contains("edit-todo")) { // Se o elemento clicado contiver a classe "edit-todo"
    toggleForms(); // Alternando entre os formulários de adição e edição de tarefas

    editInput.value = todoTitle; // Atualizando o valor do input de edição
    oldInputValue = todoTitle; // Atualizando o valor antigo do input
  }
});

cancelEditBtn.addEventListener("click", (e) => { // Evento de clique no botão de cancelar edição
  e.preventDefault(); // Prevenindo o comportamento padrão do botão
  toggleForms(); // Alternando entre os formulários de adição e edição de tarefas
});

editForm.addEventListener("submit", (e) => { // Evento de envio do formulário de edição de tarefas
  e.preventDefault(); // Prevenindo o comportamento padrão do formulário

  const editInputValue = editInput.value; // Obtendo o valor do input de edição

  if (editInputValue) { // Se o valor do input for verdadeiro
    updateTodo(editInputValue); // Atualiza o texto da tarefa
  }

  toggleForms(); // Alternando entre os formulários de adição e edição de tarefas
});

searchInput.addEventListener("keyup", (e) => { // Evento de digitação no campo de pesquisa
  const search = e.target.value; // Obtendo o valor do campo de pesquisa

  getSearchedTodos(search); // Pesquisando tarefas
});

eraseBtn.addEventListener("click", (e) => { // Evento de clique no botão de limpar o campo de pesquisa
  e.preventDefault(); // Prevenindo o comportamento padrão do botão

  searchInput.value = ""; // Limpando o campo de pesquisa

  searchInput.dispatchEvent(new Event("keyup")); // Disparando o evento de digitação no campo de pesquisa
});

filterBtn.addEventListener("change", (e) => { // Evento de alteração no select de filtro
  const filterValue = e.target.value; // Obtendo o valor do select de filtro

  filterTodos(filterValue); // Filtrando tarefas
});

// Local Storage
const getTodosLocalStorage = () => { // Função para obter tarefas da localStorage
  const todos = JSON.parse(localStorage.getItem("todos")) || []; // Obtendo tarefas da localStorage

  return todos; // Retornando as tarefas
};

const loadTodos = () => { // Função para carregar tarefas da localStorage
  const todos = getTodosLocalStorage(); // Obtendo tarefas da localStorage

  todos.forEach((todo) => { // Iterando sobre todas as tarefas
    saveTodo(todo.text, todo.done, 0); // Adicionando a tarefa
  });
};

const saveTodoLocalStorage = (todo) => { // Função para salvar tarefas na localStorage
  const todos = getTodosLocalStorage(); // Obtendo tarefas da localStorage

  todos.push(todo); // Adicionando a tarefa ao array de tarefas

  localStorage.setItem("todos", JSON.stringify(todos)); // Salvando o array de tarefas na localStorage
};

const removeTodoLocalStorage = (todoText) => { // Função para remover tarefas da localStorage
  const todos = getTodosLocalStorage(); // Obtendo tarefas da localStorage

  const filteredTodos = todos.filter((todo) => todo.text != todoText); // Filtrando as tarefas

  localStorage.setItem("todos", JSON.stringify(filteredTodos)); // Salvando o array de tarefas filtrado na localStorage
};

const updateTodoStatusLocalStorage = (todoText) => { // Função para atualizar o status da tarefa na localStorage
  const todos = getTodosLocalStorage(); // Obtendo tarefas da localStorage

  todos.map((todo) => // Iterando sobre todas as tarefas
    todo.text === todoText ? (todo.done = !todo.done) : null // Atualizando o status da tarefa
  );

  localStorage.setItem("todos", JSON.stringify(todos)); // Salvando o array de tarefas atualizado na localStorage
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => { // Função para atualizar o texto da tarefa na localStorage
  const todos = getTodosLocalStorage(); // Obtendo tarefas da localStorage

  todos.map((todo) => // Iterando sobre todas as tarefas
    todo.text === todoOldText ? (todo.text = todoNewText) : null // Atualizando o texto da tarefa
  );

  localStorage.setItem("todos", JSON.stringify(todos)); // Salvando o array de tarefas atualizado na localStorage
};

loadTodos();

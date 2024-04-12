// Elementos
const notesContainer = document.querySelector("#notes-container"); // Esse é o container onde as notas serão inseridas.

const noteInput = document.querySelector("#note-content"); // Esse é o input onde o usuário irá digitar o conteúdo da nota.

const addNoteBtn = document.querySelector(".add-note"); // Esse é o botão que irá adicionar a nota.

const searchInput = document.querySelector("#search-input"); // Esse é o input onde o usuário irá digitar o conteúdo da nota.

const exportBtn = document.querySelector("#export-notes"); // Esse é o botão que irá exportar as notas.

// Funções
function showNotes() { // Essa função é responsável por exibir as notas na tela.
  cleanNotes(); // Limpa as notas que estão na tela para evitar duplicações.

  getNotes().forEach((note) => { // Para cada nota, cria um elemento de nota e insere no container.
    const noteElement = createNote(note.id, note.content, note.fixed); // Cria o elemento de nota com o conteúdo da nota.
    notesContainer.appendChild(noteElement); // Insere o elemento de nota no container.
  });
}

function getNotes() { // Essa função é responsável por pegar as notas do localStorage e retornar um array de notas.
  const notes = JSON.parse(localStorage.getItem("notes") || "[]"); // Pega as notas do localStorage e converte para um array.

  const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1)); // Ordena as notas fixadas primeiro.

  return orderedNotes; // Retorna as notas ordenadas para quem chamou a função.
}

function cleanNotes() { // Essa função é responsável por limpar as notas que estão na tela.
  notesContainer.replaceChildren([]); // Substitui os filhos do container por um array vazio.
}

function saveNotes(notes) { // Essa função é responsável por salvar as notas no localStorage.
  localStorage.setItem("notes", JSON.stringify(notes)); // Salva as notas no localStorage.
}

function createNote(id, content, fixed) { // Essa função é responsável por criar um elemento de nota.
  const element = document.createElement("div"); // Cria um elemento div para a nota.

  element.classList.add("note"); // Adiciona a classe note ao elemento.

  const textarea = document.createElement("textarea"); // Cria um elemento textarea para o conteúdo da nota.

  textarea.value = content; // Adiciona o conteúdo da nota ao textarea.

  textarea.placeholder = "Adicione algum texto..."; // Adiciona um placeholder ao textarea.

  element.appendChild(textarea); // Insere o textarea no elemento.

  if (fixed) { // Se a nota estiver fixada, adiciona a classe fixed ao elemento.
    element.classList.add("fixed"); // Adiciona a classe fixed ao elemento.
  }

  const pinIcon = document.createElement("i"); // Cria um elemento i para o ícone de fixar a nota.

  pinIcon.classList.add(...["bi", "bi-pin"]); // Adiciona as classes bi e bi-pin ao ícone.

  element.appendChild(pinIcon); // Insere o ícone no elemento.

  const deleteIcon = document.createElement("i"); // Cria um elemento i para o ícone de deletar a nota.

  deleteIcon.classList.add(...["bi", "bi-x-lg"]); // Adiciona as classes bi e bi-x-lg ao ícone.

  element.appendChild(deleteIcon); // Insere o ícone no elemento.

  const duplicateIcon = document.createElement("i"); // Cria um elemento i para o ícone de duplicar a nota.

  duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]); // Adiciona as classes bi e bi-file-earmark-plus ao ícone.

  element.appendChild(duplicateIcon); // Insere o ícone no elemento.

  // Eventos do elemento
  element.querySelector("textarea").addEventListener("keydown", () => { // Adiciona um evento de keydown no textarea possibilitando a edição do conteúdo da nota.
    const noteContent = element.querySelector("textarea").value; // Pega o conteúdo da nota do textarea.
    updateNote(id, noteContent); // Atualiza o conteúdo da nota no localStorage.
  });

  element.querySelector(".bi-x-lg").addEventListener("click", () => { // Adiciona um evento de click no ícone de deletar a nota.
    deleteNote(id, element); // Deleta a nota do localStorage e do container.
  });

  element.querySelector(".bi-pin").addEventListener("click", () => { // Adiciona um evento de click no ícone de fixar a nota.
    toggleFixNote(id); // Fixa ou desafixa a nota no localStorage.
  });

  element // Adiciona um evento de click no ícone de duplicar a nota.
    .querySelector(".bi-file-earmark-plus") // Adiciona um evento de click no ícone de duplicar a nota.
    .addEventListener("click", () => { // Adiciona um evento de click no ícone de duplicar a nota.
      copyNote(id); // Duplica a nota no localStorage e no container.
    });

  return element; // Retorna o elemento de nota para quem chamou a função.
}

function addNote() { // Essa função é responsável por adicionar uma nota.
  const notes = getNotes(); // Pega as notas do localStorage.

  const noteInput = document.querySelector("#note-content"); // Pega o input de conteúdo da nota pelo id.

  const noteObject = { // Cria um objeto de nota com o id, conteúdo e fixado.
    id: generateId(), // Gera um id para a nota.
    content: noteInput.value, // Pega o conteúdo da nota do input.
    fixed: false, // Inicializa a nota como não fixada.
  };

  const noteElement = createNote(noteObject.id, noteObject.content); // Cria o elemento de nota com o conteúdo da nota.

  notesContainer.appendChild(noteElement); // Insere o elemento de nota no container.

  notes.push(noteObject); // Insere a nota no array de notas.

  saveNotes(notes); // Salva as notas no localStorage.
}

function generateId() { // Essa função é responsável por gerar um id para a nota.
  return Math.floor(Math.random() * 5000); // Retorna um número aleatório entre 0 e 5000.
}

function updateNote(id, newContent) { // Essa função é responsável por atualizar o conteúdo da nota.
  const notes = getNotes(); // Pega as notas do localStorage.
  const targetNote = notes.filter((note) => note.id === id)[0]; // Filtra a nota pelo id.

  targetNote.content = newContent; // Atualiza o conteúdo da nota.

  saveNotes(notes); // Salva as notas no localStorage.
}

function deleteNote(id, element) { // Essa função é responsável por deletar a nota.
  const notes = getNotes().filter((note) => note.id !== id); // Filtra as notas pelo id da nota a ser deletada.

  saveNotes(notes); // Salva as notas no localStorage.

  notesContainer.removeChild(element); // Remove a nota do container.
}

function toggleFixNote(id) { // Essa função é responsável por fixar ou desafixar a nota.
  const notes = getNotes(); // Pega as notas do localStorage.
  const targetNote = notes.filter((note) => note.id === id)[0]; // Filtra a nota pelo id.

  targetNote.fixed = !targetNote.fixed; // Inverte o valor de fixado da nota.

  saveNotes(notes); // Salva as notas no localStorage.

  showNotes(); // Exibe as notas na tela.
}

function searchNotes(search) { // Essa função é responsável por buscar notas pelo conteúdo.
  const searchResults = getNotes().filter((note) => // Filtra as notas pelo conteúdo.
    note.content.includes(search) // Verifica se o conteúdo da nota inclui a busca.
  );

  if (search !== "") { // Se a busca não estiver vazia, limpa as notas e exibe as notas filtradas.
    cleanNotes(); // Limpa as notas que estão na tela.

    searchResults.forEach((note) => { // Para cada nota filtrada, cria um elemento de nota e insere no container.
      const noteElement = createNote(note.id, note.content); // Cria o elemento de nota com o conteúdo da nota.
      notesContainer.appendChild(noteElement); // Insere o elemento de nota no container.
    });

    return; // Retorna para evitar a execução do código abaixo.
  }

  cleanNotes(); // Limpa as notas que estão na tela.

  showNotes(); // Exibe as notas na tela.
}

function copyNote(id) { // Essa função é responsável por duplicar uma nota.
  const notes = getNotes(); // Pega as notas do localStorage.
  const targetNote = notes.filter((note) => note.id === id)[0]; // Filtra a nota pelo id.

  const noteObject = { // Cria um objeto de nota com o id, conteúdo e fixado.
    id: generateId(), // Gera um id para a nota.
    content: targetNote.content, // Pega o conteúdo da nota a ser duplicada.
    fixed: false, // Inicializa a nota como não fixada.
  };

  const noteElement = createNote(noteObject.id, noteObject.content, false); // Cria o elemento de nota com o conteúdo da nota.

  notesContainer.appendChild(noteElement); // Insere o elemento de nota no container.

  notes.push(noteObject); // Insere a nota no array de notas.

  saveNotes(notes); // Salva as notas no localStorage.
}

function exportData() { // Essa função é responsável por exportar as notas em formato CSV.
  const notes = JSON.parse(localStorage.getItem("notes") || "[]"); // Pega as notas do localStorage e converte para um array.

  const csvString = [ // Cria um array de strings com os dados das notas.
    ["ID", "Conteúdo", "Fixado?"], // Cria um array de strings com os cabeçalhos.
    ...notes.map((note) => [note.id, note.content, note.fixed]), // Mapeia as notas para um array de strings.
  ]
    .map((e) => e.join(",")) // Mapeia o array de strings para um array de strings separadas por vírgula.
    .join("\n"); // Junta o array de strings com quebra de linha.

  const element = document.createElement("a"); // Cria um elemento a para fazer o download do arquivo.

  element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString); // Adiciona o conteúdo do arquivo ao href.

  element.target = "_blank"; // Adiciona o atributo target com o valor _blank.

  element.download = "export.csv"; // Adiciona o atributo download com o valor export.csv.

  element.click(); // Clica no elemento para fazer o download do arquivo.
}

// Eventos
addNoteBtn.addEventListener("click", () => addNote()); // Adiciona um evento de click no botão de adicionar nota.

searchInput.addEventListener("keyup", (e) => { // Adiciona um evento de keyup no input de busca.
  const search = e.target.value; // Pega o valor do input de busca.

  searchNotes(search); // Busca as notas pelo valor do input.
});

noteInput.addEventListener("keydown", (e) => { // Adiciona um evento de keydown no input de conteúdo da nota.
  if (e.key === "Enter") { // Se a tecla pressionada for Enter, adiciona a nota.
    addNote(); // Adiciona a nota.
  }
});

exportBtn.addEventListener("click", () => { // Adiciona um evento de click no botão de exportar notas.
  exportData(); // Exporta as notas em formato CSV.
});

// Init
showNotes(); // Exibe as notas na tela.

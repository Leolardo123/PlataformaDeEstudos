## Módulo 1 – Administração

![[PDE-UC-Modulo01_02.svg]]

### UC-001 – Cadastrar Edital

|Campo|Descrição|
|---|---|
|**Prioridade**|Essencial|
|**Ator**|Administrador|
|**Pré-requisitos**|Estar logado como administrador|
|**Descrição**|1. Acessar a listagem de editais;2. Acessar a opção de cadastrar edital;3. Preencher os dados;4. Salvar.|
|**Resultado**|Novo edital cadastrado com sucesso.|

### UC-002 – Editar Edital

| Campo              | Descrição                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **Prioridade**     | Essencial                                                                                                                   |
| **Ator**           | Administrador                                                                                                               |
| **Pré-requisitos** | Estar logado como administrador; Edital pré-cadastrado no sistema                                                           |
| **Descrição**      | 1. Acessar a listagem de editais;2. Acessar a opção de editar edital em um item específico;3. Preencher os dados;4. Salvar. |
| **Resultado**      | Edital editado com sucesso.                                                                                                 |

### UC-003 – Excluir Edital

| Campo              | Descrição                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| **Prioridade**     | Essencial                                                                                         |
| **Ator**           | Administrador                                                                                     |
| **Pré-requisitos** | Estar logado como administrador; Edital pré-cadastrado no sistema;                                |
| **Descrição**      | 1. Acessar a listagem de editais;2. Selecionar a opção de excluir edital;3. Confirmar a exclusão. |
| **Resultado**      | Edital excluído com sucesso.                                                                      |

### UC-004 – Cadastrar Matéria

| Campo              | Descrição                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Prioridade**     | Essencial                                                                                                  |
| **Ator**           | Administrador                                                                                              |
| **Pré-requisitos** | Estar logado como administrador;                                                                           |
| **Descrição**      | 1. Acessar a listagem de matérias;2. Acessar a opção de cadastrar matéria;3. Preencher os dados;4. Salvar. |
| **Resultado**      | Nova matéria cadastrada com sucesso.                                                                       |

### UC-005 – Editar Matéria

| Campo              | Descrição                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **Prioridade**     | Essencial                                                                                                                     |
| **Ator**           | Administrador                                                                                                                 |
| **Pré-requisitos** | Estar logado como administrador; Matéria pré-cadastrada no sistema;                                                           |
| **Descrição**      | 1. Acessar a listagem de matérias;2. Acessar a opção de editar matéria em um item específico;3. Preencher os dados;4. Salvar. |
| **Resultado**      | Matéria editada com sucesso.                                                                                                  |

### UC-006 – Associar Matéria ao Edital

| Campo              | Descrição                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prioridade**     | Essencial                                                                                                                                           |
| **Ator**           | Administrador                                                                                                                                       |
| **Pré-requisitos** | Estar logado como administrador; Matéria e Edital pré-cadastrados no sistema;                                                                       |
| **Descrição**      | 1. Acessar a listagem de editais;2. Acessar um edital específico;3. Acessar a opção de associar matérias;4. Selecionar matérias da lista;5. Salvar. |
| **Resultado**      | As matérias selecionadas serão exibidas nos detalhes do edital.                                                                                     |

### UC-007 – Cadastrar Tópico

| Campo              | Descrição                                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| **Prioridade**     | Essencial                                                                                                |
| **Ator**           | Administrador                                                                                            |
| **Pré-requisitos** | Estar logado como administrador;                                                                         |
| **Descrição**      | 1. Acessar a listagem de tópicos;2. Acessar a opção de cadastrar tópico;3. Preencher os dados;4. Salvar. |
| **Resultado**      | Novo tópico cadastrado com sucesso.                                                                      |

### UC-008 – Editar Tópico

| Campo              | Descrição                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **Prioridade**     | Essencial                                                                                                                   |
| **Ator**           | Administrador                                                                                                               |
| **Pré-requisitos** | Estar logado como administrador; Tópico pré-cadastrado no sistema;                                                          |
| **Descrição**      | 1. Acessar a listagem de tópicos;2. Acessar a opção de editar tópico em um item específico;3. Preencher os dados;4. Salvar. |
| **Resultado**      | Tópico editado com sucesso.                                                                                                 |

### UC-009 – Congelar Tópico

| Campo              | Descrição                                                                               |
| ------------------ | --------------------------------------------------------------------------------------- |
| **Prioridade**     | Importante                                                                              |
| **Ator**           | Administrador                                                                           |
| **Pré-requisitos** | Estar logado como administrador; Tópico pré-cadastrado no sistema;                      |
| **Descrição**      | 1. Acessar a listagem de tópicos;2. Selecionar a opção de congelar tópico;3. Confirmar. |
| **Resultado**      | Tópico congelado com sucesso.                                                           |

### UC-010 – Ordenar Tópicos

| Campo              | Descrição                                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prioridade**     | Importante                                                                                                                                                                                      |
| **Ator**           | Administrador                                                                                                                                                                                   |
| **Pré-requisitos** | Estar logado como administrador; Tópico pré-cadastrado no sistema;                                                                                                                              |
| **Descrição**      | 1. Acessar a listagem de editais;2. Acessar um edital específico;3. Acessar uma matéria específica;4. Ativar a reordenação dos tópicos na listagem;5. Modificar a ordenação da lista;6. Salvar. |
| **Resultado**      | A listagem dos tópicos deverá seguir a nova ordenação.                                                                                                                                          |

### UC-011 – Selecionar Tópicos da Matéria para o Edital

| Campo              | Descrição                                                                                                                                                                                        |     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| **Prioridade**     | Essencial                                                                                                                                                                                        |     |
| **Ator**           | Administrador                                                                                                                                                                                    |     |
| **Pré-requisitos** | Estar logado como administrador; Tópico pré-cadastrado no sistema;                                                                                                                               |     |
| **Descrição**      | 1. Acessar a listagem de editais;2. Acessar um edital específico;3. Acessar uma matéria específica;4. Acessar a opção de selecionar tópicos da matéria;5. Selecionar tópicos da lista;6. Salvar. |     |
| **Resultado**      | Os tópicos selecionados serão exibidos nos detalhes da matéria.                                                                                                                                  |     |

---

## Módulo 2 – Conteúdo

### UC-012 – Cadastrar Conteúdo

| Campo              | Descrição                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **Resumo**         | O administrador poderá cadastrar o conteúdo teórico de um tópico.                                                            |
| **Prioridade**     | Essencial                                                                                                                    |
| **Ator**           | Administrador                                                                                                                |
| **Pré-requisitos** | Estar logado como administrador; Tópico pré-cadastrado no sistema;                                                           |
| **Descrição**      | 1. Acessar a listagem de tópicos;2. Acessar um tópico específico;3. Preencher os dados da aba de conteúdo teórico;4. Salvar. |
| **Resultado**      | Conteúdo cadastrado com sucesso.                                                                                             |

### UC-013 – Editar Conteúdo

|Campo|Descrição|
|---|---|
|**Prioridade**|Essencial|
|**Ator**|Administrador|
|**Pré-requisitos**|Estar logado como administrador|
|**Descrição**|1. Acessar a listagem de tópicos;2. Acessar um tópico específico;3. Alterar os dados da aba de conteúdo teórico;4. Salvar.|
|**Resultado**|Conteúdo editado com sucesso.|

### UC-014 – Anexar PDF

|Campo|Descrição|
|---|---|
|**Prioridade**|Desejável|
|**Ator**|Administrador|
|**Pré-requisitos**|Estar logado como administrador|
|**Descrição**|1. Acessar a listagem de tópicos;2. Acessar um tópico específico;3. Inserir arquivos PDF na aba de conteúdo teórico;4. Salvar.|
|**Resultado**|PDF anexado ao conteúdo com sucesso.|

### UC-015 – Anexar Vídeo

|Campo|Descrição|
|---|---|
|**Prioridade**|Desejável|
|**Ator**|Administrador|
|**Pré-requisitos**|Estar logado como administrador|
|**Descrição**|1. Acessar a listagem de tópicos;2. Acessar um tópico específico;3. Inserir vídeo na aba de conteúdo teórico;4. Salvar.|
|**Resultado**|Vídeo anexado ao conteúdo com sucesso.|

### UC-016 – Anexar Link

|Campo|Descrição|
|---|---|
|**Prioridade**|Desejável|
|**Ator**|Administrador|
|**Pré-requisitos**|Estar logado como administrador|
|**Descrição**|1. Acessar a listagem de tópicos;2. Acessar um tópico específico;3. Inserir links na aba de conteúdo teórico;4. Salvar.|
|**Resultado**|Link anexado ao conteúdo com sucesso.|
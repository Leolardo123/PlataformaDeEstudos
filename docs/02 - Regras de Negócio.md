## Base

### RN-001 – Organização do Conteúdo

Os conteúdos da plataforma deverão ser organizados na seguinte hierarquia:

```text
Edital
└── Matéria
    └── Tópicos
```

O tópico será a menor unidade de estudo, onde todo o conteúdo visualizado e realizado diretamente pelo aluno estará associado.

### RN-002 – Reutilização de Matérias

Uma matéria poderá ser utilizada em mais de um edital.

Cada edital possuirá uma cópia vinculada da estrutura da matéria, permitindo selecionar apenas os tópicos necessários sem alterar a matéria original.

### RN-003 – Ordem de Estudo

Os tópicos deverão respeitar a ordem definida pela equipe pedagógica.

O sistema não deverá alterar automaticamente essa sequência.

### RN-004 – Conteúdo do Tópico

Cada tópico poderá possuir:

- Conteúdo escrito;
    
- Questões;
    
- Flashcards;
    
- Arquivos PDF;
    
- Vídeos;
    
- Links;
    
- Materiais complementares.
    

Todos esses itens pertencem ao tópico.

---

## Cronograma

### RN-005 – Disponibilidade do Aluno

O aluno deverá informar:

- Dias da semana;
    
- Quantidade de horas disponíveis.
    

O cronograma será gerado automaticamente utilizando essas informações.

### RN-006 – Sequência de Aprendizagem

Para cada tópico, o fluxo padrão será:

```text
Conteúdo → Questões → Flashcards (Revisão)
```

### RN-007 – Liberação das Questões

As tarefas de questões somente poderão ser disponibilizadas após a conclusão do conteúdo correspondente.

### RN-008 – Liberação dos Flashcards

As tarefas de revisão somente poderão ser disponibilizadas após a conclusão das questões do tópico.

> **Observação:** Essa regra pode ser flexibilizada futuramente.

### RN-009 – Cronograma

As tarefas deverão ser distribuídas automaticamente conforme a disponibilidade cadastrada pelo aluno.

### RN-010 – Tarefas Pendentes

Ao final do dia, tarefas não concluídas permanecerão pendentes e serão reposicionadas no cronograma conforme as regras de planejamento.

### RN-011 – Reagendamento

O aluno poderá reagendar manualmente tarefas futuras.

---

## Conteúdo

### RN-012 – Leitura Parcial

O aluno poderá interromper a leitura de um conteúdo.

O sistema deverá registrar:

- Posição de leitura;
    
- Tempo estudado.
    

### RN-013 – Conclusão Manual

A conclusão do conteúdo ocorrerá mediante ação do aluno.

---

## Questões

### RN-014 – Associação

Uma questão poderá estar associada a um ou mais tópicos.

### RN-015 – Meta de Questões

Na primeira versão, cada tarefa apresentará uma quantidade fixa de questões.

### RN-016 – Correção

Após finalizar uma tarefa de questões, o sistema deverá apresentar o resultado imediatamente.

---

## Flashcards

### RN-017 – Associação

Flashcards pertencem ao tópico.

### RN-018 – Estrutura

Todo flashcard possuirá:

- Frente;
    
- Verso.
    

### RN-019 – Revisões

As revisões utilizarão flashcards na primeira versão do sistema.

### RN-020 – Espaçamento

Ao concluir um tópico, o sistema deverá gerar automaticamente tarefas de revisão utilizando um espaçamento padrão configurável.

---

## Atualizações

### RN-021 – Alteração de Conteúdo

Quando ocorrer alteração em um edital ou matéria, o aluno deverá ser notificado.

### RN-022 – Novos Tópicos

Novos tópicos poderão ser adicionados ao cronograma mediante confirmação do aluno.

### RN-023 – Tópicos Removidos

Tópicos removidos permanecerão congelados para preservar o histórico dos alunos.

### RN-024 – Preservação do Histórico

Alterações no cronograma não poderão remover tarefas que já possuam progresso registrado.

### RN-025 – Atualização de Tarefas Pendentes

Tarefas sem qualquer interação poderão ser recriadas ou removidas conforme a atualização do conteúdo.

---

## Progresso

### RN-026 – Controle de Progresso

O progresso será controlado individualmente para:

- Conteúdo;
    
- Questões;
    
- Revisões.
    

### RN-027 – Status da Tarefa

Toda tarefa possuirá um dos seguintes estados:

- Pendente;
    
- Em andamento;
    
- Concluída.
    

### RN-028 – Progresso

O status da tarefa é independente do percentual de progresso.

### RN-029 – Histórico

Toda interação do aluno deverá ser registrada, incluindo:

- Tempo estudado;
    
- Posição de leitura;
    
- Respostas das questões;
    
- Execução de flashcards.
    

---

## Interface

### RN-030 – Simplicidade

O sistema deverá priorizar uma experiência simples para novos usuários.

### RN-031 – Configuração Inicial

O aluno deverá conseguir iniciar seus estudos após informar apenas sua disponibilidade semanal.

---

## Evolução

### RN-032 – Funcionalidades Futuras

O sistema deverá permitir futuras implementações, como:

- Estudar apenas questões;
    
- Estudar apenas flashcards;
    
- Alterar espaçamento de revisões;
    
- Configurar quantidade de questões;
    
- Configurar quantidade de flashcards.
    

---

## Dados

### RN-033 – Persistência

O histórico do aluno nunca deverá ser perdido devido a alterações pedagógicas.

### RN-034 – Catálogo

Matérias e tópicos deverão ser reutilizáveis entre editais.

---

## Dashboard

### RN-035 – Dashboard do Administrador

No dashboard do usuário administrador devem ser exibidas as seguintes métricas:

- Quantidade de usuários cadastrados;
    
- Novos usuários por período (dia, semana e mês);
    
- Quantidade de acessos à plataforma;
    
- Usuários ativos no período;
    
- Quantidade total de questões cadastradas;
    
- Quantidade total de conteúdos cadastrados;
    
- Quantidade total de flashcards cadastrados.

Administração

# RN-036 – Acesso Administrativo

Somente usuários com perfil de administrador poderão acessar o painel administrativo e realizar operações de cadastro, alteração ou remoção de dados pedagógicos.


# RN-037 – Identificação do Cadastro

Todo registro pedagógico deverá possuir:

Identificador único;
Data de criação;
Data de atualização;
Status do registro.

# RN-038 – Exclusão de Registros

Registros pedagógicos que possuam associação com histórico de alunos não deverão ser excluídos fisicamente.

Nesses casos, o registro deverá ser desativado ou arquivado, preservando seus dados para consulta histórica.


# RN-039 – Auditoria Administrativa

Alterações realizadas em dados pedagógicos deverão registrar:

Administrador responsável;
Data e hora;
Registro alterado;
Operação realizada.
Edital

# RN-040 – Estrutura do Edital

Um edital deverá possuir, no mínimo:

Nome;
Órgão;
Cargo;
Descrição;
Data de publicação;
Status;
Matérias associadas.

# RN-041 – Status do Edital

Um edital poderá possuir os seguintes estados:

Rascunho;
Publicado;
Arquivado.

Somente editais publicados poderão ser utilizados pelos alunos para geração de cronogramas.

# RN-042 – Associação de Matérias ao Edital

Um edital deverá permitir a associação de múltiplas matérias.

A associação deverá permitir definir:

Matéria;
Ordem de exibição;
Tópicos pertencentes ao edital.

# RN-043 – Seleção de Tópicos do Edital

Ao associar uma matéria a um edital, o administrador poderá selecionar quais tópicos da matéria farão parte daquele edital.

A seleção não deverá alterar a estrutura original da matéria.


# RN-044 – Ordem das Matérias

A ordem das matérias dentro de um edital deverá ser definida pelo administrador.

A alteração dessa ordem não deverá alterar a ordem da matéria em outros editais.

# RN-053 – Estrutura do Conteúdo

Um conteúdo deverá possuir:

Título;
Tópico;
Tipo;
Descrição;
Status;
Ordem;
Data de criação;
Data de atualização.

# RN-054 – Tipos de Conteúdo

Na primeira versão, os conteúdos poderão possuir os seguintes tipos:

Texto;
PDF;
Vídeo;
Link.

# RN-055 – Conteúdo Escrito

Conteúdos do tipo texto deverão possuir um corpo textual persistido pelo sistema.


# RN-056 – Conteúdo Externo

Conteúdos do tipo vídeo ou link deverão possuir uma URL válida.


# RN-057 – Arquivo

Conteúdos do tipo PDF deverão possuir um arquivo associado.


# RN-058 – Ordem dos Conteúdos

Um tópico poderá possuir múltiplos conteúdos.

Cada conteúdo deverá possuir uma posição explícita para determinar sua ordem de apresentação.


# RN-059 – Publicação do Conteúdo

Um conteúdo poderá possuir os estados:

Rascunho;
Publicado;
Arquivado.

Somente conteúdos publicados deverão ser apresentados aos alunos.

Questões

# RN-060 – Estrutura da Questão

Uma questão deverá possuir:

Enunciado;
Tipo;
Alternativas;
Resposta correta;
Explicação/comentário;
Dificuldade;
Status;
Tópicos associados.

# RN-061 – Tipo da Questão

Na primeira versão, o sistema deverá suportar questões de múltipla escolha.

A estrutura deverá permitir a inclusão futura de outros tipos.


# RN-062 – Alternativas

Uma questão de múltipla escolha deverá possuir pelo menos duas alternativas.

Cada alternativa deverá possuir:

Texto;
Identificador;
Ordem;
Indicador de resposta correta.

# RN-063 – Resposta Correta

Uma questão de múltipla escolha deverá possuir exatamente uma alternativa correta.


# RN-064 – Explicação da Questão

Uma questão poderá possuir uma explicação apresentada ao aluno após sua resolução.


# RN-065 – Dificuldade

Uma questão poderá possuir um nível de dificuldade:

Fácil;
Médio;
Difícil.

# RN-066 – Status da Questão

Uma questão poderá possuir os estados:

Rascunho;
Publicada;
Arquivada.

Somente questões publicadas poderão ser utilizadas em tarefas.


# RN-067 – Associação com Tópicos

Uma questão poderá estar associada a múltiplos tópicos.

Essa associação deverá ser armazenada separadamente da questão.


# RN-068 – Questões Compartilhadas

A associação de uma questão a um novo tópico não deverá criar uma cópia da questão.

A mesma questão poderá ser utilizada em diferentes contextos pedagógicos.

Flashcards

# RN-069 – Estrutura do Flashcard

Um flashcard deverá possuir:

Frente;
Verso;
Tópico;
Status;
Data de criação;
Data de atualização.

# RN-070 – Status do Flashcard

Um flashcard poderá possuir os estados:

Rascunho;
Publicado;
Arquivado.

Somente flashcards publicados poderão ser utilizados em revisões.


# RN-071 – Associação com Tópico

Cada flashcard deverá estar associado a um tópico.


# RN-072 – Ordem dos Flashcards

Flashcards poderão possuir uma ordem de apresentação dentro de um tópico.

Cadastro e edição

Essas regras vão evitar bastante inconsistência no painel administrativo.


# RN-073 – Validação

O sistema deverá validar os campos obrigatórios antes de permitir a criação ou atualização de registros.


# RN-074 – Rascunho

O administrador poderá salvar registros incompletos como rascunho quando permitido pelo tipo de entidade.


# RN-075 – Publicação

Um registro somente poderá ser publicado quando todos os dados obrigatórios estiverem preenchidos e válidos.


# RN-076 – Alteração de Registro

A alteração de um registro não deverá modificar seu identificador.


# RN-077 – Preservação de Referências

Registros utilizados por outras entidades não deverão ser removidos de maneira que provoque referências inválidas.

Busca e listagem administrativa

Isso provavelmente vai aparecer já nas primeiras telas.


# RN-078 – Listagem

O painel administrativo deverá disponibilizar listagens para:

Editais;
Matérias;
Tópicos;
Conteúdos;
Questões;
Flashcards.

# RN-079 – Paginação

Listagens administrativas deverão possuir paginação para evitar carregamento de grandes quantidades de registros simultaneamente.


# RN-080 – Pesquisa

As entidades administrativas deverão permitir pesquisa textual pelos principais campos identificadores.


# RN-081 – Filtros

As listagens deverão permitir filtros compatíveis com a entidade, incluindo:

Status;
Tipo;
Matéria;
Tópico;
Dificuldade;
Edital.

# RN-082 – Ordenação

As listagens deverão permitir ordenação pelos campos relevantes.

Importação de questões

Como você já tinha previsto importação em massa, eu colocaria isso agora na documentação, mesmo que você não implemente hoje.


# RN-083 – Importação de Questões

O administrador poderá importar questões em lote utilizando arquivo estruturado.


# RN-084 – Validação da Importação

Antes da persistência definitiva, o sistema deverá validar todos os registros importados.

Registros inválidos deverão ser identificados e apresentados ao administrador.


# RN-085 – Importação Atômica

Na primeira versão, uma importação poderá ser realizada de forma que nenhum registro seja persistido caso existam erros de validação.


# RN-086 – Relatório de Importação

Após uma importação, o sistema deverá apresentar:

Quantidade de registros processados;
Quantidade de registros aceitos;
Quantidade de registros rejeitados;
Motivo dos erros.
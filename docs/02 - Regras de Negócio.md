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
# Levantamento de Requisitos — Conversa Inicial

## Cliente

**Empresa:** Civedit Concursos.
## Objetivo do produto

Desenvolver uma plataforma de estudos para concursos públicos, acessível via Web e Mobile, que concentre a organização dos estudos em um único lugar.
### Problemas identificados

- Alunos utilizam diversas ferramentas separadas.
- Dificuldade em manter o cronograma.
- Falta de acompanhamento do progresso.
- Esquecimento de revisões.
- Dificuldade em estudar para múltiplos editais.

---
# Estrutura do conteúdo

```text

Edital
└── Matéria
	└── Tópicos

```

- Existe um catálogo de matérias.
- Ao criar um edital, selecionam-se apenas os tópicos necessários.
- A matéria do edital pode ser uma cópia vinculada à matéria base para permitir customizações sem perder a referência original.
---

# Tipos de tarefas

- Estudo de conteúdo
- Resolução de questões
- Revisões (flashcards inicialmente)

Fluxo esperado:

1. Estudar conteúdo.
2. Resolver questões.
3. Revisar posteriormente por meio de flashcards.

---

# Conteúdo

Cada tópico possui:
- Conteúdo escrito (editor semelhante ao Word/Google Docs)
- Imagens
- Tabelas
- Links
- PDFs
- Vídeos
- Materiais complementares

Materiais complementares pertencem ao tópico e não são tarefas independentes.

---

  

# Progresso

O progresso é registrado separadamente para:

- Conteúdo
- Questões
- Revisões

O aluno pode:

- Interromper a leitura.
- Marcar onde parou.
- Registrar tempo estudado.
- Marcar o conteúdo como concluído.

---

# Questões

Inicialmente:

- Uma tarefa abre um conjunto fixo de questões.
- Apenas para tópicos cujo conteúdo já foi concluído.
- Quantidade fixa na primeira versão.

---

# Flashcards

Utilizados na etapa de revisão.
Cada flashcard possui:

- Frente
- Verso

Fluxo:

Conteúdo → Questões → Revisões (Flashcards)  

---
# Cronograma

O aluno informa:

- Dias da semana
- Horas disponíveis por dia

O sistema distribui automaticamente as tarefas.

---

# Tarefas atrasadas

Proposta inicial:

- Permanecem pendentes.
- Não reorganizam completamente o cronograma.
- Usuário pode reagendar manualmente.

---

# Revisões

- Espaçamento inicial padrão (ex.: 1 dia).
- Configurável futuramente.
- Permanecem pendentes caso não realizadas.  

---
  
# Alunos avançados


Possibilidade futura de:

- Pular conteúdo.
- Estudar apenas questões.
- Estudar apenas revisões.

Tabela de progresso:  

| Tópico | Conteúdo | Questões | Revisão |

|--------|----------|----------|----------|

| Posse | ✓ | ✓ | ✓ |

| Propriedade | ✓ | ☐ | ☐ |

---

# Atualizações de conteúdo

Novos tópicos:

- Notificar o aluno.
- Permitir adicionar agora, depois ou ao final do cronograma.

Tópicos removidos:

- Permanecem congelados para preservar histórico.  

---

# Interface
  
Objetivos:

- Simples.
- Intuitiva.
- Pouca configuração inicial.  

---

# Próximas entregas


- Documento de Visão
- Requisitos Funcionais
- Requisitos Não Funcionais
- Regras de Negócio
- Modelo de Domínio
- Protótipo navegável
- Fluxo do aluno

---

> Observação: este documento é um resumo da reunião de levantamento de requisitos entre o analista e o cliente fictício Civedit Educação.
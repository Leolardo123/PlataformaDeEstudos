## DA-001 – Arquitetura do Projeto

### Contexto

O projeto será desenvolvido como uma plataforma de estudos para concursos, composta por uma aplicação web separadas por escopo de atuação do usuário administrador e aluno, além de uma API responsável pelas regras de negócio e acesso aos dados.

O projeto possui como objetivo, além de atender às funcionalidades propostas, servir como projeto de estudo e portfólio, permitindo a aplicação de boas práticas de desenvolvimento, testes automatizados e organização de código.

### Decisão

O projeto será estruturado utilizando uma arquitetura modular, separando responsabilidades entre apresentação, regras de negócio, persistência e infraestrutura.

A aplicação será desenvolvida como um monorepo, permitindo manter frontend, backend e possíveis pacotes compartilhados no mesmo repositório.

### Justificativa

A utilização de uma estrutura modular facilita a manutenção e evolução do sistema, além de permitir que as diferentes aplicações compartilhem configurações, tipos e utilitários quando necessário.

O monorepo também simplifica o gerenciamento do projeto durante o desenvolvimento.

### Consequências

**Positivas:**

- Código relacionado ao projeto será mantido em um único repositório;
    
- Facilita o compartilhamento de tipos e configurações;
    
- Permite evolução independente dos módulos;
    
- Facilita a execução de ferramentas e processos comuns.
    

**Negativas:**

- O repositório possuirá maior complexidade inicial;
    
- Será necessário definir uma estrutura adequada para os diferentes projetos;
    
- Ferramentas de gerenciamento do monorepo poderão ser necessárias conforme o projeto crescer.
    

---

## DA-002 – Framework do Backend

### Contexto

O backend precisa fornecer uma API para a aplicação web e concentrar as regras de negócio da plataforma.

Foram consideradas diferentes alternativas dentro do ecossistema Node.js, incluindo NestJS e Fastify.

### Decisão

O backend utilizará **Fastify/Nestjs com TypeScript**.

A aplicação será estruturada de forma modular, separando responsabilidades entre rotas, serviços, acesso a dados e demais componentes necessários.

### Justificativa

O projeto possui escopo relativamente pequeno e não necessita, inicialmente, de todas as abstrações e convenções fornecidas por frameworks mais completos.

O Fastify permite manter uma aplicação enxuta, enquanto a organização arquitetural será definida pelo próprio projeto.

A decisão também permite aprofundar conhecimentos em arquitetura e desenvolvimento de APIs sem depender excessivamente das abstrações de um framework.

### Consequências

**Positivas:**

- Menor quantidade de abstrações;
    
- Maior controle sobre a arquitetura;
    
- Boa integração com o ecossistema TypeScript;
    
- Permite uma estrutura modular sem exigir um framework altamente opinativo.
    

**Negativas:**

- Algumas decisões arquiteturais precisarão ser definidas manualmente;
    
- Será necessário estabelecer convenções próprias para organização do backend;
    
- Algumas funcionalidades disponíveis diretamente em frameworks mais completos precisarão ser adicionadas separadamente.
    

---

## DA-003 – Banco de Dados

### Contexto

A plataforma possui dados relacionais, incluindo usuários, editais, matérias, tópicos, questões, tarefas, progresso e histórico.

### Decisão

Será utilizado **PostgreSQL** como banco de dados principal da aplicação.

### Justificativa

O modelo de dados da plataforma possui diversos relacionamentos entre entidades, tornando um banco de dados relacional adequado para representar a estrutura do sistema.

O PostgreSQL também permite utilizar recursos relacionais, índices, transações e restrições de integridade necessários para a aplicação.

### Consequências

**Positivas:**

- Suporte a relacionamentos complexos;
    
- Suporte a transações;
    
- Integridade referencial;
    
- Recursos avançados de consulta e indexação;
    
- Boa integração com o ecossistema Node.js.
    

**Negativas:**

- Maior necessidade de planejamento do modelo relacional;
    
- Alterações estruturais exigem gerenciamento das migrações do banco.
    

---

## DA-004 – ORM

### Contexto

O backend necessita de uma camada de acesso ao banco de dados que facilite a manipulação das entidades e a manutenção do modelo de dados.

### Decisão

Será utilizado **Prisma** como ORM.

### Justificativa

O Prisma possui integração com TypeScript e permite representar o modelo de dados de forma tipada, reduzindo a possibilidade de erros durante o desenvolvimento.

Também será utilizado para gerenciamento das migrações do banco de dados.

### Consequências

**Positivas:**

- Tipagem das consultas;
    
- Integração com TypeScript;
    
- Modelo de dados centralizado;
    
- Gerenciamento de migrações;
    
- Redução de SQL repetitivo em operações comuns.
    

**Negativas:**

- Cria dependência da abstração fornecida pelo ORM;
    
- Consultas muito específicas podem exigir utilização de recursos de SQL ou mecanismos específicos do Prisma.
    

---

## DA-005 – Armazenamento de Senhas

### Contexto

O sistema armazenará credenciais de usuários e não deverá manter senhas em texto puro.

### Decisão

As senhas serão armazenadas utilizando **Argon2id**.

Somente o hash resultante deverá ser persistido no banco de dados.

### Justificativa

Argon2id é apropriado para armazenamento de senhas e permite configurar parâmetros de custo computacional e uso de memória, tornando ataques de força bruta mais custosos.

### Consequências

**Positivas:**

- Senhas originais não são armazenadas;
    
- Proteção contra exposição direta das credenciais em caso de vazamento do banco;
    
- Permite ajustar o custo do hashing conforme a capacidade da infraestrutura.
    

**Negativas:**

- O processo de hashing possui custo computacional intencional;
    
- Os parâmetros utilizados deverão ser definidos e revisados conforme a infraestrutura.
    

---

## DA-006 – Estratégia de Testes

### Contexto

O projeto será desenvolvido com foco em qualidade e manutenção, utilizando testes automatizados durante o desenvolvimento.

### Decisão

A estratégia de testes será dividida em diferentes níveis:

- **Testes unitários**, para regras e componentes isolados;
    
- **Testes de integração**, para verificar a interação entre componentes e a API;
    
- **Testes end-to-end**, para validar os principais fluxos da aplicação.
    

### Justificativa

A divisão dos testes permite verificar diferentes níveis do sistema sem depender exclusivamente de testes end-to-end.

As regras de negócio poderão ser validadas de maneira rápida através de testes unitários, enquanto testes de integração e end-to-end poderão validar o comportamento do sistema como um todo.

### Consequências

**Positivas:**

- Maior confiança durante alterações no código;
    
- Detecção antecipada de regressões;
    
- Regras de negócio documentadas por meio de testes;
    
- Possibilidade de executar os testes automaticamente no processo de integração.
    

**Negativas:**

- Aumenta o tempo inicial de desenvolvimento;
    
- Os testes também precisam ser mantidos conforme o sistema evolui.
    

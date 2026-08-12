# 📚 Sistema de Gerenciamento de Estudos (Monorepo)

A proposta principal deste projeto é desenvolver um ecossistema robusto para o gerenciamento de estudos focado em **concurseiros**. 

Para aproximar o projeto de um cenário real, todo o levantamento de requisitos, histórico de decisões e regras de negócio foram baseados em um cliente fictício. Essa documentação completa está centralizada na pasta `docs`, estruturada como um "cofre" do **Obsidian**.

---

### 💡 Principais Referências de Produto
O design das funcionalidades e a experiência do usuário combinam as melhores práticas de plataformas de mercado:
* **Qconcursos:** Dinâmica de resolução de questões e simulados.
* **Trello & Notion:** Organização visual de cronogramas e anotações personalizadas.
* **Duolingo:** Gamificação para engajamento e constância diária nos estudos.

---

## 🏗️ Estrutura de Pastas

O repositório é gerenciado através do **Turborepo** com **pnpm Workspaces**, dividindo as responsabilidades de forma clara:

```text
├── docs/ # Documentação, cofre feito com obsidian
└── project/ # Local onde está instalado turborepo com o frontend e backend
    │
    ├── apps/
    │   ├── web-student/       # Aplicação Frontend Para o Aluno Acessar os Conteúdos e se Organizar
    │   ├── web-admin/         # Aplicação Frontend Para Gerenciar Conteúdos e Alunos
    │   └── api/               # Backend / API RESTful (NestJS)
    │
    ├── packages/
    │   ├── ui/                # Componentes de interface compartilhados (Design System)
    │   ├── typescript-config/ # Configurações globais do TypeScript
    │   └── eslint-config/     # Regras de padronização de código
    │
    ├── turbo.json             # Pipeline de builds e cache do Turborepo
    ├── pnpm-workspace.yaml    # Configuração dos workspaces do pnpm
    └── README.md              # Documentação principal do projeto
```

---

## 🛠️ Tecnologias Utilizadas

* **Monorepo:** Turborepo, pnpm Workspaces
* **Frontend:** Next.js, TypeScript, TailwindCSS
* **Backend:** NestJS, TypeScript, Fastify
* **Documentação:** Obsidian

---

## 🚀 Como Executar o Projeto

1. **Instalar Dependências** (Rode sempre na raiz do projeto):
   ```bash
   pnpm install
   ```

2. **Executar em Modo de Desenvolvimento**:
   ```bash
   pnpm dev
   ```
   *Este comando iniciará todos os aplicativos dentro de project/apps em paralelo de forma inteligente utilizando o cache do Turbo.*

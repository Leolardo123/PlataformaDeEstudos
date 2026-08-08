## Segurança

### RNF-SEC-001 – Armazenamento de Senhas

As senhas dos usuários não deverão ser armazenadas em texto puro.

O sistema deverá utilizar um algoritmo de hashing apropriado para armazenamento seguro de credenciais.

**Critério de aceitação:**

- A senha original não deverá ser armazenada no banco de dados.
- O sistema deverá armazenar apenas o hash da senha.
- O algoritmo utilizado deverá possuir mecanismo de proteção contra ataques de força bruta.

> **Decisão técnica:** A implementação utilizará Argon2id para o hashing das senhas.

**Justicativa**: 
O algoritmo do Argon2id permite gerar um hash que force o atacante a utilizar um poder computacional inviável, a um custo de implementação baixo.

### RNF-SEC-002 – Autenticação

O acesso às funcionalidades restritas do sistema deverá exigir autenticação válida.

**Critério de aceitação:**

- Usuários não autenticados não poderão acessar funcionalidades que exijam autenticação.
- A sessão ou credencial de autenticação deverá possuir mecanismo de expiração ou invalidação.
- O sistema deverá rejeitar credenciais inválidas.

### RNF-SEC-003 – Autorização

O sistema deverá controlar o acesso às funcionalidades de acordo com o perfil do usuário.

**Critério de aceitação:**

- Usuários deverão possuir permissões compatíveis com seu perfil.
- Um aluno não poderá acessar funcionalidades exclusivas do administrador.
- A API deverá validar as permissões independentemente das restrições existentes na interface.
  
  ---

## Performance

### RNF-PERF-001 – Tempo de Resposta

A API deverá responder às requisições dentro de um tempo adequado para proporcionar uma experiência fluida ao usuário.

**Critério de aceitação:**

- Operações comuns deverão possuir tempo de resposta inferior a 500 ms em condições normais de utilização.
- Operações que envolvam processamento mais complexo poderão possuir limites superiores, definidos conforme a necessidade.
- Requisições que ultrapassem o limite definido deverão ser identificáveis por meio dos mecanismos de registro e monitoramento do sistema.

> **Observação:** Os limites poderão ser revisados após a realização de testes de desempenho.

### RNF-PERF-002 – Paginação

Listagens que possam retornar uma quantidade elevada de registros deverão utilizar paginação.

**Critério de aceitação:**

- A API não deverá retornar todos os registros de uma coleção sem limite.
- O cliente deverá poder solicitar páginas subsequentes.
- A quantidade máxima de registros retornados por requisição deverá possuir um limite definido pela API.

---

## Confiabilidade

### RNF-REL-001 – Integridade dos Dados

O sistema deverá preservar a integridade dos dados durante operações que envolvam múltiplas alterações relacionadas.

**Critério de aceitação:**

- Operações que dependam de múltiplas alterações deverão ser executadas de maneira consistente.
- Em caso de falha durante uma operação transacional, os dados não deverão permanecer em um estado parcialmente atualizado.
- Relacionamentos entre entidades deverão respeitar as restrições definidas pelo sistema.

---

## Manutenibilidade

### RNF-MAN-001 – Modularidade

O sistema deverá possuir uma estrutura modular que permita a evolução de funcionalidades sem alterações desnecessárias em módulos não relacionados.

**Critério de aceitação:**

- As funcionalidades deverão ser organizadas de acordo com seus respectivos domínios.
- Regras de negócio não deverão depender diretamente de detalhes de implementação da interface.
- A alteração de uma funcionalidade deverá possuir impacto limitado aos módulos relacionados.

### RNF-MAN-002 – Testabilidade

As funcionalidades críticas do sistema deverão possuir testes automatizados.

**Critério de aceitação:**

- Regras de negócio importantes deverão possuir testes automatizados.
- Endpoints críticos da API deverão possuir testes de integração.
- Os principais fluxos de utilização deverão possuir testes automatizados de ponta a ponta.
- Os testes deverão poder ser executados automaticamente durante o processo de desenvolvimento e integração.

---

## Usabilidade

### RNF-USAB-001 – Responsividade

A interface deverá adaptar-se a diferentes tamanhos de tela.

**Critério de aceitação:**

- A plataforma deverá ser utilizável em dispositivos desktop.
- A plataforma deverá ser utilizável em dispositivos móveis.
- Os elementos da interface não deverão apresentar sobreposição ou perda de conteúdo em resoluções suportadas.

### RNF-USAB-002 – Feedback ao Usuário

O sistema deverá informar ao usuário o resultado das operações realizadas.

**Critério de aceitação:**

- Operações concluídas com sucesso deverão apresentar feedback adequado.
- Erros deverão apresentar uma mensagem compreensível ao usuário.
- O sistema deverá indicar quando uma operação estiver sendo processada quando houver possibilidade de demora perceptível.

---

## Observabilidade

### RNF-OBS-001 – Registro de Erros

Erros inesperados ocorridos durante a execução do sistema deverão ser registrados para permitir análise e diagnóstico.

**Critério de aceitação:**

- Erros inesperados da API deverão ser registrados.
- Os registros deverão conter informações suficientes para identificar o contexto do erro.
- Informações sensíveis, como senhas e credenciais, não deverão ser registradas.
- Os registros deverão permitir identificar a operação que originou o erro.

---

## Compatibilidade

### RNF-COMP-001 – Compatibilidade com Navegadores

A aplicação web deverá ser compatível com as versões recentes dos principais navegadores utilizados pelos usuários.

**Critério de aceitação:**

- Chrome;
- Firefox;
- Edge;
- Safari.

### RNF-COMP-002 – API

A API deverá utilizar padrões HTTP e formatos de comunicação amplamente suportados pelos clientes da aplicação.

**Critério de aceitação:**

- A API deverá utilizar HTTP/HTTPS.
- Os dados deverão ser transmitidos utilizando JSON, salvo quando outro formato for necessário.
- Os códigos de status HTTP deverão representar adequadamente o resultado das requisições de acordo com as convenções estabelecidas previamente.
# Roteiro de user story
## Checklist
1. [ ] Repasse de estória :company: e confirmação
2. [ ] Implementação
3. [ ] Execução dos testes automatizados
4. [ ] Code Review
5. [ ] Validação em Dupla (Funcional)

## Checklist Geral
### Padrões de código
- [ ] Métodos iniciam com letra maiúscula
- [ ] Nome dos métodos estão no infinitivo
- [ ] Há adoção de nomes significativos que contenham a função da variável ou do método
- [ ] Os parâmetros de entrada são claros em sua usabilidade nos métodos
- [ ] Métodos e/ou funções executam apenas uma função (responsabilidade única)
- [ ] A comunicação com serviços e/ou recursos **externos** ocorre na camada de infraestrutura
- [ ] As datas/horas estão usando padrão UTC 

### SonarQube
- [ ] Os testes unitários estão cobrindo em pelo menos 80% as camadas de serviços?
- [ ] Todos os apontamentos do SonarQube foram resolvidos?

### Testes
- Foram realizados testes ***unitários*** para simular:
- Casos de sucesso
- Casos de erro relacionados às validações
- Casos de erro retornado pelos serviços
- Foram realizados testes ***de integração*** para simular:
- Casos de sucesso

### Bugs
- [ ] O detalhe do bug foi corretamente descrito?

## Checklist Aprovador
### Código
- [ ] O padrão de codificação da dti foi seguido
- [ ] Não existem lógicas de negócio desenvolvidas nos métodos dos controladores
- [ ] As responsabilidades foram corretamente atribuídas nos objetos de negócio

### Testes automatizados
- [ ] Os testes automatizados foram construídos passando todos os cenários?
- [ ] Os testes automatizados desenvolvidos são assertivos?
- [ ] Foram desenvolvidos testes de integração que contemplam cenários felizes (caso necessário)?

const urlFront = 'http://localhost:4200'
const emailTeste = 'teste@teste.com';
const senhaTeste = 'senha123';

const preencherSenhaEmail = (email = emailTeste, senha = senhaTeste) => {
  cy.get('[data-cy="icone-logar"]').click();
  cy.get('[data-cy="login-input-email"]').type(email);
  cy.get('[data-cy="login-input-senha"]').type(senha);
}

export const logar = (email = emailTeste, senha = senhaTeste) => {
  preencherSenhaEmail(email, senha);
  cy.get('[data-cy="login-bt-entrar"]').click();
  cy.wait(1000);
}

describe('Login', () => {

  it('Deve receber mensagem de formato de email inválido', () => {
    cy.visit(urlFront);
    preencherSenhaEmail('emailinvalido', senhaTeste);
    cy.get('[data-cy="login-input-email-error"]')
      .should('exist')
      .and('have.text', 'Formato inválido. Exemplo: teste@gmail.com')
  });

  it('Deve receber mensagem de senha incorreta', () => {
    cy.visit(urlFront);
    logar(emailTeste, 'senhainvalida');
    cy.get('[data-cy="login-input-pass-error"]')
      .should('exist')
      .and('have.text', 'A senha digitada está incorreta')
  });

  it('Deve ter acesso ao menu da sidebar à esquerda no topo', () => {
    cy.visit(urlFront);
    logar(emailTeste, senhaTeste);
    cy.get('[data-cy="icone-sidebar"]').should('be.visible');
  });
});

describe('Logoff', () => {

  it('Login bem sucedido', () => {
    cy.visit(urlFront);
    logar(emailTeste, senhaTeste);
    cy.get('[data-cy="icone-sair"]').click();
    cy.get('[data-cy="icone-sidebar"]').should('not.exist');
  });
});


import {routesFrontend} from "../../src/shared/constants/routes-frontend";

const urlFront = 'http://localhost:4200'
const produtoId = '5f67f2ff3170bd28c001257c';

describe('Comprar produto', () => {

  it('Redirecionar para tela de login', () => {
    cy.visit(`${urlFront}/produto/${produtoId}`);
    cy.get('[data-cy="produto-bt-comprar"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.contains(routesFrontend.loginEnter));
  });
});

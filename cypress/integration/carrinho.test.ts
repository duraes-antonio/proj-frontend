const urlFront = 'http://localhost:4200'
const produtoId = '5f67f2ff3170bd28c001257c';

const adicionarProdutoAoCarrinho = (id = produtoId) => {
  cy.visit(`${urlFront}/produto/${id}`);
  cy.get('[data-cy="carrinho-numero-produtos"]')
    .children('.mat-badge-content')
    .should('not.be.visible');
  cy.get('[data-cy="produto-bt-adicionar-carrinho"]').click();
  cy.get('[data-cy="carrinho-numero-produtos"]')
    .children('.mat-badge-content')
    .should('have.text', '1')
    .and('be.visible');
};

describe('Gerenciar carrinho', () => {

  it('Deve adicionar o produto no carrinho', () => adicionarProdutoAoCarrinho(produtoId));

  it('Deve remover o produto do carrinho', () => {
    adicionarProdutoAoCarrinho(produtoId);
    cy.get('[data-cy="carrinho-numero-produtos"]')
      .children('.mat-badge-content')
      .should('have.text', '1')
      .and('be.visible');
    cy.get('[data-cy="produto-bt-remover-carrinho"]').click();
    cy.get('[data-cy="carrinho-numero-produtos"]')
      .children('.mat-badge-content')
      .should('not.be.visible');
  });
});

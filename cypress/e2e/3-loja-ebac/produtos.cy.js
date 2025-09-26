/// <reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {
    
    beforeEach(() => {
        produtosPage.visitarUrl()
    });

    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Abominable Hoodie')
        cy.get('#tab-title-description > a').should('exist')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Abominable Hoodie'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('exist')
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('Aero-Daily-Fitness-Tee')
        cy.get('.product_title').should('exist')
    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 5
        produtosPage.buscarProduto('Helena Hooded Fleece')
        produtosPage.addProdutoCarrinho('M', 'Blue', qtd)

        cy.get('.woocommerce-message').should('exist')
    });

    it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
        
        produtosPage.buscarProduto(dados[1].nomeProduto)
        produtosPage.addProdutoCarrinho(
            dados[1].tamanho, 
            dados[1].cor, 
            dados[1].quantidade)

        cy.get('.woocommerce-message').should('exist')
        })
    });

});
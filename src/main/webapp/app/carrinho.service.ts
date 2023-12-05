/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private carrinho: any[] = [];

  adicionarItemAoCarrinho(item: any) {
    this.carrinho.push(item);
    this.salvarCarrinhoNoLocalStorage();
  }

  removerItemDoCarrinho(index: number) {
    this.carrinho.splice(index, 1);
    this.salvarCarrinhoNoLocalStorage();
  }

  obterCarrinho() {
    return this.carrinho;
  }

  private salvarCarrinhoNoLocalStorage() {
    sessionStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  }
}

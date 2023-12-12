/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from './service/carrinho.service';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carrinho: any[] = [];
  total: number = 0;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit() {
    this.atualizarCarrinhoETotal();
  }

  obterCarrinho() {
    this.carrinho = this.carrinhoService.obterCarrinho();
  }

  adicionarItem(item: any) {
    this.carrinhoService.adicionarItemAoCarrinho(item.item);
    this.atualizarCarrinhoETotal(); // Atualiza a lista e o total após remover
  }

  removerItem(item: any) {
    this.carrinhoService.removerItemDoCarrinho(item.item.id.toString());
    this.atualizarCarrinhoETotal(); // Atualiza a lista e o total após remover
  }
  calcularTotal() {
    this.total = this.carrinhoService.calcularTotal();
  }
  private atualizarCarrinhoETotal() {
    this.obterCarrinho();
    this.calcularTotal();
  }
}

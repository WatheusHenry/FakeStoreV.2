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

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit() {
    this.obterCarrinho();
  }

  obterCarrinho() {
    this.carrinho = this.carrinhoService.obterCarrinho();
    console.log(this.carrinho);
  }
  console() {
    return console.log(this.carrinho);
  }
}

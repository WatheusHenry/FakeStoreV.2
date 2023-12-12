/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { UserService } from 'app/entities/user/user.service';
import { IUser } from './../../entities/user/user.model';
import { Injectable } from '@angular/core';

interface CarrinhoItem {
  item: any;
  quantidade: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private userCart: Record<string, Record<string, CarrinhoItem>> = {};

  constructor(private userService: UserService) {
    const userId = this.identificarUsuario();
    const carrinhoArmazenado = sessionStorage.getItem(`carrinho_${userId}`);
    this.userCart[userId] = carrinhoArmazenado ? JSON.parse(carrinhoArmazenado) : {};
  }

  adicionarItemAoCarrinho(item: any) {
    const userId = this.identificarUsuario();
    const itemId = this.obterItemId(item);

    if (!this.userCart[userId][itemId]) {
      this.userCart[userId][itemId] = { item, quantidade: 0 };
    }

    this.userCart[userId][itemId].quantidade++;
    this.salvarCarrinhoNoStorage(userId);
  }

  removerItemDoCarrinho(itemId: string) {
    const userId = this.identificarUsuario();

    if (this.userCart[userId][itemId]) {
      this.userCart[userId][itemId].quantidade--;

      if (this.userCart[userId][itemId].quantidade === 0) {
        delete this.userCart[userId][itemId];
      }

      this.salvarCarrinhoNoStorage(userId);
    }
  }

  obterCarrinho() {
    const userId = this.identificarUsuario();
    return Object.values(this.userCart[userId] || {});
  }

  identificarUsuario(): number {
    // Implemente a lógica para obter o identificador do usuário, por exemplo, a partir de um serviço de autenticação.
    // Este é um exemplo simplificado, substitua por sua implementação real.
    const usuarioExemplo: IUser = { id: 3 };
    return this.userService.getUserIdentifier(usuarioExemplo);
  }

  limparCarrinho() {
    const userId = this.identificarUsuario();
    this.userCart[userId] = {};
    this.salvarCarrinhoNoStorage(userId);
    sessionStorage.removeItem(`carrinho_${userId}`);
  }

  calcularTotal(): number {
    const userId = this.identificarUsuario();
    const carrinhoItens = Object.values(this.userCart[userId] || {});

    return carrinhoItens.reduce((total, item) => {
      return total + item.quantidade * item.item.price;
    }, 0);
  }

  private salvarCarrinhoNoStorage(userId: number) {
    sessionStorage.setItem(`carrinho_${userId}`, JSON.stringify(this.userCart[userId]));
  }

  private obterItemId(item: any): string {
    // Implemente a lógica para obter um ID único para o item.
    // Este é um exemplo simplificado, substitua por sua implementação real.
    return item.id.toString();
  }
}

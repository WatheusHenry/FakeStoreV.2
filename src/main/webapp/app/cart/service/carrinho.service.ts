/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { UserService } from 'app/entities/user/user.service';
import { IUser } from './../../entities/user/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private userCarts: Record<string, any[]> = {};

  constructor(private userService: UserService) {
    const userId = this.identificarUsuario();
    const carrinhoArmazenado = sessionStorage.getItem(`carrinho_${userId}`);
    this.userCarts[userId] = carrinhoArmazenado ? JSON.parse(carrinhoArmazenado) : [];
  }

  adicionarItemAoCarrinho(item: any) {
    const userId = this.identificarUsuario();
    this.userCarts[userId].push(item);
    this.salvarCarrinhoNoStorage(userId);
  }

  removerItemDoCarrinho(index: number) {
    const userId = this.identificarUsuario();
    this.userCarts[userId].splice(index, 1);
    this.salvarCarrinhoNoStorage(userId);
  }

  obterCarrinho() {
    const userId = this.identificarUsuario();
    return this.userCarts[userId];
  }

  identificarUsuario(): number {
    // Implemente a lógica para obter o identificador do usuário, por exemplo, a partir de um serviço de autenticação.
    // Este é um exemplo simplificado, substitua por sua implementação real.
    const usuarioExemplo: IUser = { id: 3 };
    return this.userService.getUserIdentifier(usuarioExemplo);
  }

  private salvarCarrinhoNoStorage(userId: number) {
    sessionStorage.setItem(`carrinho_${userId}`, JSON.stringify(this.userCarts[userId]));
  }
}

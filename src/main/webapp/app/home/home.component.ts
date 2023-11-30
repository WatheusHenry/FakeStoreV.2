import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { AccountService } from 'app/core/auth/account.service';
import { ProductService } from 'app/entities/product/service/product.service';

import { Account } from 'app/core/auth/account.model';
import { IProduct } from 'app/entities/product/product.model';

@Component({
  standalone: true,
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [SharedModule, RouterModule],
})
export default class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  products: IProduct[] = [];
  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProductData();
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadProductData(): void {
    this.productService.query().subscribe(
      res => {
        // Aqui você pode fazer o que quiser com os dados de produtos
        this.products = res.body ?? [];
      },
      error => {
        // Lide com erros, se necessário
        console.error('Erro ao carregar dados de produtos:', error);
      },
    );
  }
}

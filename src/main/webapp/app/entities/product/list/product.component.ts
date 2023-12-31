/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';

import HasAnyAuthorityDirective from 'app/shared/auth/has-any-authority.directive';

import SharedModule from 'app/shared/shared.module';
import { SortDirective, SortByDirective } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { SortService } from 'app/shared/sort/sort.service';
import { IProduct } from '../product.model';
import { EntityArrayResponseType, ProductService } from '../service/product.service';
import { ProductDeleteDialogComponent } from '../delete/product-delete-dialog.component';
import axios from 'axios';

@Component({
  standalone: true,
  selector: 'jhi-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],

  imports: [
    RouterModule,
    HasAnyAuthorityDirective,
    FormsModule,
    SharedModule,
    SortDirective,
    SortByDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
  ],
})
export class ProductComponent implements OnInit {
  isLoading = false;
  products: any[] = []; // Sua lista de produtos
  productsImgs: any[] = []; // Sua lista de produtos
  itemsPerPage: number = 12;
  currentPage: number = 1;
  predicate = 'id';
  ascending = true;
  searchTerm: string = '';

  constructor(
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal,
  ) {}

  trackId = (_index: number, item: IProduct): number => this.productService.getProductIdentifier(item);

  ngOnInit(): void {
    this.load();
    this.loadProducts();
  }
  search(): void {
    // Execute a pesquisa somente se houver um termo de pesquisa
    if (this.searchTerm.trim() !== '') {
      // Filtra os produtos localmente com base no termo de pesquisa
      this.products = this.filterProducts(this.products, this.searchTerm);
    } else {
      // Se o termo de pesquisa estiver vazio, execute a consulta padrão
      this.load();
    }
  }

  loadProducts(): void {
    // Substitua esta chamada fictícia pela lógica real para obter produtos do seu backend
    // Exemplo fictício de chamada à API Lorem Picsum para obter URLs de imagens aleatórias
    axios
      .get('https://picsum.photos/v2/list?page=1&limit=30')
      .then(response => {
        // Extrai apenas as URLs das imagens
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        this.productsImgs = response.data.map((imageInfo: any) => imageInfo.download_url);
      })
      .catch(error => {
        console.error('Erro ao carregar produtos:', error);
      });
  }

  delete(product: IProduct): void {
    const modalRef = this.modalService.open(ProductDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.product = product;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations()),
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }
  // Método para obter a lista de produtos para a página atual
  getDisplayedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  getPages(): number[] {
    const pageCount = Math.ceil(this.products.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  onNextPage(): void {
    if (this.currentPage < this.getPages().length) {
      this.currentPage++;
    }
  }

  // Método para retroceder uma página
  onPrevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  private filterProducts(products: IProduct[], searchTerm: string): IProduct[] {
    // Converte o termo de pesquisa para minúsculas para uma comparação sem distinção entre maiúsculas e minúsculas
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filtra os produtos com base no termo de pesquisa
    return products.filter(
      product =>
        // Você pode ajustar essa lógica de filtro conforme necessário
        // Aqui, estamos verificando se o nome ou outra propriedade do produto contém o termo de pesquisa
        product.name?.toLowerCase().includes(lowerCaseSearchTerm),
      // Adicione mais condições conforme necessário
    );
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.predicate, this.ascending)),
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.products = this.refineData(dataFromBody);
  }

  protected refineData(data: IProduct[]): IProduct[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IProduct[] | null): IProduct[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.productService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}

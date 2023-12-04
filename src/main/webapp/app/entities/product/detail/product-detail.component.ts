import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import HasAnyAuthorityDirective from 'app/shared/auth/has-any-authority.directive';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IProduct } from '../product.model';

@Component({
  standalone: true,
  selector: 'jhi-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [SharedModule, HasAnyAuthorityDirective, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ProductDetailComponent {
  @Input() product: IProduct | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}

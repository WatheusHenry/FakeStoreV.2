import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'app/entities/user/user.service';
// import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';
import { OrderService } from '../service/order.service';
import { IOrder } from '../order.model';
import { OrderFormService, OrderFormGroup } from './order-form.service';
import { IUser } from 'app/admin/user-management/user-management.model';

@Component({
  standalone: true,
  selector: 'jhi-order-update',
  templateUrl: './order-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OrderUpdateComponent implements OnInit {
  isSaving = false;
  order: IOrder | null = null;
  orderStatusValues = Object.keys(OrderStatus);

  customersSharedCollection: IUser[] = [];

  editForm: OrderFormGroup = this.orderFormService.createOrderFormGroup();

  constructor(
    protected orderService: OrderService,
    protected orderFormService: OrderFormService,
    protected customerService: CustomerService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareCustomer = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ order }) => {
      this.order = order;
      if (order) {
        this.updateForm(order);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const order = this.orderFormService.getOrder(this.editForm);
    if (order.id !== null) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(order: IOrder): void {
    this.order = order;
    this.orderFormService.resetForm(this.editForm, order);

    this.customersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.customersSharedCollection, order.customer);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((customers: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(customers, this.order?.customer)))
      .subscribe((customers: IUser[]) => (this.customersSharedCollection = customers));
  }
}

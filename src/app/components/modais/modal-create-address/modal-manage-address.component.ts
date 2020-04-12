import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Address, AddressAdd} from '../../../models/address';
import {State} from '../../../models/state';
import {states} from '../../../../shared/constants/states-brazil';
import {AddressService} from '../../../services/address.service';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {masks} from '../../../../shared/input-masks/maskFunctions';
import {addressSizes} from '../../../../shared/constants/fieldSize';
import {Observable} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';
import {util} from '../../../../shared/utilFunctions';

@Component({
  selector: 'app-modal-create-address',
  templateUrl: './modal-manage-address.component.html',
  styleUrls: ['./modal-manage-address.component.scss']
})
export class ModalManageAddressComponent implements OnInit {

  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter<Address>();
  readonly sizes = addressSizes;
  readonly getMsg = getMsgFront;
  readonly addressFormGroup = new FormGroup({
    zipCode: new FormControl(this.data.address?.zipCode, [validators.cepValidator()]),
    number: new FormControl(
      this.data.address?.number,
      [validators.numberValidator(this.sizes.numberMin, this.sizes.numberMax, true)]
    ),
    street: new FormControl(
      this.data.address?.street,
      [validators.textValidator(this.sizes.streetMax)]
    ),
    neighborhood: new FormControl(
      this.data.address?.neighborhood,
      [validators.textValidator(this.sizes.neighborhoodMax)]
    ),
    city: new FormControl(
      this.data.address?.city,
      [validators.textValidator(this.sizes.cityMax)]
    ),
    state: new FormControl(
      this.data.address?.state,
      [validators.textValidator(this.sizes.stateMax)]
    )
  });
  readonly title = `${this.data.address ? 'Edite' : 'Registre'} seu endereço`;
  readonly desc = 'Preencha e confira os dados de seu endereço abaixo';
  readonly btnCancelTitle = 'Cancelar';
  readonly btnActionTitle = this.data.address ? 'Editar endereço' : 'Registrar endereço';
  filteredStates?: Observable<State[]>;
  private readonly _states: State[] = states;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IModalManageAddressData,
    private readonly _addressServ: AddressService
  ) {
  }

  static getConfig(data: IModalManageAddressData): MatDialogConfig {
    return {
      data: data,
      maxHeight: '100vh',
      maxWidth: '650px',
    };
  }

  ngOnInit(): void {
    this.filteredStates = this.addressFormGroup.controls['state'].valueChanges
      .pipe(
        startWith(''),
        map((term: string) => this._filterState(term, this._states))
      );
  }

  formatCEP(eTarget: any): void {
    eTarget.value = masks.cep(eTarget.value);
    if (this.addressFormGroup.controls['zipCode'].valid) {
      this.loadAddress(this.addressFormGroup.controls['zipCode'].value);
    }
  }

  formatNumber(eTarget: any): void {
    eTarget.value = masks.numberInteger(eTarget.value);
  }

  loadAddress(CEP: string): void {
    this._addressServ.getFromViaCEP(CEP)
      .pipe(take(1))
      .subscribe((address: AddressAdd) => {
        Object.keys(address).forEach(key => {
          this.addressFormGroup.controls[key].setValue(Reflect.get(address, key));
        });
      });
  }

  saveAddress(): void {

    if (this.addressFormGroup.invalid) {
      return;
    }

    // Se o endereço já existir, save-o; senão, crie-o
    if (this.data.address) {
      this._addressServ.patch(util.getPatchFromFormGroup(this.data.address, this.addressFormGroup))
        .pipe(take(1))
        .subscribe();
    } else {
      const prom = this._addressServ.post(util.getObjectFromFormGroup(this.addressFormGroup))
        .subscribe((re) => console.log(re));
      console.log(prom);
    }
  }

  private _filterState(term: string, stateList: State[]): State[] {
    return util.filterByText<State>(term, stateList, (obj) => obj.initials);
  }
}

export interface IModalManageAddressData {
  address?: Address;
}

'use strict';
export interface AddressAdd {
  readonly street: string;
  readonly number?: number;
  readonly zipCode: string;
  readonly neighborhood: string;
  readonly city: string;
  readonly state: string;
}

export interface Address extends AddressAdd {
  readonly id: string;
  readonly userId: string;
}

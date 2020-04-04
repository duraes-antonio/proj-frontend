'use strict';

export interface AddressAdd {
  readonly street: string;
  readonly number: number;
  readonly zipCode: string;
  readonly neighborhood: string;
  readonly city: string;
  readonly state: string;
}

/*TODO: Converter para interface após utilizar serviço*/
export class Address implements AddressAdd {
  readonly id: number;
  readonly street: string;
  readonly number: number;
  readonly zipCode: string;
  readonly neighborhood: string;
  readonly city: string;
  readonly state: string;
  readonly userId: string;

  constructor(
    number: number, zipcode: string, street: string, neigborhood: string,
    city: string, state: string, id = 0) {
    this.number = number;
    this.zipCode = zipcode;
    this.street = street;
    this.neighborhood = neigborhood;
    this.city = city;
    this.state = state;
    this.id = id;
    this.userId = '';
  }
}

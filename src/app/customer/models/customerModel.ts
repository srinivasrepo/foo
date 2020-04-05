export class CustomerSearchModel{
    customerName:string;
    statusID:number;
    customerType:string;
    pageIndcustomerTypeex:number;
    pageSize:number = 10;
}

export class CustomerchangeStatusModel{
    code:string="CUSTOMERS";
    encID:string;
}

export class CustomerViewModel{
customerName:string;
customerCode:string;
customerType:string;
status:string;
customerTypeID:number;
assignedProducts:Array<string>;
addressList:Array<CustomerViewAddressListModel>=[];
}

export class CustomerViewAddressListModel{
    addressID:number;
    address:string;
    country:number;
    countryName:string;
    state:string;
    city:string;
    zip:string
}

export class CustomerAddressListModel{
    addressID:number;
    address:string;
    country:number;
    countryName:string;
    state:string;
    city:string;
    zip:string;
}
export class ManageCustomerModel{
    customerID: number;
    encCustomerID: string;
    customerName: string;
    customerType: number;
    List: Array<CustomerAddressListModel>=[];
  }
export class SearchProductModel{
    product	:string;
    statusID :number;	
    pageIndex :number;	
    pageSize :number;   
}

export class StatusDetailsModel{
  public static  code:string="PROD";
}

export class ChangeStatusModel{
 code:string="PRODUCTS";
 encID:string;
}

export class ManageProductModel{
  productName:string;
  productCost:number;
  description:string;
  encProductID:string;
}

export class ViewProductModel{
  productName:string;
  productCost:number;
  status:string;
  description:string;
  productCode:string
}
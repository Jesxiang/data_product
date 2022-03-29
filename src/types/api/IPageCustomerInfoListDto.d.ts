declare namespace KtApi {
    
    type IPageCustomerInfoListDto = {    
        
        current:number    
        
        pages:number    
        
        records?:Array<CustomerInfoListDto>    
        
        searchCount:boolean    
        
        size:number    
        
        total:number    
    }
}

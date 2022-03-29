declare namespace KtApi {
    
    type CustomerInfoDetailDto = {    
        //客户基础信息
        customerInfo?:CustomerInfo    
        //顾客价值分析
        customerValue?:CustomerValueDto    
        //用户标签
        label?:Array<CustomerLabelDto>    
        //汽车信息
        vehicleInfo?:Array<VehicleInfo>    
    }
}

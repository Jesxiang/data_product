declare namespace KtApi {
    
    /**
     * 客户管理列表
     */
    type CustomerInfoListDto = {    
        //车牌号
        carPlateNum:string    
        //客户编号
        customerNum:number    
        //客户标签
        labelValue:string    
        //客户等级
        level:string    
        //匹配结果
        matchingResult:string    
        //客户名称
        name:string    
        //联系方式
        phone:string    
    }
}

declare namespace KtApi {
    
    /**
     * 查询客户标签
     */
    type QueryLabelDto = {    
        //标签值
        label?:Array<LabelValueDto>    
        //标签名
        labelName:string    
        //标签ID
        value:number    
    }
}

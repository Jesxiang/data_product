declare namespace KtApi {
    
    /**
     * 导入客户标签分类
     */
    type ImportLabelClassifyDto = {    
        //标签
        label?:Array<ImportLabelDto>    
        //标签ID
        labelId:number    
        //分类名
        labelName:string    
    }
}

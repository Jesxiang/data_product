declare namespace KtApi {
    
    /**
     * 导入客户标签分类
     */
    type QueryLabelClassifyDto = {    
        //标签
        label?:Array<QueryLabelDto>    
        //分类名
        labelName:string    
        //id
        value:number    
    }
}

declare namespace KtApi {
    
    /**
     * 标签详情
     */
    type LabelDetailDto = {    
        //标签统计
        count?:Array<LabelCountDetailDto>    
        //计算时间
        countTime:string    
        //是否展示 1 是 0否
        isShow:number    
        //标签描述
        labelDescribe:string    
        //下载用户列表查询条件
        labelList?:Array<DownCustomerDto>    
        //标签分类名称
        labelName:string    
        //更新规则
        updateRule:string    
    }
}

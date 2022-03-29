declare namespace KtApi {
    
    /**
     * 标签历史统计
     */
    type LabelCountHistoryDto = {    
        //统计值
        historyValue?:Array<LabelCountHistoryDetailDto>    
        //标签值
        labelName:string    
    }
}

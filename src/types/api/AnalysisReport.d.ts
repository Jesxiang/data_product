declare namespace KtApi {
    
    /**
     * 分析报告
     */
    type AnalysisReport = {    
        //生成日期
        createDate:string    
        //唯一id
        id:string    
        //车场ID
        lotId:string    
        //月(yyyy-MM)
        month:string    
        //备注
        remark:string    
        //报告数据
        reportData:string    
        //报告名称
        reportName:string    
        //年(yyyy)
        year:string    
    }
}

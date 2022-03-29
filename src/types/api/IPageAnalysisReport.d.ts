declare namespace KtApi {
    
    type IPageAnalysisReport = {    
        
        current:number    
        
        pages:number    
        
        records?:Array<AnalysisReport>    
        
        searchCount:boolean    
        
        size:number    
        
        total:number    
    }
}

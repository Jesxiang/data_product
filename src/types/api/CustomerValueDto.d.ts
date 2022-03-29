declare namespace KtApi {
    
    type CustomerValueDto = {    
        //信用分
        behaviorScore:string    
        //上个状态
        lastStatus:string    
        //上个状态时间
        lastTime:string    
        //忠诚度
        loyaltyIndex:number    
        //当前状态
        status:string    
    }
}

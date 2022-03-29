declare namespace KtApi {
    
    /**
     * 商业综合指数接口对象
     */
    type CompositeIndexDto = {    
        //市级平均数
        avgSynthesizeIndex:number    
        //市级平均数环比
        avgSynthesizeIndexRatio:number    
        //总车场数
        lotNum:number    
        //排名
        rank:number    
        //环比排名
        rankRatio:number    
        //上月车场综合指数
        synthesizeIndex:number    
        //上月车场综合指数环比
        synthesizeIndexRatio:number    
    }
}

declare namespace KtApi {
    
    /**
     * 指标趋势值
     */
    type SynthesizeIndexDto = {    
        //值
        dimensionDto?:Array<DimensionDto>    
        //指数名
        indexName:string    
    }
}

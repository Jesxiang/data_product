declare namespace KtApi {
    
    /**
     * 维度
     */
    type DimensionDto = {    
        //维度名
        dimensionName:string    
        //维度值
        synthesizeIndexDimensionDto?:Array<SynthesizeIndexDimensionDto>    
    }
}

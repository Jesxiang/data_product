declare namespace KtApi {
    
    /**
     * 商业综合维度值
     */
    type SynthesizeDimensionTopDto = {    
        //维度名
        dimensionName:string    
        //维度值
        passengerFlowDimensionDto?:Array<SynthesizeIndexTopDto>    
    }
}

declare namespace KtApi {
    
    /**
     * 车流指数趋势值
     */
    type PassengerFlowIndexDto = {    
        //指数名
        indexName:string    
        //维度值
        passengerFlowDimensionDto?:Array<PassengerFlowDimensionDto>    
    }
}

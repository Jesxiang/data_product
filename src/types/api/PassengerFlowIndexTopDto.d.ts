declare namespace KtApi {
    
    /**
     * 车流指数TOP10
     */
    type PassengerFlowIndexTopDto = {    
        //维度名
        dimensionName:string    
        //维度值
        passengerFlowDimensionDto?:Array<VehicleFlowIndexTopDto>    
    }
}

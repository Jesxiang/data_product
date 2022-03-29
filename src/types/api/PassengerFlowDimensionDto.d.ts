declare namespace KtApi {
    
    /**
     * 维度
     */
    type PassengerFlowDimensionDto = {    
        //维度名
        dimensionName:string    
        //维度值
        vehicleFlowIndexTendencyDto?:Array<VehicleFlowIndexTendencyDto>    
    }
}

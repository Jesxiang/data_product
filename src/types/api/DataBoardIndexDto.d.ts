declare namespace KtApi {
    
    /**
     * 商业综合指数接口对象
     */
    type DataBoardIndexDto = {    
        //商业综合指数
        compositeIndexDto?:CompositeIndexDto    
        //雷达图
        radarDto?:Array<CompositeIndexRadarDto>    
        //车流指数
        vehicleFlowIndexDto?:VehicleFlowIndexDto    
    }
}

declare namespace KtApi {
    
    /**
     * 商业综合指数接口对象
     */
    type VehicleFlowIndexDto = {    
        //市级平均数
        avgVehicleFlowIndex:number    
        //市级平均数环比
        avgVehicleFlowRatio:number    
        //总车场数
        lotNum:number    
        //排名
        rank:number    
        //环比排名
        rankRatio:number    
        //昨日本商场车流指数
        vehicleFlowIndex:number    
        //昨日本商场车流指数环比
        vehicleFlowIndexRatio:number    
    }
}

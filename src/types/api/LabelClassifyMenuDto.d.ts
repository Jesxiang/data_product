declare namespace KtApi {

    /**
     * 标签管理菜单标签分类
     */
    type LabelClassifyMenuDto = {
        //标签分类及详细标签
        label?:Array<ImportLabelClassifyDto>
        //标签类型名称
        labelName:string
    }
}

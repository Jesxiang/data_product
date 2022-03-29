## 商业大数据平台

### 基础框架

* vue3.0
* ant-design-vue 2.1
* axios
* typescript

### 环境

* `env.server`本地开发使用,`env.build`打包使用
* test配置测试环境，pro配置线上环境
* 新建`.env.local`配置自己的本地开发环境

### vue.config.ts

在修改配置文件之后需要运行`compile:config`命令，
具体原因见[issue](https://github.com/vuejs/vue-cli/issues/2138)  

vue-cli5预计会支持

### eslint

* js方面基于 [eslint-airbnb-config-base](https://www.npmjs.com/package/eslint-config-airbnb-base) 自定义了部分配置
* vue方面基于 [plugin:vue/vue3-recommended](https://eslint.vuejs.org/rules/)
* 由于prettier与eslint-plugin-vue的冲突，对于template的代码规范无法使用，取消了prettier，如有更好建议请说明，具体[issue](https://github.com/prettier/prettier/issues/5501)

### stylelint

* [css属性顺序](https://github.com/twbs/bootstrap/blob/f58997a0dae54dc98d11892afef9acb85bdc6a1e/.scss-lint.yml#L136)

### swagger2ts

* 根据swagger接口文档自动生成前端接口文档和类型定义
* 需要配置swagger api-docs接口地址

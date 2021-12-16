# rollup-lib-boilerplate

## 项目初始化步骤

### 创建package.json

```bash
npm init
```

### 安装依赖包
```bash
npm install -D rollup @rollup/plugin-commonjs  @rollup/plugin-node-resolve rollup-plugin-terser npm-run-all eslint
```

### 依赖包作用说明
- @rollup/plugin-commonjs 将CommonJS模块转换为ES6
- @rollup/plugin-node-resolve 省略扩展名解析引入的文件
- rollup-plugin-terser 压缩代码
- npm-run-all 批量执行命令

### 创建eslint配置文件
```bash
# 按提示选择配置文件类型
npx eslint --init
```

### Eslint 结合 Prettier
```bash
# 安装eslint-prettier-config
npm i eslint-prettier-config -D
```
#### 修改eslint配置文件 添加 prettier
```json
{
    "extends": "['standard', 'prettier']"
}
```


### 配置文件说明
- rollup.config.js 打包编译配置文件
- .gitignore git忽略文件
- .prettierrc.js prettierrc代码格式化规则配置文件
- .npmrc 配置npm相关信息 e.g. registry地址
- .npmignore 上传npm包忽略文件配置`

### Visual Studio Code 项目配置
```json
"editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true,
},
"eslint.format.enable": true,
"prettier.enable": true,
"editor.formatOnSave": true,
```

### package.json 相关说明
- devDependencies 开发依赖包
- dependencies 业务依赖包
- peerDependencies 避免核心依赖重复下载

### 规范git提交校验 使用commitlint
```bash
# 安装依赖包
@commitlint/cli @commitlint/config-conventional

```

### 规范git提交工具 commitizen
```bash
# 安装依赖包
npm i -D commitzen

# 初始化
npx commitizen init cz-conventional-changelog --save-dev --save-exact

# 设置命令脚本
npm set-script commit "git-cz"

# 命令行交互方式提交代码
npm run commit
```

### 增加git提交Hook 使用husky
```bash
# 安装依赖包
npm i -D husky

# 添加命令脚本
npm set-script prepare "husky install"

# 初始化husky 生成.husky 目录
npm run prepare

# 添加钩子
npx husky add .husky/pre-commit "npx --no-install lint"
npx husky add .husky/msg-commit "npx --no-install commitlint --edit "$1""

# 测试钩子
git add .husky/pre-commit
```

### 自动化版本控制
- 自动生成版本号 根据git提交规范 破坏性更改(major)、feature(minor)、fix(patch)
- 自动按版本号生成tag
- 按提交记录生成CHANGELOG.md
- release 命令需要在上线分支执行
```bash
# 安装依赖
npm i -D standard-version

npm set-script release "standard-version"

# 设置主版本
npm run release -- --release-as major

# 设置次要版本
npm run release -- --release-as minor

# 设置具体版本
npm run release -- --release-as 1.1.0


# 其他命令
npm run release -- --prerelease
npm run release -- --prerelease alpha

```

### npx 参数说明
- --no-install 强制使用本地模块 本地模块不存在就会报错
- --ignore-existing 忽略本地模块 强制使用远程模块
- 指定node版本 e.g.
```bash
# 使用v14.17.0 版本的node
npx node@14.17.0 -v
```

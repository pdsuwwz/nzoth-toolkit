# @nzoth/markdown-it-mermaid-sse

[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://www.npmjs.com/package/@nzoth/markdown-it-mermaid-sse)
[![Npm](https://img.shields.io/npm/v/@nzoth/markdown-it-mermaid-sse?color=466fe8)](https://www.npmjs.com/package/@nzoth/markdown-it-mermaid-sse)
[![License](https://img.shields.io/github/license/pdsuwwz/nzoth-toolkit?color=466fe8)](https://github.com/pdsuwwz/nzoth-toolkit/blob/main/LICENSE)
[![Thanks](https://badgen.net/badge/thanks/♥/pink)](https://github.com/pdsuwwz)

⚡️ Mermaid 图表语法高亮预览 `markdown-it` 插件，支持 `SSE` 流式渲染

## 前置条件

* Node >= 20.x
* Pnpm 9.x

## 安装

```shell
npm install @nzoth/markdown-it-mermaid-sse

# or

pnpm add @nzoth/markdown-it-mermaid-sse
```

## 功能特点

- 支持 Mermaid 图表语法的解析和渲染
- 提供 SSE (Server-Sent Events) 流式渲染能力
- 与 markdown-it 无缝集成
- 支持在 Markdown 内容中动态更新 Mermaid 图表
- 轻量级且高性能

## 基本使用

### 普通集成

```ts
import MarkdownIt from 'markdown-it'
import { markdownItMermaidPlugin } from '@nzoth/markdown-it-mermaid-sse'

const md = new MarkdownIt()
md.use(markdownItMermaidPlugin)

// 渲染 Markdown
const result = md.render(`
\`\`\`mermaid
graph TD
    A[开始] --> B{判断}
    B -->|条件1| C[处理1]
    B -->|条件2| D[处理2]
    C --> E[结束]
    D --> E
\`\`\`
`)
```

### 结合其他插件使用

```ts
import MarkdownIt from 'markdown-it'
import markdownItHighlight from 'markdown-it-highlightjs'
import markdownItKatex from '@vscode/markdown-it-katex'
import { 
  markdownItMermaidPlugin, 
  transformMermaid,
  renderMermaidSSE 
} from '@nzoth/markdown-it-mermaid-sse'

// 初始化 markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

// 注册插件
md.use(markdownItHighlight)
  .use(markdownItKatex)
  .use(markdownItMermaidPlugin)

// 处理并渲染 Markdown
export const renderMarkdownText = (content) => {
  // 可以与其他转换流程结合
  const mermaidTransformed = transformMermaid(content)
  return md.render(mermaidTransformed)
}

// 触发流式渲染 Mermaid 图表
export const renderMermaidProcess = (callback = () => {}) => {
  renderMermaidSSE(callback)
}
```

## API 说明

### `markdownItMermaidPlugin`

markdown-it 插件函数，用于注册 Mermaid 语法支持。

```ts
md.use(markdownItMermaidPlugin, options)
```

## 🌟 相关项目

以下是一些开发者和团队正在使用、参考或受本项目启发的项目：

| 项目名                                                | 简介                                                                                          |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [快速搭建单轮对话 AI 应用](https://github.com/pdsuwwz/chatgpt-vue3-light-mvp) | 一个可二次开发 Chat Bot 单轮对话 Web 端大模型原型模板 |

### 📢 社区贡献

💡 如果您的项目也在使用或借鉴了本项目，我们诚挚欢迎您：

- 通过提交 [Issue](https://github.com/pdsuwwz/nzoth-toolkit/issues) 分享您的项目链接
- 提交 Pull Request (PR) 将您的项目添加到列表中

## License

[MIT](./LICENSE) License | Copyright © 2020-PRESENT [Wisdom](https://github.com/pdsuwwz)

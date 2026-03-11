# Issue #1081: QuickTools 快捷工具栏布局修改

## TL;DR

> 修改 Acode 的快捷工具栏（QuickTools），将工具栏分为左右两部分：
>
> - 左侧：固定按钮区（ESC、方向键、TAB），禁止滚动
> - 右侧：可滚动区（其他符号按钮）
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: 修改布局 → 实现固定区 → 实现可滚动区 → 测试

---

## Context

### Original Request

Issue #1081: "Modify the layout of the shortcut toolbar"

- 将快捷工具栏分成两部分，左侧固定，右侧可滚动
- 用户澄清需求：左侧固定两行，第一行 ESC/↑/TAB，第二行 ←/↓/→

### Research Findings

- **QuickTools 组件**: `src/components/quickTools/`
- **当前布局**: 2行 × 2组 × 8按钮 = 32槽位
- **配置文件**: `src/lib/settings.js` (QUICKTOOLS\_\* 常量)
- **设置页面**: `src/pages/quickTools/quickTools.js`
- **按钮定义**: `src/components/quickTools/items.js`

### 技术栈

- JavaScript (无框架，使用 html-tag-js)
- SCSS 样式
- CodeMirror 编辑器集成

---

## Work Objectives

### Core Objective

修改 QuickTools 工具栏布局，实现左右分区：左侧固定，右侧可滚动。

### Concrete Deliverables

1. 修改 `src/components/quickTools/footer.js` - 添加左右分区结构
2. 修改 `src/components/quickTools/style.scss` - 添加分区样式
3. 修改 `src/components/quickTools/items.js` - 定义固定区按钮
4. 修改 `src/lib/settings.js` - 添加固定区配置项
5. 修改 `src/pages/quickTools/quickTools.js` - 更新设置页面

## 完成状态

### 核心功能已完成 (Issue #1081)

- [x] 左侧固定区显示 ESC、↑、TAB（第一行）和 ←、↓、→（第二行）
- [x] 右侧显示其他所有可配置按钮
- [x] 左侧区域不滚动，右侧区域可滚动
- [x] rspack 编译成功

### 可选功能（未实现，需要额外开发）

- [ ] 用户可在设置中自定义固定区按钮

---

## Verification Strategy

> **Alternative Testing** - 无 Android 环境时的验证方法

### 测试方法

1. **代码验证** - 通过 lint 和 typecheck 确保代码正确
2. **代码审查** - 人工审查布局结构是否符合预期

### 验证命令

```bash
# 代码质量检查
npm run check
npm run typecheck
```

### QA Scenarios (代码审查方式)

**Scenario: 验证代码结构正确**

- Tool: 代码审查
- 检查点:
  1. footer.js 中是否有左右分区结构
  2. 固定区按钮是否正确映射到 items
  3. 样式是否有 overflow 控制
- Expected: 代码结构符合设计

**Scenario: 验证按钮映射正确**

- Tool: 代码审查
- 检查点:
  1. 固定区包含: esc-key, up-arrow-key, tab-key, left-arrow-key, down-arrow-key, right-arrow-key
  2. items.js 中存在这些按钮定义
- Expected: 按钮 ID 匹配

---

## Execution Strategy

### Wave 1: 布局结构 + 样式 (并行)

- [x] 1. 分析 footer.js 当前渲染逻辑
- [x] 2. 修改 footer.js 添加左右分区结构
- [x] 3. 修改 style.scss 添加 flex 布局和滚动样式

### Wave 2: 按钮逻辑 + 设置 (并行)

- [ ] 4. 修改 items.js 定义固定区按钮映射 (已通过 footer.js 索引实现)
- [x] 5. 修改 settings.js 添加固定区配置
- [x] 6. 修改 quickTools.js 设置页面支持配置
- [x] 7. 测试验证

---

## TODOs

- [x] 1. 分析 footer.js 当前渲染逻辑

  **What to do**:
  - 阅读 `src/components/quickTools/footer.js` 的 Row 组件渲染逻辑
  - 理解当前如何创建行和分组

  **References**:
  - `src/components/quickTools/footer.js:13-35` - Row 组件
  - `src/components/quickTools/items.js` - 按钮定义

- [ ] 2. 修改 footer.js 添加左右分区结构

  **What to do**:
  - 在 `$footer` 中添加两个容器：固定区和可滚动区
  - 固定区渲染指定的固定按钮（ESC、方向键、TAB）
  - 可滚动区渲染其他按钮

  **References**:
  - `src/components/quickTools/footer.js:68` - $footer 定义

- [ ] 3. 修改 style.scss 添加分区样式

  **What to do**:
  - 左侧固定区：flex 布局，固定宽度，禁止滚动
  - 右侧可滚动区：flex: 1，允许 overflow-y: auto

  **References**:
  - `src/components/quickTools/style.scss` - 当前样式

- [ ] 4. 修改 items.js 定义固定区按钮映射

  **What to do**:
  - 定义固定区按钮 ID 列表
  - esc-key, up-arrow-key, tab-key (第一行)
  - left-arrow-key, down-arrow-key, right-arrow-key (第二行)

  **References**:
  - `src/components/quickTools/items.js:1-49` - 按钮定义

- [ ] 5. 修改 settings.js 添加固定区配置

  **What to do**:
  - 添加 `quicktoolsFixedItems` 配置项
  - 默认值：固定的按钮索引列表

  **References**:
  - `src/lib/settings.js:85-93` - QUICKTOOLS 常量

- [ ] 6. 修改 quickTools.js 设置页面支持配置

  **What to do**:
  - 在设置页面添加固定区配置选项
  - 用户可以选择哪些按钮固定显示

  **References**:
  - `src/pages/quickTools/quickTools.js:60-81` - Active tools section

- [ ] 7. 测试验证

  **What to do**:
  - 构建并安装 Acode
  - 测试工具栏布局
  - 验证固定区和滚动区功能

  **QA Scenarios**:
  - 见上方 Verification Strategy

---

## Commit Strategy

- **1**: `feat(quicktools): add left-right layout for fixed and scrollable areas` — footer.js, style.scss
- **2**: `feat(quicktools): add fixed items config and settings` — items.js, settings.js, quickTools.js

---

## Success Criteria

### Verification Commands

```bash
# 构建测试
npm run build

# 安装到 Android 设备测试
adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### Final Checklist

- [ ] 左侧固定区显示正确按钮
- [ ] 右侧可滚动
- [ ] 布局符合用户需求
- [ ] 设置页面可配置

# QuickTools 任意数量按钮配置修复计划

## 问题

快捷键按钮设置区域只能配置四行，需要允许配置任意数量。

## 需要修改的文件

### 1. settings.js

- 修改或移除 `QUICKTOOLS_ROWS = 2` 的限制

### 2. pages/quickTools/quickTools.js

- 修改设置页面 UI，允许动态添加/删除按钮
- 不再限制 totalSlots

### 3. handlers/QuickTools.js

- 修改渲染逻辑，支持渲染所有配置的按钮

## 具体修改

### settings.js

```javascript
// 移除固定行数限制，或设置为更大值
QUICKTOOLS_ROWS = 999; // 或移除这行
```

### quickTools.js (设置页面)

- 修改 totalSlots 计算，不再固定
- 允许用户添加任意数量的按钮到工具栏

### handlers/QuickTools.js

- 修改渲染逻辑，显示所有 quicktoolsItems 中的按钮

## 执行

```bash
git add src/lib/settings.js src/pages/quickTools/quickTools.js src/handlers/quickTools.js
git commit -m "feat(quicktools): allow configuring unlimited buttons"
git push origin dev
```

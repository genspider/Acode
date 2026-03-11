# QuickTools 完整修订计划

## 当前问题汇总

1. ✅ ~~右侧横向滚动~~ - 已修复
2. 🔧 快捷键设置修改后不同步到编辑区
3. 🔧 设置区域已启用工具改成一行5个
4. 🔧 允许配置任意数量按钮
5. 🔧 右侧显示全部按钮（纵向滚动）
6. 🔧 按钮样式修复（去掉阴影）
7. 🔧 footer 外部阴影去掉

---

## 完整修复清单

### 1. 显示全部按钮

**文件**: `src/handlers/QuickTools.js`

修改 `update:quicktoolsItems:after` 事件处理，移除高度限制：

```javascript
// 修改前
const height = getFooterHeight();
$footer.querySelector(".scrollable-area").content = [$row1, $row2].slice(
  0,
  height,
);

// 修改后
$footer.querySelector(".scrollable-area").content = [$row1, $row2];
```

### 2. 动态加载固定按钮

**文件**: `src/components/QuickTools/footer.js`

修改 `$footer`，从 settings 动态读取固定按钮：

```javascript
function getFixedButtons() {
  const fixedIndices = settings.value.quicktoolsFixedItems || [
    8, 19, 1, 17, 20, 18,
  ];
  return fixedIndices.map((index) => items[index]).filter(Boolean);
}
```

### 3. 设置页面改为一行的5个

**文件**: `src/pages/QuickTools/style.scss`

```scss
&.active-grid {
  grid-template-columns: repeat(5, 1fr); // 从 8 改为 5
}
```

### 4. 允许配置任意数量按钮

**文件**:

- `src/lib/settings.js` - 移除 QUICKTOOLS_ROWS 限制
- `src/pages/QuickTools/quickTools.js` - 修改设置页面逻辑
- `src/handlers/QuickTools.js` - 修改渲染逻辑

### 5. 按钮样式修复（去掉阴影）

**文件**: `src/components/QuickTools/style.scss`

移除：

- 第 65 行：`box-shadow: 0 0 4px var(--box-shadow-color);`
- 第 55 行：`box-shadow: inset 0 0 2px var(--box-shadow-color);`

### 6. footer 外部阴影

检查 `main.scss` 中是否有定义，如有则覆盖。

---

## 执行顺序

1. 先修复样式问题（简单）
2. 再修复功能问题（复杂）

## Git 命令

```bash
git add src/components/QuickTools/style.scss src/components/QuickTools/footer.js src/handlers/QuickTools.js src/pages/QuickTools/style.scss src/pages/QuickTools/quickTools.js src/lib/settings.js
git commit -m "fix(quicktools): multiple fixes - show all buttons, sync settings, 5 columns, remove shadows"
git push origin dev
```

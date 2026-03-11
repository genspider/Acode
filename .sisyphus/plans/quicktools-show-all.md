# QuickTools 显示所有按钮修复计划

## 问题

改成纵向滚动后，右侧区域没有显示全部按钮，只显示了前两行。

## 原因

代码中根据高度限制只显示部分按钮：

```javascript
const height = getFooterHeight();
$footer.querySelector(".scrollable-area").content = [$row1, $row2].slice(
  0,
  height,
);
```

## 修复

### 文件

`src/handlers/quickTools.js`

### 代码修改

将第 162-172 行：

```javascript
appSettings.on("update:quicktoolsItems:after", () => {
  setTimeout(() => {
    if (actionStack.has("search-bar")) return;
    const { $footer, $row1, $row2 } = quickTools;
    const height = getFooterHeight();
    $footer.querySelector(".scrollable-area").content = [$row1, $row2].slice(
      0,
      height,
    );
  }, 100);
});
```

改为：

```javascript
appSettings.on("update:quicktoolsItems:after", () => {
  setTimeout(() => {
    if (actionStack.has("search-bar")) return;
    const { $footer, $row1, $row2 } = quickTools;
    // Show all buttons (not limited by height) for vertical scroll
    $footer.querySelector(".scrollable-area").content = [$row1, $row2];
  }, 100);
});
```

## 执行

```bash
git add src/handlers/quickTools.js
git commit -m "fix(quicktools): show all buttons in scrollable area"
git push origin dev
```

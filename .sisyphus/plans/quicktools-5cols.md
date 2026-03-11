# QuickTools 设置页面布局修改计划

## 问题

快捷键按钮设置区域中已启用的工具布局需要改成一行显示5个。

## 修改

### 文件

`src/pages/quickTools/style.scss`

### 代码修改

第 82-86 行：

```scss
&.active-grid {
  grid-template-columns: repeat(5, 1fr); // 从 8 改为 5
  min-height: auto;
  margin-bottom: 5px;
}
```

## 执行

```bash
git add src/pages/quickTools/style.scss
git commit -m "fix(quicktools): change active tools grid to 5 columns"
git push origin dev
```

# QuickTools 样式修复计划

## 问题

1. 快捷键按钮样式被改成了带阴影，很难看
2. 整个 footer 区域有外部阴影，不想要

## 修复

### 文件

`src/components/quickTools/style.scss`

### 需要移除的样式

1. **按钮阴影** (第 65 行):

```scss
// 删除这行
box-shadow: 0 0 4px var(--box-shadow-color);
```

2. **按钮点击阴影** (第 55 行):

```scss
// 删除这行
box-shadow: inset 0 0 2px var(--box-shadow-color);
```

3. **footer 外部阴影** - 需要检查 main.scss 中是否有定义

## 执行

```bash
git add src/components/quickTools/style.scss
git commit -m "fix(quicktools): remove button shadows"
git push origin dev
```

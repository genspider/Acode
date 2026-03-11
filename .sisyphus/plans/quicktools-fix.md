# QuickTools 布局修复

## 问题

1. 左侧按钮堆积在一起，两行显示在一行高度
2. 右侧横向滚动，应该是纵向滚动

## 修复方案

### 修改文件

`src/components/quickTools/style.scss`

### CSS 修复

quick-tools {
display: flex;

```scss
#  flex-direction: row;
  align-items: stretch;

  .fixed-area {
    display: flex;
    flex-direction: column;  // 垂直排列两行
    flex-shrink: 0;
  }

  .fixed-row {
    display: flex;
    min-height: 40px;  // 保持行高
  }

  .scrollable-area {
    flex: 1;
    display: flex;
    flex-direction: column;  // 纵向排列按钮组
    overflow-x: hidden;
    overflow-y: auto;  // 纵向滚动
  }

  .scrollable-area .button-container {
    flex-wrap: wrap;  // 允许换行
    overflow: visible;
  }
}
```

## 执行

需要重新构建并安装测试

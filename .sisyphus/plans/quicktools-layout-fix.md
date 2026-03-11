# QuickTools 布局修复计划

## 问题描述

1. **整体高度变化** - 由原来的一行改为两行高度
2. **左侧按钮堆积** - 两行显示在一行高度里（需要正确的两行布局）
3. **右侧滚动方向** - 原来是横向滚动，需要改为纵向滚动
4. **样式不一致** - 左侧按钮样式与右侧不同

## 修复步骤

### 步骤 1: 修改 style.scss

**文件**: `src/components/quickTools/style.scss`

```scss
@use "../../styles/mixins.scss";

#quick-tools {
  display: flex;
  flex-direction: row; // 左右布局
  height: 80px; // 两行高度 (原40px × 2)

  .fixed-area {
    display: flex;
    flex-direction: column; // 左侧垂直排列两行
    flex-shrink: 0;
    overflow: hidden;
    width: auto;
  }

  .scrollable-area {
    flex: 1;
    overflow-x: hidden; // 禁止横向滚动
    overflow-y: auto; // 纵向滚动
  }

  .fixed-row {
    display: flex;
    flex: 1; // 占满高度
    min-height: 40px;
  }

  // 左侧按钮样式与右侧一致
  .fixed-row .icon {
    flex: 1;
    min-width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .icon.click {
    @include mixins.active-icon;
    transition: all 0.3s ease-in-out;
    transform: scale(1.2);
  }

  // ... 保持其余原有样式
}
```

### 步骤 2: 修改 footer.js（如果需要）

确保 `$footer` 结构正确：

```javascript
export const $footer = (
  <footer id="quick-tools" tabIndex={-1}>
    <div className="fixed-area">
      <div className="fixed-row">
        <RowItem {...items[8]} /> // ESC
        <RowItem {...items[19]} /> // ↑
        <RowItem {...items[1]} /> // TAB
      </div>
      <div className="fixed-row">
        <RowItem {...items[17]} /> // ←
        <RowItem {...items[20]} /> // ↓
        <RowItem {...items[18]} /> // →
      </div>
    </div>
    <div className="scrollable-area"></div>
  </footer>
);
```

### 步骤 3: 构建并推送

```bash
npm run build
git add src/components/quickTools/style.scss src/components/quickTools/footer.js
git commit -m "fix(quicktools): toolbar height 2 rows, left fixed, right vertical scroll"
git push
```

## 预期效果

```
┌────────────────────────────────────────────────────┐
│  [ESC]  [↑]  [TAB]   │  [btn1][btn2][btn3]       │ ← 第1行
│  [←]   [↓]  [→]     │  [btn4][btn5][btn6]       │ ← 第2行
│                        │  [btn7]...                 │ ← 纵向滚动
└────────────────────────────────────────────────────┘
   ↑ 固定区                ↑ 可滚动区(纵向)
   不滚动                  ↓
```

- **总高度**: 80px (两行，每行40px)
- **左侧固定区**: 2行×3按钮，不滚动
- **右侧可滚动区**: 纵向滚动
- **样式**: 左右一致

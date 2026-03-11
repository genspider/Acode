# QuickTools 固定按钮同步修复计划

## 问题

设置中修改了固定按钮后，编辑区的工具栏没有同步更新。

## 原因

`footer.js` 中的固定按钮是硬编码的，没有读取 `settings.value.quicktoolsFixedItems`。

## 修复方案

### 修改文件

`src/components/quickTools/footer.js`

### 代码修改

```javascript
import settings from "lib/settings";

// 获取固定按钮
function getFixedButtons() {
  const fixedIndices = settings.value.quicktoolsFixedItems || [
    8, 19, 1, 17, 20, 18,
  ];
  return fixedIndices.map((index) => items[index]).filter(Boolean);
}

// 渲染固定区域
function renderFixedArea() {
  const fixedButtons = getFixedButtons();
  const row1 = fixedButtons.slice(0, 3);
  const row2 = fixedButtons.slice(3, 6);

  return (
    <div className="fixed-area">
      <div className="fixed-row">
        {row1.map((item, i) => (
          <RowItem key={`fixed-1-${i}`} {...item} />
        ))}
      </div>
      <div className="fixed-row">
        {row2.map((item, i) => (
          <RowItem key={`fixed-2-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}

// 修改 $footer 渲染
export const $footer = (
  <footer id="quick-tools" tabIndex={-1}>
    {renderFixedArea()}
    <div className="scrollable-area"></div>
  </footer>
);
```

## 还需要添加设置更新监听

在 `handlers/quickTools.js` 中添加对 `quicktoolsFixedItems` 更新的监听，触发重新渲染。

## 执行命令

```bash
npm run build
git add src/components/quickTools/footer.js src/handlers/quickTools.js
git commit -m "fix(quicktools): dynamically load fixed buttons from settings"
git push
```

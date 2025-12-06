# 💌 Giscus 留言系统配置教程

> 让你的留言墙永久保存，不再丢失！

---

## 📋 什么是 Giscus？

Giscus 是一个基于 **GitHub Discussions** 的留言/评论系统：
- ✅ **完全免费**
- ✅ **留言永久保存**（保存在 GitHub）
- ✅ **无需服务器**
- ✅ **支持中文**
- ✅ **支持表情反应**

---

## 🚀 配置步骤（5分钟搞定）

### 第 1 步：准备 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 创建一个新仓库（如果还没有）
   - 仓库名：`my-website` 或 `lizhuoran-blog`（任意名字）
   - 设置为 **Public**（公开）
   - ✅ 勾选 "Initialize this repository with a README"

### 第 2 步：启用 GitHub Discussions

1. 进入你的仓库
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **General** → 滚动到 **Features**
4. ✅ 勾选 **Discussions**
5. 点击 **Save changes**

### 第 3 步：创建 Discussions 分类

1. 在仓库页面，点击 **Discussions** 标签
2. 点击 **New discussion**（新建讨论）
3. 选择 **Announcements**（公告）分类
4. 标题写：`留言墙`
5. 内容写：`欢迎在这里留言！`
6. 点击 **Start discussion**

### 第 4 步：安装 Giscus App

1. 访问 [giscus.app](https://giscus.app)
2. 点击 **Install Giscus** 按钮
3. 选择 **Only select repositories**（仅选择仓库）
4. 选择你的网站仓库
5. 点击 **Install**

### 第 5 步：获取配置信息

在 [giscus.app](https://giscus.app) 页面填写：

| 选项 | 填写内容 |
|------|---------|
| **Repository** | 选择你的仓库（如：`lizhuo-ran/my-website`） |
| **Page ↔ Discussions Mapping** | 选择 `pathname` |
| **Discussion Category** | 选择 `Announcements` |
| **Features** | ✅ 勾选 `Enable reactions` |
| **Theme** | 选择 `Light`（或 `Preferred color scheme`） |
| **Language** | 选择 `zh-CN` |

填写完成后，页面下方会显示配置代码，复制以下信息：

- `data-repo`
- `data-repo-id`
- `data-category-id`

### 第 6 步：更新网站代码

1. 打开 `friends.html` 文件
2. 找到这段代码（大约在第 900 行）：

```javascript
const giscusConfig = {
  repo: 'YOUR_USERNAME/YOUR_REPO',  // 改成你的仓库
  repoId: 'YOUR_REPO_ID',            // 改成你的 repo-id
  category: 'Announcements',
  categoryId: 'YOUR_CATEGORY_ID',    // 改成你的 category-id
  // ... 其他配置
};
```

3. 替换成你的实际信息：

```javascript
const giscusConfig = {
  repo: 'lizhuo-ran/my-website',     // 你的仓库名
  repoId: 'R_xxxxxxxxxxxxx',          // 从 giscus.app 复制的 repo-id
  category: 'Announcements',
  categoryId: 'DIC_xxxxxxxxxxxxx',   // 从 giscus.app 复制的 category-id
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'light',
  lang: 'zh-CN',
  loading: 'lazy',
};
```

4. 保存文件

### 第 7 步：测试

1. 刷新你的网站
2. 滚动到留言墙部分
3. 应该能看到 Giscus 留言框了！
4. 点击 "Sign in with GitHub" 登录后即可留言

---

## ✅ 配置完成！

现在你的留言墙已经可以永久保存留言了！

### 留言功能说明：

- **登录方式**：使用 GitHub 账号登录
- **留言保存**：所有留言保存在 GitHub Discussions 中
- **永久保存**：只要 GitHub 在，留言就在
- **管理留言**：你可以在 GitHub 仓库的 Discussions 中管理留言

---

## ❓ 常见问题

### Q1: 看不到留言框？
**A:** 
- 检查是否完成了所有配置步骤
- 确认仓库是 Public（公开）
- 确认已启用 Discussions
- 检查浏览器控制台是否有错误（F12）

### Q2: 提示"未配置"？
**A:** 检查 `friends.html` 中的 `giscusConfig` 是否已填入正确的信息

### Q3: 留言需要审核吗？
**A:** 不需要，但你可以：
- 在 GitHub Discussions 中删除不当留言
- 设置 Discussion 模板来规范留言格式

### Q4: 可以自定义样式吗？
**A:** 可以！Giscus 支持自定义 CSS，你可以在 `friends.html` 的 `<style>` 部分添加：

```css
.giscus-frame {
  /* 你的自定义样式 */
}
```

---

## 🎉 完成！

现在你的朋友可以通过 GitHub 账号登录并留言，所有留言都会永久保存在你的 GitHub 仓库中！

有问题随时问我！😊

---

*最后更新：2025年1月*


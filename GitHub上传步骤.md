# GitHub 上传步骤

## 第一步：在 GitHub 创建新仓库

1. 登录 GitHub（如果没有账号，先注册：https://github.com）
2. 点击右上角的 **+** 号，选择 **New repository**
3. 填写仓库信息：
   - **Repository name**: `my-personal-website`（或你喜欢的名字）
   - **Description**: 个人网站
   - **Visibility**: 选择 **Public**（如果要用 GitHub Pages 免费部署）
   - ⚠️ **不要**勾选 "Initialize this repository with a README"（我们已经有了）
4. 点击 **Create repository**

## 第二步：连接本地仓库到 GitHub

创建仓库后，GitHub 会显示一个页面，里面有推送命令。**复制下面的命令**，在终端中执行：

```bash
cd "/Users/apple/Downloads/自制网页"

# 添加远程仓库（把 YOUR_USERNAME 替换成你的 GitHub 用户名，把 REPO_NAME 替换成你创建的仓库名）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

### 示例：
如果你的 GitHub 用户名是 `lizhuoran`，仓库名是 `my-personal-website`，那么命令是：

```bash
git remote add origin https://github.com/lizhuoran/my-personal-website.git
git branch -M main
git push -u origin main
```

## 第三步：验证上传成功

1. 刷新 GitHub 网页，应该能看到所有文件
2. 检查文件是否都上传了（应该有 index.html, about.html, friends.html 等）

## 常见问题

### 如果提示需要登录：
```bash
# GitHub 现在需要 Personal Access Token，不是密码
# 1. 去 GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
# 2. 生成新 token，勾选 repo 权限
# 3. 复制 token，在输入密码时粘贴 token
```

### 如果提示 "remote origin already exists"：
```bash
# 先删除旧的远程仓库
git remote remove origin
# 然后重新添加
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

## 下一步：部署和域名配置

上传成功后，你可以：
1. 使用 **GitHub Pages** 免费部署（在仓库 Settings > Pages 中开启）
2. 使用 **Vercel** 部署（更简单，自动部署）
3. 配置自定义域名

详细步骤见 `部署教程.md`


# 🔧 Git 命令速查表

> 如果你选择用命令行而不是 GitHub Desktop，复制粘贴以下命令即可

---

## 🚀 首次上传（只需执行一次）

打开终端（Terminal），依次复制粘贴以下命令：

### 第 1 步：进入网站文件夹

```bash
cd ~/Downloads/自制网页
```

### 第 2 步：初始化 Git 仓库

```bash
git init
```

### 第 3 步：添加所有文件

```bash
git add .
```

### 第 4 步：提交文件

```bash
git commit -m "首次上传网站"
```

### 第 5 步：连接到 GitHub

⚠️ 先在 GitHub 网站创建一个空仓库，然后把下面的 `你的用户名` 和 `仓库名` 替换成你自己的：

```bash
git remote add origin https://github.com/你的用户名/仓库名.git
```

例如：
```bash
git remote add origin https://github.com/lizhuo-ran/my-website.git
```

### 第 6 步：推送到 GitHub

```bash
git branch -M main
git push -u origin main
```

如果提示输入用户名密码，输入你的 GitHub 用户名和密码（或 Token）。

✅ **完成！** 去 GitHub 仓库设置中开启 Pages 即可。

---

## 🔄 更新网站（每次修改后）

修改完文件后，打开终端，依次执行：

```bash
cd ~/Downloads/自制网页
git add .
git commit -m "更新内容"
git push
```

或者一行搞定：

```bash
cd ~/Downloads/自制网页 && git add . && git commit -m "更新内容" && git push
```

---

## 📝 常用命令说明

| 命令 | 作用 |
|------|------|
| `git init` | 初始化仓库（只需一次） |
| `git add .` | 添加所有修改的文件 |
| `git commit -m "说明"` | 提交修改，引号内写修改说明 |
| `git push` | 推送到 GitHub |
| `git status` | 查看当前状态 |
| `git pull` | 从 GitHub 拉取最新内容 |

---

## ⚠️ 常见问题

### 问题 1：push 时提示需要登录

**解决方法：** 使用 GitHub Personal Access Token

1. 打开 GitHub → Settings → Developer settings → Personal access tokens
2. 生成新 Token，勾选 `repo` 权限
3. 复制 Token，在密码处粘贴使用

### 问题 2：提示 `remote origin already exists`

```bash
git remote remove origin
git remote add origin https://github.com/你的用户名/仓库名.git
```

### 问题 3：中文文件名显示乱码

```bash
git config --global core.quotepath false
```

---

## 💡 推荐：使用 GitHub Desktop

如果觉得命令行麻烦，强烈推荐用 **GitHub Desktop**（图形界面）：
- 下载：https://desktop.github.com
- 所有操作都是点击按钮，不用记命令！

---

*祝你部署顺利！🎉*


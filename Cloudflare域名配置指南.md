# Cloudflare 域名配置指南

## 什么是 Cloudflare（CF）？

**Cloudflare** 是一个全球 CDN（内容分发网络）和 DNS 服务提供商，提供：
- ✅ **免费 DNS 解析**：快速、稳定
- ✅ **免费 CDN 加速**：全球节点，访问更快
- ✅ **免费 SSL 证书**：自动 HTTPS
- ✅ **DDoS 防护**：网站安全保护
- ✅ **动态解析（Dynamic DNS）**：支持 IP 变化自动更新

## 什么是"域名到 CF"？

有两种方式：

### 方式一：域名转移到 Cloudflare（推荐）
- 将域名从注册商（如阿里云）**转移**到 Cloudflare 管理
- 域名续费在 Cloudflare 进行
- 享受 Cloudflare 所有免费服务

### 方式二：只使用 Cloudflare DNS（更灵活）
- 域名仍在原注册商（如阿里云）
- 只把 **DNS 解析** 交给 Cloudflare
- 域名续费仍在原注册商

**推荐方式二**，更灵活，可以随时切换。

## 什么是"动态解析"（Dynamic DNS）？

### 传统 DNS 解析
- 域名 → 固定 IP 地址
- 例如：`www.example.com` → `192.168.1.100`
- IP 变化需要手动更新

### 动态解析（DDNS）
- 域名 → **动态变化的 IP 地址**
- 自动检测 IP 变化并更新
- 适合：
  - 家庭服务器（IP 经常变化）
  - 开发测试环境
  - 临时部署

### Cloudflare 动态解析
Cloudflare 提供 **API** 支持动态更新 DNS 记录，可以通过脚本自动更新。

## 什么是"解析即用"？

**解析即用** = **即插即用**，意思是：
- ✅ 配置简单，**几分钟就能用**
- ✅ 不需要复杂设置
- ✅ 配置后立即生效
- ✅ 自动处理 SSL 证书

## Cloudflare 配置步骤

### 第一步：注册 Cloudflare 账号

1. 访问：https://dash.cloudflare.com/sign-up
2. 使用邮箱注册（或 Google/GitHub 登录）
3. 验证邮箱

### 第二步：添加域名到 Cloudflare

#### 方式 A：域名转移（完全托管）

1. 在 Cloudflare 点击 **Add a Site**
2. 输入你的域名（如：`lizhuoran.com`）
3. 选择 **Free** 计划（免费）
4. Cloudflare 会自动扫描你的 DNS 记录
5. 点击 **Continue**
6. 获取 **转移码**（Authorization Code）
7. 在原注册商解锁域名并获取转移码
8. 在 Cloudflare 输入转移码，完成转移

⚠️ **注意**：转移需要 5-7 天，期间域名可能暂时无法使用。

#### 方式 B：只使用 DNS（推荐，更快）

1. 在 Cloudflare 点击 **Add a Site**
2. 输入你的域名
3. 选择 **Free** 计划
4. 查看 Cloudflare 提供的 **Nameservers**（名称服务器）
   - 例如：
     ```
     alice.ns.cloudflare.com
     bob.ns.cloudflare.com
     ```
5. **不要**在 Cloudflare 完成设置，先退出

6. **在原注册商（如阿里云）修改 Nameservers**：
   - 登录阿里云控制台
   - 进入 **域名** > **管理** > **DNS 修改**
   - 将 Nameservers 改为 Cloudflare 提供的两个地址
   - 保存

7. **等待生效**（通常 10 分钟到 2 小时）

8. **回到 Cloudflare**，点击 **Check nameservers**
   - 如果显示 ✅，说明配置成功

### 第三步：配置 DNS 记录

在 Cloudflare 的 **DNS** 页面添加记录：

#### 对于 GitHub Pages：

```
类型：CNAME
名称：www
目标：YOUR_USERNAME.github.io
代理状态：已代理（橙色云朵）✅
```

```
类型：A
名称：@
IPv4 地址：185.199.108.153
代理状态：已代理（橙色云朵）✅
```

（重复添加 4 个 A 记录，IP 分别是：185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153）

#### 对于 Vercel：

```
类型：CNAME
名称：@
目标：cname.vercel-dns.com
代理状态：已代理（橙色云朵）✅
```

```
类型：CNAME
名称：www
目标：cname.vercel-dns.com
代理状态：已代理（橙色云朵）✅
```

### 第四步：开启 SSL/TLS

1. 进入 **SSL/TLS** 设置
2. 选择 **Full** 或 **Full (strict)**
3. Cloudflare 会自动申请并配置 SSL 证书
4. 等待几分钟，HTTPS 自动生效

### 第五步：开启 CDN 加速（自动）

- 当 DNS 记录的 **代理状态** 是 **已代理**（橙色云朵）时
- CDN 自动开启，全球加速

## 动态解析配置（如果需要）

如果你需要动态更新 IP（比如家庭服务器）：

### 1. 获取 API Token

1. Cloudflare 右上角头像 > **My Profile**
2. **API Tokens** > **Create Token**
3. 使用模板：**Edit zone DNS**
4. 选择你的域名
5. 复制生成的 Token（只显示一次！）

### 2. 使用脚本自动更新

创建一个脚本（Python 示例）：

```python
import requests
import json

# 配置信息
ZONE_ID = "你的 Zone ID"  # 在域名 Overview 页面可以看到
DNS_RECORD_ID = "你的记录 ID"  # 在 DNS 记录页面可以看到
API_TOKEN = "你的 API Token"
DOMAIN = "example.com"  # 你的域名
SUBDOMAIN = "home"  # 子域名，如 home.example.com

# 获取当前公网 IP
def get_public_ip():
    response = requests.get("https://api.ipify.org?format=json")
    return response.json()["ip"]

# 更新 DNS 记录
def update_dns(ip):
    url = f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/dns_records/{DNS_RECORD_ID}"
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    }
    data = {
        "type": "A",
        "name": SUBDOMAIN,
        "content": ip,
        "ttl": 1  # 自动 TTL
    }
    response = requests.put(url, headers=headers, json=data)
    return response.json()

# 执行
current_ip = get_public_ip()
result = update_dns(current_ip)
print(f"更新成功：{SUBDOMAIN}.{DOMAIN} → {current_ip}")
```

### 3. 设置定时任务

在服务器上设置 cron 任务，每 5 分钟执行一次脚本：

```bash
# 编辑 crontab
crontab -e

# 添加（每 5 分钟执行一次）
*/5 * * * * /usr/bin/python3 /path/to/update_dns.py
```

## Cloudflare 的优势

### ✅ 免费服务
- DNS 解析：免费
- CDN 加速：免费
- SSL 证书：免费自动续期
- DDoS 防护：免费基础防护

### ✅ 性能提升
- 全球 200+ 节点
- 自动选择最近节点
- 访问速度提升 30-50%

### ✅ 安全性
- 自动 HTTPS
- DDoS 防护
- Web Application Firewall (WAF) 基础版免费

### ✅ 易用性
- 界面简洁
- 配置简单
- 文档完善

## 常见问题

### Q: 域名转移 vs 只改 DNS，哪个好？
**A:** 推荐只改 DNS（方式 B），因为：
- 更快生效（几分钟 vs 5-7天）
- 更灵活（可以随时切换）
- 域名仍在原注册商管理

### Q: "已代理"和"仅 DNS"有什么区别？
**A:**
- **已代理**（橙色云朵）：经过 Cloudflare CDN，更快更安全
- **仅 DNS**（灰色云朵）：只做 DNS 解析，不经过 CDN

**推荐使用"已代理"**，除非有特殊需求。

### Q: 动态解析会影响网站访问吗？
**A:** 不会。DNS 更新通常几分钟内生效，对访问者透明。

### Q: Cloudflare 免费版有限制吗？
**A:** 免费版对个人网站完全够用：
- 无限流量
- 无限请求
- 基础 DDoS 防护
- 免费 SSL

## 推荐配置流程

1. ✅ 在 Cloudflare 注册账号
2. ✅ 添加域名（只改 DNS，不转移）
3. ✅ 在原注册商修改 Nameservers
4. ✅ 等待生效后，在 Cloudflare 配置 DNS 记录
5. ✅ 开启 SSL/TLS（自动）
6. ✅ 享受免费 CDN 加速！

## 总结

- **域名到 CF** = 使用 Cloudflare 管理 DNS 解析
- **动态解析** = 支持 IP 自动更新（通过 API）
- **解析即用** = 配置简单，几分钟就能用

Cloudflare 是个人网站的最佳选择：**免费、快速、安全、易用**！


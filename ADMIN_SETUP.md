# 内容后台部署说明

后台地址为 `/admin`。它只管理以下内容文件：

- `src/content/projects.json`：作品
- `src/content/posts.json`：文章（Markdown 正文）

每次点击“保存并部署”，后台会以一个原子 GitHub 提交同时更新两个文件；Vercel 随后按既有流程自动构建和发布。

## 上线前配置

在 Vercel 项目 **Settings → Environment Variables** 中添加：

| 变量 | 用途 |
| --- | --- |
| `ADMIN_PASSWORD` | 后台登录密码。使用 20 位以上随机密码。 |
| `GITHUB_CONTENT_TOKEN` | GitHub Fine-grained personal access token，仅授予 `alexchenyiqin-droid/cyberpunk-portfolio` 的 **Contents: Read and write** 权限。 |

两项均应配置到 Production、Preview、Development 环境。不要将真实值提交到 Git。

可选变量已提供默认值，通常无需设置：

- `GITHUB_REPOSITORY_OWNER=alexchenyiqin-droid`
- `GITHUB_REPOSITORY_NAME=cyberpunk-portfolio`
- `GITHUB_CONTENT_BRANCH=main`

## 首次验证

部署完成后：

1. 打开 `https://www.alex9527.xyz/admin`。
2. 使用 `ADMIN_PASSWORD` 登录。
3. 新建一篇测试文章或修改一个作品，点击“保存并部署”。
4. 在 GitHub 提交历史中确认 `content: update projects and posts from admin`，等待 Vercel 部署完成。

后台密码只保存在当前浏览器标签页中；关闭标签页后需要重新登录。

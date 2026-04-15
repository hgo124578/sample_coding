# 0. 作業リポジトリへ移動
cd C:\work\your-repo

# 1. Node.js LTS をインストール
winget install OpenJS.NodeJS.LTS

# 2. ターミナルを開き直した後、確認
node -v
npm -v
npx -v

# 3. 公開 skills の一覧確認
npx skills add vercel-labs/agent-skills --list

# 4. GitHub Copilot 向けに導入
npx skills add vercel-labs/agent-skills -a github-copilot

# 5. 導入結果を確認
npx skills list


はい。-g を付けなければ、project 向けインストールです。
cd C:\work\your-repo

npx skills add vercel-labs/agent-skills -a github-copilot


特定の skill だけなら:

cd C:\work\your-repo

npx skills add vercel-labs/agent-skills --skill <skill名> -a github-copilot


# GitHub shorthand
npx skills add owner/repo

# GitHub のフルURL
npx skills add https://github.com/owner/repo

# repo内の特定skillだけ
npx skills add https://github.com/owner/repo/tree/main/skills/some-skill
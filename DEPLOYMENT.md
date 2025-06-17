# UPTZ Website - Vercel Deployment

## Quick Deployment Commands

```bash
# 1. Commit your latest changes
git add .
git commit -m "Ready for Vercel deployment"
git push origin main

# 2. If using Vercel CLI
npx vercel

# 3. For production deployment
npx vercel --prod
```

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables configured in Vercel
- [ ] Build completes successfully
- [ ] All routes accessible
- [ ] Images loading correctly
- [ ] Translations working
- [ ] Contact form functional (if applicable)

## Vercel URLs

- **Production:** https://uptz-web.vercel.app (or your custom domain)
- **Preview:** https://uptz-web-git-main-yourname.vercel.app

## Environment Variables to Add in Vercel

Copy these from your .env.local and .env.production files:
- Add them in Vercel Dashboard → Project → Settings → Environment Variables

## Post-Deployment

1. Test all pages and functionality
2. Configure custom domain if needed
3. Set up monitoring/analytics
4. Update any hardcoded URLs to use the new domain

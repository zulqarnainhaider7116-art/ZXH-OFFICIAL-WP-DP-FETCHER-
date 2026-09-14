# ZXH OFFICIAL WA·DP

Exact supplied frontend structure retained, with ZXH branding and Vercel API routes.

## Deploy
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel`
3. For production: `vercel --prod`

## API
- `/api/profile?url=...`
- `/api/channel?url=...`
- `/api/business?url=...`
- `/api/proxy?url=...&filename=...`

The channel route reads public channel-page metadata. Profile/business routes never fabricate a DP/cover and do not bypass WhatsApp privacy controls. A phone number alone does not provide an official unauthenticated WhatsApp DP endpoint.

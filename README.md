# Zalo Vercel Webhook Diagnostic

Vercel Environment Variables:
- BOT_TOKEN = Bot Token mới
- ADMIN_KEY = khóa quản trị riêng
- WEBHOOK_SECRET = secret webhook
- PUBLIC_BASE_URL = https://zalo-bot-webhook-trungqa.vercel.app

Sau khi lưu biến môi trường: Redeploy.

UI: /
Webhook: /webhook

Test: Get Me -> Get Webhook Info -> Cài Webhook -> Get Webhook Info -> gửi tin nhắn mới -> xem Vercel Logs tìm WEBHOOK_RECEIVED.

Không đưa BOT_TOKEN vào HTML hoặc log.

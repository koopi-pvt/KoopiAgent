# SendGrid Email Configuration Guide

## Overview
This app uses SendGrid for custom-branded email notifications including:
- **Email Confirmation** - Beautiful confirmation emails when users sign up
- **Welcome Email** - Sent automatically after email confirmation

## Configuration Steps

### 1. Supabase Email Settings

To enable custom email confirmation flow:

1. Go to your Supabase Dashboard → **Authentication** → **URL Configuration**
2. Set the **Site URL** to: `http://localhost:5173` (development) or your production URL
3. Add **Redirect URLs**:
   - `http://localhost:5173/confirm-email`
   - `http://localhost:5173/dashboard`
   - Add your production URLs as well

4. Go to **Authentication** → **Email Templates**
5. Customize the **Confirm signup** template to use your redirect URL:
   ```html
   <h2>Confirm your signup</h2>
   <p>Follow this link to confirm your email:</p>
   <p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>
   ```

### 2. Environment Variables

The `.env` file should contain:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SENDGRID_API_KEY=your_sendgrid_api_key
VITE_SENDER_EMAIL=hq@koopi.online
```

### 3. SendGrid Domain Verification (Production)

For production deployment:

1. Go to SendGrid Dashboard → **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender** or **Authenticate Your Domain**
3. For domain authentication (recommended):
   - Add the DNS records provided by SendGrid to your domain
   - Verify SPF, DKIM, and DMARC records
4. For single sender:
   - Verify the email address `hq@koopi.online`

### 4. Testing Email Flow

#### Development Testing:

1. **Sign up for a new account**
   ```
   http://localhost:5173/signup
   ```

2. **Check emails sent**:
   - Supabase sends built-in confirmation email
   - SendGrid sends custom styled confirmation email (parallel)
   - Both contain links to confirm email

3. **Click confirmation link**:
   - Redirects to `/confirm-email`
   - Automatically signs in user
   - Sends welcome email via SendGrid
   - Redirects to dashboard

#### Testing with curl:

```bash
# Test SendGrid email sending directly
curl -X POST https://api.sendgrid.com/v3/mail/send \
  -H "Authorization: Bearer YOUR_SENDGRID_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "personalizations": [{
      "to": [{"email": "test@example.com"}]
    }],
    "from": {"email": "hq@koopi.online"},
    "subject": "Test Email",
    "content": [{
      "type": "text/html",
      "value": "<h1>Test Email</h1>"
    }]
  }'
```

### 5. Email Templates

The app includes two custom email templates:

#### Confirmation Email
- Modern gradient design (purple/indigo)
- Clear CTA button
- Professional styling
- Located in: `/app/src/lib/emailService.ts`

#### Welcome Email
- Celebrates successful signup
- Lists key features
- Direct link to dashboard
- Green/emerald gradient theme

### 6. Troubleshooting

#### Emails not sending:
- Check SendGrid API key is valid
- Verify sender email is authenticated in SendGrid
- Check browser console for errors
- Check SendGrid Activity Feed for delivery status

#### Confirmation link not working:
- Verify redirect URLs in Supabase settings
- Check if Supabase email confirmation is enabled
- Test the confirmation URL format

#### User not auto-signed in after confirmation:
- Check if `verifyOtp` is working in ConfirmEmail component
- Verify token format from email link
- Check Supabase auth state change handler

### 7. Production Checklist

- [ ] Update Site URL in Supabase to production domain
- [ ] Add all production redirect URLs to Supabase
- [ ] Verify SendGrid domain authentication
- [ ] Update `.env` with production credentials
- [ ] Enable Supabase email rate limiting protection
- [ ] Set up SendGrid IP warming (if high volume)
- [ ] Monitor SendGrid delivery rates
- [ ] Set up email bounce/complaint webhooks

### 8. Notes

**Important**: 
- SendGrid API calls are made from the client side in this implementation
- For production, consider moving SendGrid calls to a backend/serverless function
- This prevents API key exposure and provides better security
- Current implementation is suitable for MVP/development

**Security**: 
- Never commit `.env` file to version control
- Use environment-specific API keys
- Rotate keys regularly
- Monitor API usage in SendGrid dashboard

## Support

For issues:
- SendGrid: https://docs.sendgrid.com/
- Supabase: https://supabase.com/docs/guides/auth

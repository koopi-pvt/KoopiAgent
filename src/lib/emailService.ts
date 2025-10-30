// Email service for SendGrid integration
// Note: For production, move this to a backend/serverless function
// This is a client-side implementation for MVP purposes

const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;
const SENDER_EMAIL = import.meta.env.VITE_SENDER_EMAIL;

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(template: EmailTemplate): Promise<boolean> {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SENDGRID_API_KEY}`
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: template.to }]
          }
        ],
        from: { email: SENDER_EMAIL },
        subject: template.subject,
        content: [
          {
            type: 'text/html',
            value: template.html
          }
        ]
      })
    });

    return response.status === 202;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export function generateConfirmationEmail(email: string, confirmationUrl: string): EmailTemplate {
  return {
    to: email,
    subject: '🎉 Confirm Your KoopiAgent Account',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              color: #ffffff;
              font-size: 32px;
              font-weight: 700;
            }
            .content {
              padding: 40px 30px;
            }
            .content p {
              color: #4a5568;
              font-size: 16px;
              line-height: 1.6;
              margin: 0 0 20px 0;
            }
            .button {
              display: inline-block;
              padding: 16px 40px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #ffffff;
              text-decoration: none;
              border-radius: 30px;
              font-weight: 600;
              font-size: 16px;
              margin: 20px 0;
              transition: transform 0.2s;
            }
            .button:hover {
              transform: scale(1.05);
            }
            .footer {
              background: #f7fafc;
              padding: 30px;
              text-align: center;
              color: #718096;
              font-size: 14px;
            }
            .divider {
              height: 1px;
              background: #e2e8f0;
              margin: 30px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Welcome to KoopiAgent!</h1>
            </div>
            <div class="content">
              <p>Hey there! 👋</p>
              <p>We're excited to have you join KoopiAgent! You're just one click away from accessing your dashboard and starting your journey.</p>
              <p><strong>Click the button below to confirm your email address:</strong></p>
              <center>
                <a href="${confirmationUrl}" class="button">Confirm My Email</a>
              </center>
              <div class="divider"></div>
              <p style="font-size: 14px; color: #718096;">If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="font-size: 12px; color: #a0aec0; word-break: break-all;">${confirmationUrl}</p>
            </div>
            <div class="footer">
              <p>If you didn't create an account with KoopiAgent, you can safely ignore this email.</p>
              <p style="margin-top: 10px;">&copy; 2025 KoopiAgent. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  };
}

export function generateWelcomeEmail(email: string, userName: string): EmailTemplate {
  return {
    to: email,
    subject: '🚀 Welcome to KoopiAgent - Let\'s Get Started!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 50px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              color: #ffffff;
              font-size: 36px;
              font-weight: 700;
            }
            .header p {
              color: rgba(255, 255, 255, 0.9);
              font-size: 18px;
              margin: 10px 0 0 0;
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              color: #2d3748;
              font-size: 24px;
              margin: 0 0 20px 0;
            }
            .content p {
              color: #4a5568;
              font-size: 16px;
              line-height: 1.6;
              margin: 0 0 20px 0;
            }
            .features {
              background: #f7fafc;
              border-radius: 12px;
              padding: 30px;
              margin: 30px 0;
            }
            .feature {
              display: flex;
              align-items: start;
              margin-bottom: 20px;
            }
            .feature:last-child {
              margin-bottom: 0;
            }
            .feature-icon {
              font-size: 24px;
              margin-right: 15px;
            }
            .feature-text h3 {
              margin: 0 0 5px 0;
              color: #2d3748;
              font-size: 18px;
            }
            .feature-text p {
              margin: 0;
              color: #718096;
              font-size: 14px;
            }
            .button {
              display: inline-block;
              padding: 16px 40px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #ffffff;
              text-decoration: none;
              border-radius: 30px;
              font-weight: 600;
              font-size: 16px;
              margin: 20px 0;
              transition: transform 0.2s;
            }
            .button:hover {
              transform: scale(1.05);
            }
            .footer {
              background: #f7fafc;
              padding: 30px;
              text-align: center;
              color: #718096;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome Aboard, ${userName}!</h1>
              <p>Your account is now active</p>
            </div>
            <div class="content">
              <h2>You're All Set! 🚀</h2>
              <p>Congratulations! Your email has been confirmed and your KoopiAgent account is ready to use.</p>
              
              <div class="features">
                <div class="feature">
                  <div class="feature-icon">✨</div>
                  <div class="feature-text">
                    <h3>AI-Powered Projects</h3>
                    <p>Create amazing projects with our intelligent agent system</p>
                  </div>
                </div>
                <div class="feature">
                  <div class="feature-icon">📊</div>
                  <div class="feature-text">
                    <h3>Your Dashboard</h3>
                    <p>Track all your projects and monitor progress in real-time</p>
                  </div>
                </div>
                <div class="feature">
                  <div class="feature-icon">🌐</div>
                  <div class="feature-text">
                    <h3>Community Projects</h3>
                    <p>Explore and get inspired by projects from other creators</p>
                  </div>
                </div>
                <div class="feature">
                  <div class="feature-icon">🎯</div>
                  <div class="feature-text">
                    <h3>Start with 100 Credits</h3>
                    <p>We've added free credits to get you started!</p>
                  </div>
                </div>
              </div>

              <p><strong>Ready to create something amazing?</strong></p>
              <center>
                <a href="${window.location.origin}/dashboard" class="button">Go to Dashboard</a>
              </center>
            </div>
            <div class="footer">
              <p>Need help? Reply to this email or check out our documentation.</p>
              <p style="margin-top: 10px;">&copy; 2025 KoopiAgent. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  };
}

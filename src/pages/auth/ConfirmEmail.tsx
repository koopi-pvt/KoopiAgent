import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendEmail, generateWelcomeEmail } from '../../lib/emailService';

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function confirmEmail() {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (!token || type !== 'signup') {
          setStatus('error');
          setMessage('Invalid confirmation link');
          return;
        }

        // Exchange token for session
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        });

        if (error) throw error;

        if (data.user) {
          setStatus('success');
          setMessage('Email confirmed successfully! Redirecting to dashboard...');

          // Send welcome email
          try {
            const userName = data.user.user_metadata?.full_name || 'there';
            const welcomeEmail = generateWelcomeEmail(data.user.email!, userName);
            await sendEmail(welcomeEmail);
          } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Don't block the confirmation flow if welcome email fails
          }

          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      } catch (error: any) {
        console.error('Confirmation error:', error);
        setStatus('error');
        setMessage(error.message || 'Failed to confirm email. Please try again.');
      }
    }

    confirmEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center animate-slide-up">
          {status === 'loading' && (
            <>
              <Loader2 className="w-16 h-16 text-white mx-auto mb-4 animate-spin" />
              <h2 className="text-white font-semibold text-2xl mb-2">Confirming Email...</h2>
              <p className="text-white/80">Please wait while we verify your account</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-500/20 border-2 border-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-white font-semibold text-2xl mb-2">Email Confirmed!</h2>
              <p className="text-white/80">{message}</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-500/20 border-2 border-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-10 h-10 text-red-400" />
              </div>
              <h2 className="text-white font-semibold text-2xl mb-2">Confirmation Failed</h2>
              <p className="text-white/80 mb-6">{message}</p>
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Go to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

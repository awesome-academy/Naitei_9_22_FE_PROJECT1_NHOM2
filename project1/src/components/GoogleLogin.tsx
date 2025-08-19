import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { Button } from './ui/button';

interface GoogleLoginProps {
    handleLogin: (token: string) => void;
}

function GoogleLoginButton({ handleLogin }: GoogleLoginProps) {
    const login = useGoogleLogin({
        onSuccess: (response) => handleLogin(response.access_token),
        onError: () => toast.error("Đăng nhập thất bại"),
        scope: 'email profile'
    });
    
    
    return (
        <Button
            onClick={() => login()}
            className="flex bg-white cursor-pointer items-center justify-center gap-2 w-full px-4 py-2 border rounded-full shadow hover:bg-gray-100 transition"
        >
            <Image
                src="/google-icon.svg"
                alt="Google"
                width="20"
                height="20"
                className="w-5 h-5 justify-center"
            />
            <span className="text-gray-700 font-medium">Tiếp tục với Google</span>
        </Button>
    );
}

export default function GoogleLoginComponent({ handleLogin }: GoogleLoginProps) {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
            <GoogleLoginButton handleLogin={handleLogin} />
        </GoogleOAuthProvider>
    );
}
 

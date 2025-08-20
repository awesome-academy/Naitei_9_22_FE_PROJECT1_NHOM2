import FacebookLogin from "@greatsumini/react-facebook-login";
import { SuccessResponse } from "@greatsumini/react-facebook-login";
import Image from "next/image";
import { Button } from "./ui/button";

interface FacebookLoginProps {
    handleLogin: (token: string) => void;
}

export default function FacebookLoginComponent({ handleLogin }: FacebookLoginProps) {
    return (
        <div className="w-full">
            <FacebookLogin
                appId={process.env.NEXT_PUBLIC_FACEBOOK_ID || ""}
                autoLoad={false}
                fields="name,email,picture"
                onSuccess={(res) => handleLogin(res.accessToken)}
                render={({ onClick }) => (
                    <Button
                        onClick={onClick}
                        className="bg-white cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2 border rounded-full shadow hover:bg-gray-100 transition"
                        >
                        <Image
                            src="/facebook-icon.svg" 
                            alt="Facebook" 
                            width="20" 
                            height="20"
                            className="w-5 h-5"
                        />
                        <span className="text-gray-700 font-medium">Tiếp tục với Facebook</span>
                    </Button>
                )}
            />
        </div>
    );
}
  

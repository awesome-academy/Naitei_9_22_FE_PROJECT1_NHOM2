'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {Button} from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { login } from '@/services/auth';
import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        
        try {
            const response = await login(email, password, remember);
            
            if (response.token) {
                // Login thành công - token đã được lưu vào cookie
                router.push("/");
            } else {
                setError(response.message || "Email hoặc mật khẩu không đúng");
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.status === 401) {
                setError("Email hoặc mật khẩu không đúng");
            } else {
                setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleForgotPassword = async () => {
        router.push(ROUTES.FORGOT_PASSWORD);
    }

    return (
        <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl w-full overflow-hidden">
                <div className="flex flex-col md:flex-row space-x-12 justify-center">
                    <div className="md:w-1/2 flex flex-col p-1">
                        <h2 className="text-2xl font-bold mb-12 text-left text-emerald-500">THÔNG TIN CÁ NHÂN</h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <Label htmlFor="email" className="block text-xs mb-2">Email của bạn</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="password" className="block text-xs mb-2">
                                    Mật khẩu
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && (
                                <div className="text-red-600 text-sm text-center bg-red-100 p-2 rounded">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-left space-x-8 items-center">
                                <div className="flex items-center">
                                    <Checkbox
                                        id="remember"
                                        className="mr-2"
                                        checked={remember}
                                        onCheckedChange={(checked) => setRemember(checked === true)}
                                    />
                                    <Label htmlFor="remember" className="text-xs font-medium">
                                        Ghi nhớ tài khoản
                                    </Label>
                                </div>
                                
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-xs italic text-gray-500 hover:text-gray-700 underline"
                                >
                                    Bạn quên mật khẩu ?
                                </button>
                            </div>

                            <Button
                                type="submit"
                                variant="default"
                                disabled={isLoading}
                                size="default"
                                className="cursor-pointer bg-emerald-500 text-white hover:bg-white hover:text-emerald-500 border-emerald-500 border-1 focus:ring-emerald-500 focus:ring-offset-emerald-500 rounded-3xl focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 w-auto"
                            >
                                {isLoading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}
                            </Button>
                        </form>
                    </div>

                    <div className="md:w-1/2 flex flex-col">
                        <h2 className="text-2xl font-bold mb-4 text-left text-emerald-500">BẠN CHƯA CÓ TÀI KHOẢN ?</h2>
                        <p className="text-gray-500 text-left text-xs mb-8">
                            Đăng ký tài khoản ngay để có thể mua hàng nhanh chóng và dễ dàng hơn ! 
                            Ngoài ra còn có thể theo dõi tình trạng đơn hàng của mình.
                        </p>
                        <div className="flex">
                            <Button
                                onClick={() => router.push("/register")}
                                size="default"
                                variant="default"
                                className="cursor-pointer bg-emerald-500 text-white hover:bg-white hover:text-emerald-500 border-emerald-500 border-1 focus:ring-emerald-500 focus:ring-offset-emerald-500 rounded-3xl focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 w-auto"
                            >
                                ĐĂNG KÝ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


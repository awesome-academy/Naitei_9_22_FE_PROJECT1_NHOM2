'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {Button} from '@/components/ui/button';
import { register } from '@/services/auth';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { validateRegistrationData, type RegistrationData } from '@/utils/validation';
import { Label } from '@/components/ui/label';


export default function Register() {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [receiveEmail, setReceiveEmail] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const validationResult = validateRegistrationData({
                fullName,
                phone,
                email,
                website,
                password,
                confirmPassword
            });

            if (!validationResult.isValid) {
                setErrors(validationResult.errors);
                return;
            }

            setErrors([]);

            const userData = {
                fullName: fullName.trim(),
                phone: phone.trim(),
                email: email.trim(),
                website: website.trim(),
                password,
                confirmPassword,
                receiveEmail
            };

            const result = await register(userData);
            
            if (result.success) {
                router.push("/login");
            } else {
                setErrors([result.message || "Đăng ký không thành công. Vui lòng thử lại."]);
            }
            
        } catch (error: any) {
            if (error.response?.data?.message) {
                setErrors([error.response.data.message]);
            } else if (error.message) {
                setErrors([error.message]);
            } else {
                setErrors(["Đã có lỗi xảy ra. Vui lòng thử lại."]);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoBack = () => {
        router.back();
    }

    return (
        <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl w-full overflow-hidden p-1">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-16">
                        <div>
                            <h2 className="text-2xl font-bold mb-8 text-left text-emerald-500">THÔNG TIN CÁ NHÂN</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <Label htmlFor="fullName" className="block text-xs mb-2">
                                        Họ và tên <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="phone" className="block text-xs mb-2">
                                        Số ĐT <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email" className="block text-xs mb-2">
                                        Địa chỉ email <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="website" className="block text-xs mb-2">
                                        Website của bạn <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="website"
                                        type="url"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-center mt-8">
                                <Checkbox
                                    id="receiveEmail"
                                    className="mr-2"
                                    checked={receiveEmail}
                                    onCheckedChange={(checked) => setReceiveEmail(checked === true)}
                                />
                                <Label htmlFor="receiveEmail" className="text-xs font-medium">
                                    Đăng ký nhận thông tin qua email
                                </Label>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-12 text-left text-emerald-500">THÔNG TIN TÀI KHOẢN</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <Label htmlFor="password" className="block text-xs mb-2">
                                        Mật khẩu <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="confirmPassword" className="block text-xs mb-2">
                                        Nhập lại mật khẩu <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {errors.length > 0 && (
                                <div className="text-red-600 text-sm text-center bg-red-100 p-2 rounded mt-8 whitespace-pre-line">
                                    {errors.join("\n")}
                                </div>
                            )}

                            <div className="flex space-x-4 mt-8">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={handleGoBack}
                                    size="default"
                                    className="cursor-pointer bg-white text-emerald-500 hover:bg-emerald-500 hover:text-white border-emerald-500 border-1 focus:ring-emerald-500 focus:ring-offset-emerald-500 rounded-3xl focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 w-auto"
                                    >
                                    QUAY LẠI
                                </Button>
                                
                                <Button
                                    type="submit"
                                    variant="default"
                                    size="default"
                                    className="cursor-pointer bg-emerald-500 text-white hover:bg-white hover:text-emerald-500 border-emerald-500 border-1 focus:ring-emerald-500 focus:ring-offset-emerald-500 rounded-3xl focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 w-auto"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "ĐANG ĐĂNG KÝ..." : "ĐĂNG KÝ"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
} 


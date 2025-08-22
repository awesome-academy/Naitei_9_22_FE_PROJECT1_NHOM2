'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { completeProfile } from '@/services/auth';

interface ProfileCompletionProps {
  onComplete?: () => void;
}

export default function ProfileCompletion({ onComplete }: ProfileCompletionProps) {
  const [formData, setFormData] = useState({
    phone: "",
    address: ""
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const formFields = [
    {
      id: "phone",
      label: "Số điện thoại *",
      type: "tel",
      placeholder: "Nhập số điện thoại",
      value: formData.phone,
    },
    {
      id: "address", 
      label: "Địa chỉ *",
      type: "text",
      placeholder: "Nhập địa chỉ",
      value: formData.address,
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.phone || !formData.address) {
      setError("Vui lòng điền đầy đủ thông tin");
      setIsLoading(false);
      return;
    }

    const phoneRegex = /^[0-9+\-\s\(\)]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Số điện thoại không hợp lệ");
      setIsLoading(false);
      return;
    }

    try {
      const response = await completeProfile(formData.phone, formData.address);
      
      if (response.success) {
        if (onComplete) {
          onComplete();
        } else {
          router.push("/");
        }
      } else {
        setError(response.message || "Có lỗi xảy ra");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-emerald-500 text-2xl font-bold text-center">
            Hoàn thiện thông tin
          </CardTitle>
          <CardDescription className="text-center">
            Để có trải nghiệm tốt nhất, vui lòng cung cấp thêm thông tin sau
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-xs block mb-2">{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            ))}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="cursor-pointer bg-emerald-500 text-white hover:bg-white hover:text-emerald-500 border-emerald-500 border-1 focus:ring-emerald-500 focus:ring-offset-emerald-500 rounded-3xl focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Hoàn thành"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Thông tin này sẽ được sử dụng để xử lý đơn hàng và giao hàng
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

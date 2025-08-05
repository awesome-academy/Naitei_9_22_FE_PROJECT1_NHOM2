"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Edit, Save, X } from "lucide-react";
import { User as UserType } from "@/types/User";

interface ProfileInfoProps {
  user: UserType;
  onLogout: () => void;
  onViewOrders: () => void;
  onUpdateProfile?: (updatedUser: Partial<UserType>) => void;
}

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  placeholder?: string;
  className?: string;
}

const FormField = ({ id, label, value, onChange, isEditing, placeholder, className = "" }: FormFieldProps) => (
  <div className={`space-y-2 ${className}`}>
    <Label htmlFor={id}>{label}</Label>
    <Input 
      id={id} 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      readOnly={!isEditing}
      placeholder={placeholder}
    />
  </div>
);

export default function ProfileInfo({ user, onLogout, onViewOrders, onUpdateProfile }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone || '',
    website: user.website || '',
    address: user.address || ''
  });

  const formFields = [
    {
      id: 'name',
      label: 'Họ và tên',
      field: 'fullName',
      placeholder: undefined,
      className: ''
    },
    {
      id: 'email',
      label: 'Email',
      field: 'email',
      placeholder: undefined,
      className: ''
    },
    {
      id: 'phone',
      label: 'Số điện thoại',
      field: 'phone',
      placeholder: 'Nhập số điện thoại',
      className: ''
    },
    {
      id: 'website',
      label: 'Website',
      field: 'website',
      placeholder: 'Nhập website',
      className: ''
    },
    {
      id: 'address',
      label: 'Địa chỉ',
      field: 'address',
      placeholder: 'Nhập địa chỉ',
      className: 'md:col-span-2'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone || '',
      website: user.website || '',
      address: user.address || ''
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Thông tin cá nhân
            </CardTitle>
            <CardDescription>
              Cập nhật thông tin cá nhân của bạn
            </CardDescription>
          </div>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Chỉnh sửa
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Hủy
              </Button>
              <Button 
                size="sm" 
                onClick={handleSave}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <Save className="w-4 h-4" />
                Lưu
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map((field) => (
            <FormField
              key={field.id}
              id={field.id}
              label={field.label}
              value={isEditing ? String(formData[field.field as keyof typeof formData]) : String(user[field.field as keyof typeof user] || 'Chưa cập nhật')}
              onChange={(value) => handleInputChange(field.field, value)}
              isEditing={isEditing}
              placeholder={field.placeholder}
              className={field.className}
            />
          ))}
        </div>

        <Separator />

        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onViewOrders}>
            Xem lịch sử mua hàng
          </Button>
          <Button variant="destructive" onClick={onLogout}>
            Đăng xuất
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

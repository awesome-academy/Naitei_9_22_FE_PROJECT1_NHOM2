'use client';

import React, { useState } from 'react';
import AccountsTab from '@/components/admin/AccountsTab';
import OrdersTab from '@/components/admin/OrdersTab';
import ProductsTab from '@/components/admin/ProductsTab';
import StatisticTab from '@/components/admin/StatisticTab';
import { Button } from '@/components/ui/button';
import { StatsIcon, OrdIcon, PrdIcon, AccIcon } from '@/assets/icons';


interface Tab {
  id: 'statistics' | 'accounts' | 'orders' | 'products';
  name: string;
  icon: React.ReactNode;
  color: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('statistics');

  const tabs: Tab[] = [
    {
      id: 'statistics',
      name: 'Thống kê',
      icon: (<StatsIcon/>),
      color: 'orange'
    },
    {
      id: 'accounts',
      name: 'Quản lý tài khoản',
      icon: (<AccIcon/>),
      color: 'blue'
    },
    {
      id: 'orders',
      name: 'Quản lý đơn hàng',
      icon: (<OrdIcon/>),
      color: 'green'
    },
    {
      id: 'products',
      name: 'Quản lý sản phẩm',
      icon: (<PrdIcon/>),
      color: 'purple'
    }
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'statistics':
        return <StatisticTab />;
      case 'accounts':
        return <AccountsTab />;
      case 'orders':
        return <OrdersTab />;
      case 'products':
        return <ProductsTab />;
      default:
        return <StatisticTab />;
    }
  };

  const getTabClasses = (tab: Tab) => {
    const isActive = activeTab === tab.id;
    const baseClasses = "flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer";
    
    if (isActive) {
      return `${baseClasses} bg-${tab.color}-100 text-${tab.color}-700 border border-${tab.color}-200`;
    }
    
    return `${baseClasses} text-gray-600 hover:text-${tab.color}-700 hover:bg-${tab.color}-50`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Trang Quản Trị
          </h1>
          <p className="text-gray-600">
            Thống kê, quản lý tài khoản, đơn hàng và sản phẩm của hệ thống
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex space-x-1 border-b border-gray-200">
            {tabs.map((tab) => (
              <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={getTabClasses(tab)}
              variant={activeTab === tab.id ? "secondary" : "ghost"}
              size="lg"
            >
              <span className="flex items-center gap-2 text-lg font-semibold">
                {tab.icon}
                {tab.name}
              </span>
            </Button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md">
          {getTabContent()}
        </div>
      </div>
    </div>
  );
} 
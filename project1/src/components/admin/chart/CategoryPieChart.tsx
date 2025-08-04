"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import dbData from "../../../../db.json";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

// Tạo dữ liệu cho pie chart phân bố danh mục
const createCategoryDistribution = () => {
  const products = dbData.products;

  interface CategoryDistribution {
    name: string;
    value: number;
  }

  const categoryDistribution = products.reduce<CategoryDistribution[]>(
    (acc: CategoryDistribution[], product: { category: string }) => {
      const existingCategory = acc.find(
        (c: CategoryDistribution) => c.name === product.category
      );
      if (existingCategory) {
        existingCategory.value += 1;
      } else {
        acc.push({
          name: product.category,
          value: 1,
        });
      }
      return acc;
    },
    []
  );

  return categoryDistribution;
};

export default function CategoryPieChart() {
  const categoryDistribution = createCategoryDistribution();

  return (
    <div>
      {/* Phân bố danh mục */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Phân bố danh mục sản phẩm
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${((percent || 0) * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryDistribution.map((entry, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

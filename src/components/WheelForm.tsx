"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "./ui/Input";

export default function WheelForm() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
  });
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // validation errors
  const [errors, setErrors] = useState<{
    customerName?: string;
    customerPhone?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "الاسم مطلوب";
    } else if (formData.customerName.trim().length < 3) {
      newErrors.customerName = "الاسم يجب أن يكون 3 أحرف على الأقل";
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "رقم الهاتف مطلوب";
    } else if (formData.customerPhone.length < 5) {
      newErrors.customerPhone = "رقم الجوال يجب لا يقل عن 5 أرقام";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);
    setOtp(null);

    try {
      const res = await fetch("https://alghazal.info/wheel/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("حدث خطأ أثناء الإرسال");
      }

      const data = await res.json();
      setOtp(data.otp);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError((err as { message: string }).message || "حدث خطأ غير متوقع");
      } else {
        setError("حدث خطأ غير متوقع");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: undefined,
    });
  };

  const handleReset = () => {
    setOtp(null);
    setFormData({ customerName: "", customerPhone: "" });
    setErrors({});
  };

  return (
    <div className="flex items-start justify-center p-4 mt-24 lg:mt-36">
      <Card className="w-full max-w-md bg-transparent shadow-none border-none">
        <CardContent className="bg-transparent">
          {!otp && (
            <form onSubmit={handleSubmit} className="lg:scale-150 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم</Label>
                <Input
                  id="name"
                  name="customerName"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={`text-right bg-white ${
                    errors.customerName ? "border-red-500" : ""
                  }`}
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm">{errors.customerName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الجوال السعودي</Label>
                <Input
                  id="phone"
                  name="customerPhone"
                  type="tel"
                  placeholder="05xxxxxxxx"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className={`text-right bg-white ${
                    errors.customerPhone ? "border-red-500" : ""
                  }`}
                />
                {errors.customerPhone && (
                  <p className="text-red-500 text-sm">{errors.customerPhone}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "جاري الإرسال..." : "إرسال"}
              </Button>
            </form>
          )}

          {otp && (
            <div className="mt-6 space-y-4 text-center">
              <div className="p-4 bg-green-100 text-green-800 rounded-lg text-lg font-bold tracking-widest">
                رمز التحقق (OTP): <span className="text-2xl">{otp}</span>
              </div>

              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                إدخال بيانات جديدة
              </Button>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg text-center">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

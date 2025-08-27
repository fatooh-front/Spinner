// app/[locale]/(site)/branch/[id]/CarList.tsx
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import NextFallbackImage from "../../../src/components/NextFallbackImage";
import { Card } from "../../../src/components/ui/card";

interface Car {
  carCode: string;
  carName: string;
  image?: string;
  dailyRentPrice: number;
  currency: string;
}

export default function CarList({
  branchId,
  initialCars,
}: {
  branchId: string;
  initialCars: Car[];
}) {
  const [cars, setCars] = useState<Car[]>(
    Array.isArray(initialCars) ? initialCars : []
  );
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://alghazal.link:9090/branch/${branchId}?page=${page}&size=10&sortBy=DAILY_RENT_PRICE&sortDir=asc`
      );
      if (Array.isArray(res.data?.content) && res.data.content.length > 0) {
        setCars((prev) => [...prev, ...res.data.content]);
        setPage((p) => p + 1);
      } else {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        hasMore
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore]);

  return (
    <div className="space-y-4 flex flex-col items-center">
      {cars.map((car, index) => (
        <Card
          key={index}
          className="bg-white/90 p-[8px] h-[88px] w-[327px] border-[#CE931A99] backdrop-blur-sm border  rounded-lg shadow-sm"
        >
          <div className=" flex items-center justify-between">
            <div className="flex-shrink-0 ml-4">
              <NextFallbackImage
                width={118}
                height={72}
                fallback="https://alghazal.sa/uploads/1700951082740.webp"
                src={
                  "https://viganium.co/uploads/" + car.carCode + ".png" ||
                  "/placeholder.svg"
                }
                alt={car.carName}
                className="w-[118px] h-[72px] object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-semibold text-gray-800 mb-2">
                {car.carName.length > 17
                  ? `${car.carName.slice(0, 17)}...`
                  : car.carName}
              </h3>
              <div className="flex items-center  justify-end gap-1">
                <span className="text-[20px] font-bold text-[#CE931A]">
                  {car.dailyRentPrice}  
                </span>
                <span className="text-[20px] text-gray-600">
                  {car.currency}/يوم
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {loading && <p className="text-center text-gray-500">جار التحميل...</p>}
      {!hasMore && (
        <p className="text-center text-gray-400">لا توجد سيارات إضافية</p>
      )}
    </div>
  );
}

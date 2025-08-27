import NextFallbackImage from "./NextFallbackImage";
import { Card } from "./ui/card";

interface Car {
  carCode: string;
  carName: string;
  image?: string;
  dailyRentPrice: number;
  currency: string;
}

export default function CarList({
  // branchId,
  initialCars,
}: {
  // branchId: string;
  initialCars: Car[];
}) {
  // const [cars, setCars] = useState<Car[]>(
  //   Array.isArray(initialCars) ? initialCars : []
  // );
  // const [page, setPage] = useState(2);
  // const [loading, setLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(true);

  // const loadMore = async () => {
  //   if (loading || !hasMore) return;
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(
  //       `http://192.168.68.63/branch/${branchId}?page=${page}&size=10&sortBy=DAILY_RENT_PRICE&sortDir=asc`
  //     );
  //     if (Array.isArray(res.data?.content) && res.data.content.length > 0) {
  //       setCars((prev) => [...prev, ...res.data.content]);
  //       setPage((p) => p + 1);
  //     } else {
  //       setHasMore(false);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Infinite scroll detection
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //         document.body.offsetHeight - 200 &&
  //       hasMore
  //     ) {
  //       loadMore();
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [page, hasMore]);

  return (
    <div dir="rtl" className="space-y-4 flex flex-col items-center mb-16">
      {initialCars.map((car, index) => (
        <Card
          key={index}
          className="bg-white/90 p-[8px]  w-[327px] border-[#CE931A99] backdrop-blur-sm border  rounded-lg shadow-sm"
        >
          <div>
            <h3 className="text-[19px] text-start font-semibold text-gray-800 ">
              {car.carName}
            </h3>
            <div className=" flex items-center justify-between">
              <div className="flex-shrink-0 ">
                <NextFallbackImage
                  height={100}
                  fallback="https://viganium.co/uploads/1756041447041.png"
                  src={
                    "https://viganium.co/uploads/" + car.carCode + ".png" ||
                    "/placeholder.svg"
                  }
                  alt={car.carName}
                  className="h-[95px]  scale-[1.3] object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center  justify-end gap-1">
                  <span className="text-[20px] font-bold text-[#CE931A]">
                    {(car.dailyRentPrice * 1.15).toFixed(2)}
                  </span>
                  <span className="text-[20px] text-gray-600">
                    {car.currency}/يوم
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* {loading && <p className="text-center text-gray-500">جار التحميل...</p>}
      {!hasMore && (
        <p className="text-center text-gray-400">لا توجد سيارات إضافية</p>
      )} */}
    </div>
  );
}

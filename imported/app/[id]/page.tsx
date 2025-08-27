import axios from "axios";
import CarList from "./CarList";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const res = await axios.get(
    `https://alghazal.info/branch/${id}?page=1&size=10&sortBy=DAILY_RENT_PRICE&sortDir=asc`
  );

  const carsData = res.data ?? [];

  console.log(carsData);

  return (
    <div
      className="min-h-screen font-cairo bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/background.png)" }}
    >
      <div className="min-h-screen bg-black/10 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              مرحبا بك في فرع {carsData?.[0]?.branchName}
            </h1>
            <p className="text-lg text-gray-700">
              هذه هي السيارات المتاحة اليوم لخدمتك
            </p>
          </div>

          {/* Car Listings */}
          <CarList branchId={id} initialCars={carsData} />
        </div>
      </div>
    </div>
  );
}

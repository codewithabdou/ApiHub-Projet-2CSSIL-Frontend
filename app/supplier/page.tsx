"use client";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import {revenuePerMonthSup} from "@services/api/statistics/getRevenuPerMonth";
import {revenuePerDaySup} from "@services/api/statistics/getRevenuePerDay";
import {revenuePerHourSup} from "@services/api/statistics/getRevenuePerHour";
import {totalRevenuSup} from "@services/api/statistics/getTotalRevenue";
import StatCard from "@app/components/Shared/StatCard";
import { IMAGES } from "@config";
import months from "@helpers/statsHelpers";
import totalApiNumber from "@services/api/statistics/totalApisNumber";
import { getUsersBySupCount } from "@services/api/statistics/usersByApiCount";

const AdminDashboard = () => {
  interface ChartData {
    labels: number[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }[];
  }
  
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2024");
  const [days, setDays] = useState([]);
  const [total, setTotal] = useState(0);
  const [nbApis, setNbApis] = useState(0);
  const [nbSubs, setNbSubs] = useState(0);



  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [data, setdata] = useState<{ label: number, value: number }[]>([]);
  const [text,setText]=useState("Revenue total par mois");
   useEffect(()=>{
    const getTotal=async ()=>{
      const result=await totalRevenuSup();
      setTotal(result)
    }
    const getGenStats=async()=>{
      const result=await totalApiNumber();
      const res=await getUsersBySupCount();
      setNbApis((result));
      setNbSubs(res)
      console.log
      (result)
    }
    getTotal()
    getGenStats();

   },[])
  useEffect(() => {
    if(year!=="" && month!=="" && day!==""){
      perHour(month,year,day)
      setText("Revenue total par heures")
    }else
    if (year!=="" && month!=="" && day==="") {
      setText("Revenue total par Jours")
      perDay(month,year)
    }else {
      setText("Revenue total par mois")
      perMonth(year);
    }
    
  }, [year,month,day]);

  useEffect(() => {
    if (month && year) {
      const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
      const daysArray: any = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      setDays(daysArray);
      setDay("");
    }
  }, [month, year]);

  
  const perMonth = async (year: string) => {
    const result:any = await revenuePerMonthSup(year);
    const allMonths = Array.from({ length: 12 }, (_, i) => ({
      label: i + 1,
      value: 0,
    }));

    result.forEach((data: { month: number; total_revenues: number }) => {
      const index = allMonths.findIndex(item => item.label === data.month);
      if (index !== -1) {
        allMonths[index].value = data.total_revenues;
      }
    });

    setdata(allMonths);
  };
  const perDay=async(month:string,year:string)=>{
    const result:any=await revenuePerDaySup(year,month);
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    const allDays = Array.from({ length: daysInMonth }, (_, i) => ({
      label: i + 1,
      value: 0,
    }));
    result.forEach((data: { day: number; total_revenues: number }) => {
      const index = allDays.findIndex(item => item.label === data.day);
      if (index !== -1) {
        allDays[index].value = data.total_revenues;
      }
    });
    setdata(allDays);

  }
  const perHour=async(month:string,year:string,day:string)=>{
    const result:any=await revenuePerHourSup(year,month,day);
    const allHours = Array.from({ length: 24 }, (_, i) => ({
      label: i + 1,
      value: 0,
    }));
    result.forEach((data: { day: number; total_revenues: number }) => {
      const index = allHours.findIndex(item => item.label === data.day);
      if (index !== -1) {
        allHours[index].value = data.total_revenues;
      }
    });
    setdata(allHours);

  }
  useEffect(() => {
    const newChartData = {
      labels: data.map((data) => data.label),
      datasets: [
        {
          label: "Revenues Totals",
          data: data.map((data) => data.value),
          backgroundColor: ["#97A7F7"],
          borderColor: "#97A7F7",
          borderWidth: 1,
        },
      ],
    };
    setChartData(newChartData);
  }, [data]);

  
  Chart.register(CategoryScale);
  return (
    <div className="flex flex-col justify-center items-center gap-y-7">
      <div className="w-[95%] p-2 flex justify-start">
      <h1 className="text-2xl font-bold">Fournisseur Dashboard</h1>
      </div>
      <div className="w-full  flex items-center justify-around flex-wrap gap-5">
        <StatCard description="Total APIs" value={nbApis} icon={IMAGES.STATS.purchase}></StatCard>
        <StatCard description="Total abonnés" value={nbSubs} icon={IMAGES.STATS.admin}></StatCard>
        <StatCard description="Revenue total" value={total} icon={IMAGES.STATS.money}></StatCard>
      </div>
    

      <div className="p-3 w-[95%] gap-y-5 h-1/4 bg-white rounded-2 flex flex-col justify-center items-center rounded-[10px]">
          <div className="w-full p-2 flex justify-start items-center">
      <h1 className="text-2xl text-primary font-bold">Revenue  : </h1>
      <span className="text-2xl font-bold text-[#35C05C]">{total} DZD</span>
      </div>
      <div className="w-full flex justify-end">
  <div className="w-[90%] flex md:flex-row flex-col justify-evenly items-center">
  <label htmlFor="year">Année</label>
  <Select   value={year} onValueChange={(value) => {setYear(value); setMonth("")}}>
    <SelectTrigger className="w-[180px] bg-white rounded-[20px] ">
      <SelectValue placeholder="Année" />
    </SelectTrigger>
    <SelectContent >
      {Array.from({ length: 11 }, (_, i) => 2024 + i).map((y) => (
        <SelectItem  key={y} value={y.toString()}>
          {y}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  <label htmlFor="month">Mois</label>
  <Select value={month}  onValueChange={(value) => setMonth(value)}>
    <SelectTrigger className="w-[180px] bg-white rounded-[20px]">
      <SelectValue placeholder="Mois" />
    </SelectTrigger>
    <SelectContent>
      {months.map((month, key) => (
        <SelectItem key={key} value={month.value}>
          {month.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  <label htmlFor="day">Jour</label>
  <Select value={day}  onValueChange={(value) => setDay(value)}>
    <SelectTrigger className="w-[180px] bg-white rounded-[20px]">
      <SelectValue placeholder="Jour" />
    </SelectTrigger>
    <SelectContent>
      {days.map((d, index) => (
        <SelectItem key={index} value={`${index + 1}`}>
          {d}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
</div>
        <Line
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: text,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;

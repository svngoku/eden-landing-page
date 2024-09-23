"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (endTime: number): TimeLeft => {
  const difference = endTime - Date.now();
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

const useCountdown = (maintenanceEndTime: number) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(maintenanceEndTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(maintenanceEndTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [maintenanceEndTime]);

  return timeLeft;
};

const CountdownElement = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white border border-gray-200 rounded-lg p-2 w-12 sm:w-14 md:w-16 text-center">
      <span className="countdown-element text-lg sm:text-xl md:text-2xl lg:text-3xl">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-xs sm:text-sm text-gray-500 mt-1">{label}</span>
  </div>
);

const Home = () => {
  const [maintenanceEndTime] = useState(Date.now() + 2 * 60 * 60 * 1000);
  const timeLeft = useCountdown(maintenanceEndTime);

  return (
<div className={`${poppins.className} min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10`}>      
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <div className="flex justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <img src="/images/eden_orange.png" alt="Eden Logo" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto" />
        </div>
        <Card className="w-full shadow-lg">
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800">
                  We'll Be Back Soon
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-prose text-wrap">
                  We apologize for any inconvenience. The sleeve note is currently under scheduled maintenance to improve your experience. We expect to be back online soon.
                </p>
              </div>
              {/* <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700">
                <CountdownElement label="days" value={timeLeft.days} />
                <span>:</span>
                <CountdownElement label="hours" value={timeLeft.hours} />
                <span>:</span>
                <CountdownElement label="minutes" value={timeLeft.minutes} />
                <span>:</span>
                <CountdownElement label="seconds" value={timeLeft.seconds} />
              </div> */}
              <img 
                src="/images/maintenance.png" 
                alt="Maintenance Illustration" 
                className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] h-auto"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
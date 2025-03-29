/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts";
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

// Sample data for the line graph
const initialData = [
  { name: "Jan", value: 0 },
  { name: "Feb", value: 0 },
  { name: "Mar", value: 0 },
  { name: "Apr", value: 0 },
  { name: "May", value: 0 },
  { name: "Jun", value: 0 },
  { name: "Jul", value: 0 },
];

const finalData = [
  { name: "Jan", value: 500 },
  { name: "Feb", value: 1200 },
  { name: "Mar", value: 800 },
  { name: "Apr", value: 1500 },
  { name: "May", value: 2000 },
  { name: "Jun", value: 1700 },
  { name: "Jul", value: 2500 },
];

const AnimatedLineGraph = () => {
  const [data, setData] = useState(initialData);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Start animation after component mounted
    const timer = setTimeout(() => {
      setIsAnimated(true);
      animateGraph();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const animateGraph = () => {
    // Animate each data point separately with a small delay between them
    finalData.forEach((item, index) => {
      setTimeout(() => {
        setData((currentData) => {
          const newData = [...currentData];
          newData[index] = { ...newData[index], value: item.value };
          return newData;
        });
      }, index * 300); // 300ms delay between each point
    });
  };

  const chartConfig = {
    leave: {
      label: "Monthly Leave Requests",
      theme: {
        light: "rgba(99, 179, 237, 0.8)",
        dark: "rgba(129, 140, 248, 0.8)",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full overflow-hidden"
    >
      <Card className="border border-border bg-background/60 backdrop-blur-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Monthly Leave Requests</h3>
          <div className="h-[300px] w-full">
            <ChartContainer config={chartConfig} className="h-full">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-leave)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-leave)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)" }}
                  width={40}
                />
                <ChartTooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "var(--muted-foreground)",
                    strokeWidth: 1,
                    strokeDasharray: "5 5",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="leave"
                  stroke="var(--color-leave)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  activeDot={{
                    stroke: "var(--color-leave)",
                    strokeWidth: 2,
                    r: 6,
                    fill: "var(--background)",
                    className: "animate-pulse",
                  }}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/90 backdrop-blur-sm p-2 rounded-lg border border-border shadow-lg">
        <p className="text-sm font-medium">{payload[0].payload.name}</p>
        <p className="text-sm font-bold text-primary">
          {payload[0].value.toLocaleString()} Requests
        </p>
      </div>
    );
  }

  return null;
};

export default AnimatedLineGraph;

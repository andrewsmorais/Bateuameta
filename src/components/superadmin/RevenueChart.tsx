import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

export const RevenueChart = () => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["admin-revenue-chart"],
    queryFn: async () => {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const { data: subscriptions } = await supabase
        .from("subscriptions")
        .select("started_at, plans(price)")
        .gte("started_at", sixMonthsAgo.toISOString())
        .order("started_at");

      // Group by month
      const monthlyData: { [key: string]: number } = {};
      const platformFeeRate = 0.10;

      const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

      // Initialize last 6 months with 0
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const key = `${months[date.getMonth()]}/${date.getFullYear().toString().slice(2)}`;
        monthlyData[key] = 0;
      }

      // Sum revenue by month
      subscriptions?.forEach((sub: any) => {
        if (sub.started_at && sub.plans?.price > 0) {
          const date = new Date(sub.started_at);
          const key = `${months[date.getMonth()]}/${date.getFullYear().toString().slice(2)}`;
          if (monthlyData.hasOwnProperty(key)) {
            const netProfit = sub.plans.price * (1 - platformFeeRate);
            monthlyData[key] += netProfit;
          }
        }
      });

      return Object.entries(monthlyData).map(([month, lucro]) => ({
        month,
        lucro: Number(lucro.toFixed(2)),
      }));
    },
  });

  if (isLoading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2 border-2 hover:border-primary/50 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl text-[hsl(217,91%,60%)]">
            Evolução do Lucro Líquido
          </CardTitle>
          <CardDescription>Últimos 6 meses (após taxas)</CardDescription>
        </div>
        <TrendingUp className="h-6 w-6 text-[hsl(142,76%,36%)]" />
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                className="text-xs fill-muted-foreground"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [`R$ ${value.toFixed(2).replace('.', ',')}`, 'Lucro Líquido']}
              />
              <Bar 
                dataKey="lucro" 
                fill="hsl(142, 76%, 36%)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

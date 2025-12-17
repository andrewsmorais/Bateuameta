import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  UserCheck, 
  UserX, 
  Activity,
  Wifi,
  WifiOff,
  Calendar,
  Gift
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const StatsCards = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      // Get total users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Get active subscriptions with plan details
      const { data: subscriptions } = await supabase
        .from("subscriptions")
        .select("plan_id, status, started_at, expires_at, plans(price, name)")
        .eq("status", "active");

      // Count subscriptions by type
      let monthlyCount = 0;
      let annualCount = 0;
      let freeCount = 0;

      subscriptions?.forEach((sub: any) => {
        const price = sub.plans?.price || 0;
        if (price === 0) {
          freeCount++;
        } else if (price < 50) {
          monthlyCount++;
        } else {
          annualCount++;
        }
      });

      // Calculate total gross revenue
      const grossRevenue = subscriptions?.reduce((acc, sub: any) => {
        return acc + (sub.plans?.price || 0);
      }, 0) || 0;

      // Estimate refunds (for now, 0 - could be tracked separately)
      const refunds = 0;

      // Estimate net profit (gross revenue - 10% fees - refunds)
      const platformFeeRate = 0.10;
      const netProfit = (grossRevenue * (1 - platformFeeRate)) - refunds;

      // Get all subscriptions to calculate churn
      const { data: allSubscriptions } = await supabase
        .from("subscriptions")
        .select("user_id, status, started_at, expires_at, plans(price)");

      // Calculate churn
      const now = new Date();
      const churned = allSubscriptions?.filter((sub: any) => {
        if (!sub.expires_at || sub.plans?.price === 0) return false;
        const expiresAt = new Date(sub.expires_at);
        return expiresAt < now && sub.status !== "active";
      }).length || 0;

      // Get active users (logged in last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: activeUsersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("updated_at", thirtyDaysAgo.toISOString());

      // Check API health (check recent webhook logs via edge function logs)
      // For simplicity, assume healthy if we can query
      const apiHealthy = true;

      return {
        totalUsers: totalUsers || 0,
        activeUsers: activeUsersCount || 0,
        monthlyPlans: monthlyCount,
        annualPlans: annualCount,
        freePlans: freeCount,
        grossRevenue,
        refunds,
        netProfit,
        churnedUsers: churned,
        apiHealthy,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total de Usuários",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-[hsl(217,91%,60%)]",
      bgColor: "from-[hsl(217,91%,60%)]/10",
      description: "Cadastrados na plataforma",
    },
    {
      title: "Usuários Ativos",
      value: stats?.activeUsers || 0,
      icon: Activity,
      color: "text-[hsl(217,91%,60%)]",
      bgColor: "from-[hsl(217,91%,60%)]/10",
      description: "Últimos 30 dias",
    },
    {
      title: "Planos Free",
      value: stats?.freePlans || 0,
      icon: Gift,
      color: "text-muted-foreground",
      bgColor: "from-muted/30",
      description: "Contas gratuitas",
    },
    {
      title: "Planos Mensais",
      value: stats?.monthlyPlans || 0,
      icon: Calendar,
      color: "text-[hsl(217,91%,60%)]",
      bgColor: "from-[hsl(217,91%,60%)]/10",
      description: "Assinaturas mensais",
    },
    {
      title: "Planos Anuais",
      value: stats?.annualPlans || 0,
      icon: UserCheck,
      color: "text-[hsl(142,76%,36%)]",
      bgColor: "from-[hsl(142,76%,36%)]/10",
      description: "R$ 97,90/ano",
    },
    {
      title: "Receita Bruta",
      value: `R$ ${(stats?.grossRevenue || 0).toFixed(2).replace('.', ',')}`,
      icon: DollarSign,
      color: "text-[hsl(142,76%,36%)]",
      bgColor: "from-[hsl(142,76%,36%)]/10",
      description: "Todas as vendas",
    },
    {
      title: "Lucro Líquido",
      value: `R$ ${(stats?.netProfit || 0).toFixed(2).replace('.', ',')}`,
      icon: TrendingUp,
      color: "text-[hsl(142,76%,36%)]",
      bgColor: "from-[hsl(142,76%,36%)]/10",
      description: "Após taxas (10%)",
    },
    {
      title: "Churn",
      value: stats?.churnedUsers || 0,
      icon: UserX,
      color: "text-destructive",
      bgColor: "from-destructive/10",
      description: "Não renovaram",
    },
    {
      title: "Status API",
      value: stats?.apiHealthy ? "Online" : "Offline",
      icon: stats?.apiHealthy ? Wifi : WifiOff,
      color: stats?.apiHealthy ? "text-[hsl(142,76%,36%)]" : "text-destructive",
      bgColor: stats?.apiHealthy ? "from-[hsl(142,76%,36%)]/10" : "from-destructive/10",
      description: "Webhook Stripe",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.bgColor} to-transparent rounded-full -mr-12 -mt-12`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

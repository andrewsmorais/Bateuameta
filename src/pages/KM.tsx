import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddTurnoDialog } from "@/components/dialogs/AddTurnoDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Turno {
  id: string;
  data: string;
  km_inicial: number;
  km_final: number;
  hora_inicio: string;
  hora_fim: string;
  valor_ganho: number;
  lucro_liquido: number;
  total_horas: number;
  veiculos: {
    modelo: string;
    placa: string;
  };
}

const KM = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadTurnos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("turnos_km")
        .select(`
          *,
          veiculos (modelo, placa)
        `)
        .eq("user_id", user.id)
        .order("data", { ascending: false })
        .order("hora_inicio", { ascending: false });

      if (error) throw error;
      setTurnos(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar turnos",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTurnos();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Controle de Turnos (KM)</h1>
        <AddTurnoDialog onSuccess={loadTurnos} />
      </div>

      {turnos.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Registros de Turnos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Nenhum turno registrado ainda. Clique em "Novo Turno" para começar.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {turnos.map((turno) => (
            <Card key={turno.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {format(new Date(turno.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {turno.veiculos.modelo} - {turno.veiculos.placa}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">
                      R$ {turno.lucro_liquido?.toFixed(2) || "0.00"}
                    </div>
                    <p className="text-xs text-muted-foreground">Lucro Líquido</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">KM Rodados</p>
                    <p className="font-medium">
                      {(turno.km_final - turno.km_inicial).toFixed(2)} km
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Horário</p>
                    <p className="font-medium">
                      {turno.hora_inicio} - {turno.hora_fim}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Horas</p>
                    <p className="font-medium">{turno.total_horas?.toFixed(2) || "0.00"}h</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Ganhos</p>
                    <p className="font-medium text-primary">
                      R$ {turno.valor_ganho.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default KM;

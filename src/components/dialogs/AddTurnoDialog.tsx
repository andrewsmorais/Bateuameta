import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";

interface AddTurnoDialogProps {
  onSuccess: () => void;
}

interface Veiculo {
  id: string;
  modelo: string;
  placa: string;
}

const fontesGanho = [
  { value: "uber", label: "Uber" },
  { value: "99", label: "99" },
  { value: "cabify", label: "Cabify" },
  { value: "outros", label: "Outros" },
];

const tiposCombustivel = [
  { value: "gasolina", label: "Gasolina" },
  { value: "etanol", label: "Etanol" },
  { value: "gnv", label: "GNV" },
  { value: "flex", label: "Flex" },
];

export const AddTurnoDialog = ({ onSuccess }: AddTurnoDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    veiculo_id: "",
    data: new Date().toISOString().split("T")[0],
    km_inicial: "",
    km_final: "",
    hora_inicio: "",
    hora_fim: "",
    tipo_combustivel: "",
    preco_combustivel: "",
    consumo_combustivel: "",
    fonte_ganho: "",
    categoria_ganho: "",
    valor_ganho: "",
  });

  useEffect(() => {
    if (open) {
      loadVeiculos();
    }
  }, [open]);

  const loadVeiculos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("veiculos")
        .select("id, modelo, placa")
        .eq("user_id", user.id)
        .order("modelo");

      if (error) throw error;
      setVeiculos(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar veículos",
        description: error.message,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase.from("turnos_km").insert({
        user_id: user.id,
        veiculo_id: formData.veiculo_id,
        data: formData.data,
        km_inicial: parseFloat(formData.km_inicial),
        km_final: parseFloat(formData.km_final),
        hora_inicio: formData.hora_inicio,
        hora_fim: formData.hora_fim,
        tipo_combustivel: formData.tipo_combustivel,
        preco_combustivel: parseFloat(formData.preco_combustivel),
        consumo_combustivel: parseFloat(formData.consumo_combustivel),
        fonte_ganho: formData.fonte_ganho,
        categoria_ganho: formData.categoria_ganho,
        valor_ganho: parseFloat(formData.valor_ganho),
      });

      if (error) throw error;

      toast({
        title: "Turno registrado!",
        description: "O turno foi cadastrado com sucesso",
      });

      setOpen(false);
      setFormData({
        veiculo_id: "",
        data: new Date().toISOString().split("T")[0],
        km_inicial: "",
        km_final: "",
        hora_inicio: "",
        hora_fim: "",
        tipo_combustivel: "",
        preco_combustivel: "",
        consumo_combustivel: "",
        fonte_ganho: "",
        categoria_ganho: "",
        valor_ganho: "",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao registrar turno",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Turno
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar Turno</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="veiculo">Veículo *</Label>
              <Select
                value={formData.veiculo_id}
                onValueChange={(value) => setFormData({ ...formData, veiculo_id: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o veículo" />
                </SelectTrigger>
                <SelectContent>
                  {veiculos.map((veiculo) => (
                    <SelectItem key={veiculo.id} value={veiculo.id}>
                      {veiculo.modelo} - {veiculo.placa}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="data">Data *</Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="km_inicial">KM Inicial *</Label>
              <Input
                id="km_inicial"
                type="number"
                step="0.01"
                value={formData.km_inicial}
                onChange={(e) => setFormData({ ...formData, km_inicial: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="km_final">KM Final *</Label>
              <Input
                id="km_final"
                type="number"
                step="0.01"
                value={formData.km_final}
                onChange={(e) => setFormData({ ...formData, km_final: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hora_inicio">Hora Início *</Label>
              <Input
                id="hora_inicio"
                type="time"
                value={formData.hora_inicio}
                onChange={(e) => setFormData({ ...formData, hora_inicio: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hora_fim">Hora Fim *</Label>
              <Input
                id="hora_fim"
                type="time"
                value={formData.hora_fim}
                onChange={(e) => setFormData({ ...formData, hora_fim: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo_combustivel">Tipo Combustível *</Label>
              <Select
                value={formData.tipo_combustivel}
                onValueChange={(value) => setFormData({ ...formData, tipo_combustivel: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {tiposCombustivel.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preco_combustivel">Preço Combustível (R$/L) *</Label>
              <Input
                id="preco_combustivel"
                type="number"
                step="0.01"
                value={formData.preco_combustivel}
                onChange={(e) => setFormData({ ...formData, preco_combustivel: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consumo_combustivel">Consumo (L) *</Label>
              <Input
                id="consumo_combustivel"
                type="number"
                step="0.01"
                value={formData.consumo_combustivel}
                onChange={(e) => setFormData({ ...formData, consumo_combustivel: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fonte_ganho">Fonte de Ganho *</Label>
              <Select
                value={formData.fonte_ganho}
                onValueChange={(value) => setFormData({ ...formData, fonte_ganho: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {fontesGanho.map((fonte) => (
                    <SelectItem key={fonte.value} value={fonte.value}>
                      {fonte.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria_ganho">Categoria *</Label>
              <Input
                id="categoria_ganho"
                value={formData.categoria_ganho}
                onChange={(e) => setFormData({ ...formData, categoria_ganho: e.target.value })}
                placeholder="Ex: Corridas padrão"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor_ganho">Valor Ganho (R$) *</Label>
              <Input
                id="valor_ganho"
                type="number"
                step="0.01"
                value={formData.valor_ganho}
                onChange={(e) => setFormData({ ...formData, valor_ganho: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

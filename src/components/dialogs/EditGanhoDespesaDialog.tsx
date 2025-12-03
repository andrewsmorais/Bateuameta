import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Pencil } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Transacao {
  id: string;
  tipo: string;
  categoria: string;
  nome: string | null;
  valor: number;
  data: string;
  recorrente: boolean;
  data_inicio: string | null;
  data_fim: string | null;
  incluir_dashboard: boolean | null;
  observacoes: string | null;
}

interface EditGanhoDespesaDialogProps {
  transacao: Transacao;
  onSuccess: () => void;
}

export const EditGanhoDespesaDialog = ({ transacao, onSuccess }: EditGanhoDespesaDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipo: transacao.tipo,
    nome: transacao.nome || "",
    valor: transacao.valor.toString(),
    data: transacao.data ? parseISO(transacao.data) : new Date(),
    recorrente: transacao.recorrente,
    data_inicio: transacao.data_inicio ? parseISO(transacao.data_inicio) : undefined as Date | undefined,
    data_fim: transacao.data_fim ? parseISO(transacao.data_fim) : undefined as Date | undefined,
    incluir_dashboard: transacao.incluir_dashboard || false,
    observacoes: transacao.observacoes || "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setFormData({
        tipo: transacao.tipo,
        nome: transacao.nome || "",
        valor: transacao.valor.toString(),
        data: transacao.data ? parseISO(transacao.data) : new Date(),
        recorrente: transacao.recorrente,
        data_inicio: transacao.data_inicio ? parseISO(transacao.data_inicio) : undefined,
        data_fim: transacao.data_fim ? parseISO(transacao.data_fim) : undefined,
        incluir_dashboard: transacao.incluir_dashboard || false,
        observacoes: transacao.observacoes || "",
      });
    }
  }, [open, transacao]);

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value) {
      const numValue = parseInt(value) / 100;
      value = numValue.toFixed(2).replace(".", ",");
    }
    setFormData((prev) => ({ ...prev, valor: value }));
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const valorNumerico = parseFloat(formData.valor.replace(",", "."));
      if (isNaN(valorNumerico) || valorNumerico <= 0) {
        toast({
          variant: "destructive",
          title: "Valor inválido",
          description: "Por favor, insira um valor válido",
        });
        return;
      }

      // Categoria é automaticamente definida baseada no tipo
      const categoria = formData.tipo === "ganho" ? "ganhos_extras" : "despesas_extras";

      const { error } = await supabase
        .from("ganhos_despesas")
        .update({
          tipo: formData.tipo,
          categoria: categoria,
          nome: formData.nome || null,
          valor: valorNumerico,
          data: format(formData.data, "yyyy-MM-dd"),
          recorrente: formData.recorrente,
          data_inicio: !formData.recorrente && formData.data_inicio 
            ? format(formData.data_inicio, "yyyy-MM-dd") 
            : null,
          data_fim: !formData.recorrente && formData.data_fim 
            ? format(formData.data_fim, "yyyy-MM-dd") 
            : null,
          incluir_dashboard: formData.incluir_dashboard,
          observacoes: formData.observacoes || null,
        })
        .eq("id", transacao.id);

      if (error) throw error;

      toast({
        title: "Transação atualizada",
        description: "A transação foi atualizada com sucesso",
      });
      setOpen(false);
      onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar",
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Categoria (Tipo) */}
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              value={formData.tipo}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, tipo: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ganho">Ganho</SelectItem>
                <SelectItem value="despesa">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Nome */}
          <div className="space-y-2">
            <Label>Nome da Despesa ou Ganho</Label>
            <Input
              value={formData.nome}
              onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
            />
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <Label>Valor</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                R$
              </span>
              <Input
                className="pl-10"
                value={formData.valor}
                onChange={handleValorChange}
              />
            </div>
          </div>

          {/* Data */}
          <div className="space-y-2">
            <Label>Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.data && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.data ? format(formData.data, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.data}
                  onSelect={(date) => date && setFormData((prev) => ({ ...prev, data: date }))}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Recorrente */}
          <div className="flex items-center justify-between">
            <Label>Recorrente</Label>
            <Switch
              checked={formData.recorrente}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, recorrente: checked }))
              }
            />
          </div>

          {/* Data Início e Fim (apenas se não for recorrente) */}
          {!formData.recorrente && (
            <>
              <div className="space-y-2">
                <Label>Data Início</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.data_inicio && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.data_inicio
                        ? format(formData.data_inicio, "dd/MM/yyyy", { locale: ptBR })
                        : "Selecione"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.data_inicio}
                      onSelect={(date) =>
                        setFormData((prev) => ({ ...prev, data_inicio: date }))
                      }
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Data Fim</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.data_fim && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.data_fim
                        ? format(formData.data_fim, "dd/MM/yyyy", { locale: ptBR })
                        : "Selecione"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.data_fim}
                      onSelect={(date) =>
                        setFormData((prev) => ({ ...prev, data_fim: date }))
                      }
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}

          {/* Incluir no Dashboard */}
          <div className="flex items-center justify-between">
            <Label>Incluir este item nos cálculos do Dashboard</Label>
            <Switch
              checked={formData.incluir_dashboard}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, incluir_dashboard: checked }))
              }
            />
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label>Observação (Opcional)</Label>
            <Textarea
              value={formData.observacoes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, observacoes: e.target.value }))
              }
              rows={3}
            />
          </div>

          {/* Botões */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button className="flex-1" onClick={handleSubmit}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

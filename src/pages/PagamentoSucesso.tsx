import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Key, AlertCircle } from "lucide-react";
import logoImage from "@/assets/bateu-a-meta-logo.png";

const PagamentoSucesso = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <img 
              src={logoImage} 
              alt="Bateu a Meta" 
              className="w-20 h-20 rounded-full object-cover mx-auto"
            />
          </div>
          <div className="mx-auto mb-4 p-4 rounded-full bg-green-500/10 w-fit">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-500">
            Pagamento Confirmado!
          </CardTitle>
          <CardDescription className="text-base">
            Sua assinatura foi ativada com sucesso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Bem-vindo ao Bateu a Meta! Sua conta foi criada automaticamente.
          </p>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-left space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Email de Acesso</p>
                <p className="text-sm text-muted-foreground">
                  Use o email informado no checkout para fazer login.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Key className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Senha Temporária</p>
                <p className="text-lg font-bold text-primary bg-primary/10 px-3 py-2 rounded mt-1 font-mono">
                  MudeAgora123
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Anote esta senha antes de continuar!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
            <p className="text-sm text-left text-muted-foreground">
              <span className="font-medium text-yellow-500">Importante:</span> Recomendamos alterar sua senha nas configurações após o primeiro login.
            </p>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            onClick={() => navigate("/auth")}
          >
            Ir para o Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PagamentoSucesso;

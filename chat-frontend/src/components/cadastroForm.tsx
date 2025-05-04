/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function CadastroForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const url = "https://chat-furia-47ka.onrender.com/api/user/register";

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [erro, setErro] = useState("");
  const [modalSucessoAberto, setModalSucessoAberto] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCadastro: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setErro("");

    if (!name || !email || !password) {
      setErro("Preencha todos os campos");
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setModalSucessoAberto(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        if (data && data.message) {
          setErro(data.message);
        } else {
          setErro("Erro ao cadastrar usuário. Tente novamente.");
        }
      }
    } catch (error) {
      console.error("Erro ao comunicar com o servidor:", error);
      setErro("Erro ao comunicar com o servidor. Verifique sua conexão.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Cadastre-se agora</CardTitle>
          <CardDescription>Venha agora mesmo para o Chat Furia</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCadastro}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    type="nome"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full hover:cursor-pointer">
                  Cadastre-se
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Já possui conta?{" "}
                  <Link to="/" className="underline">
                    Entrar
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      {erro && <p className="text-red-500 mt-2">{erro}</p>}
      <Dialog open={modalSucessoAberto} onOpenChange={setModalSucessoAberto}>
        <DialogTrigger asChild>
          <div className="hidden" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastro Realizado!</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <DialogDescription>
              Seu cadastro foi realizado com sucesso. Você será redirecionado
              para a tela de login em alguns segundos.
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

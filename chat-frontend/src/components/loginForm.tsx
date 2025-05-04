/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { FormEventHandler, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Logo from "../assets/logo_furia.png";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const url = "https://chat-furia-47ka.onrender.com/auth/login";
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [modalSucessoAberto, setModalSucessoAberto] = useState<boolean>(false);

  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    const userLogin = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });
      const data = await response.json();
      if (data && !data.error) {
        setModalSucessoAberto(true);
        console.log(data);
        localStorage.setItem("token", data.access_token);
        setTimeout(() => {
          navigate("/chat");
        }, 2000);
      }

      if (data.error) {
        setError(data.message);
      }
    } catch (err) {
      setError(err as string);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  Seja bem vindo(a) ao Chat Furia!
                </h1>
                <p className="text-muted-foreground text-balance">
                  Faça Login agora mesmo!
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full hover:cursor-pointer">
                Login
              </Button>
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <Link to="/cadastro" className="underline underline-offset-4">
                  Cadastre-se
                </Link>
              </div>
            </div>
          </form>
          <div className="hidden md:flex justify-center items-center bg-black w-full h-auto">
            <img src={Logo} alt="Image aqui" className="max-w-full h-auto" />
          </div>
        </CardContent>
      </Card>
      {error && <p>{error}</p>}
      <Dialog open={modalSucessoAberto} onOpenChange={setModalSucessoAberto}>
        <DialogTrigger asChild>
          <div className="hidden" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Realizado</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <DialogDescription>
              Você está sendo redirecionado para o chat!
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Ao clicar em continuar, você concorda com os nossos{" "}
        <a href="#">Termos de Serviço</a> e{" "}
        <a href="#">Política de Privacidade</a>
      </div>
    </div>
  );
}

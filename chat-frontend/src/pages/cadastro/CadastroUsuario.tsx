/* eslint-disable @typescript-eslint/no-unused-vars */
import { CadastroForm } from "@/components/cadastroForm";

const CadastroUsuario = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <CadastroForm />
      </div>
    </div>
  );
};

export default CadastroUsuario;

/* eslint-disable @typescript-eslint/no-unused-vars */
import molodoy from "@/assets/molodoy.png";
import yekindar from "@/assets/yekindar.png";
import fallen from "@/assets/fallen.png";
import kscerato from "@/assets/kscerato.png";
import yuurih from "@/assets/yuurih.png";
import skullz from "@/assets/skullz.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Menu from "../Menu/Menu";

const DadosTime = () => {
  const nomes = [
    {
      nome: "MOLODOY",
      bio: "Nascido em 10 de janeiro de 2005, molodoy é oriundo do Cazaquistão, país natal de campeões mundiais como Abay 'HObbit' Khassenov, Aleksei 'Qikert' Golubev. Os primeiros passos no competitivo foram dados com times fakes, em 2020, quando tinha 15 anos. A FURIA será a quarta equipe profissional do jogador.",
    },
    {
      nome: "YEKINDAR",
      bio: "Jogador profissional de Counter-Strike 2 da Letônia, atualmente jogando como stand-in (jogador substituto temporário) pela FURIA. É conhecido por seu estilo agressivo como entry-fragger (jogador que geralmente inicia os confrontos). Anteriormente jogou pela Virtus.pro e Team Liquid.",
    },
    {
      nome: "FalleN",
      bio: "Amplamente considerado um dos jogadores brasileiros de Counter-Strike mais influentes. Atualmente joga pela FURIA e também atuou por equipes como SK Gaming. É bicampeão de Majors, fundou a plataforma de e-learning Games Academy (que depois se uniu ao Gamers Club) e a marca de periféricos Fallen Gear.",
    },
    {
      nome: "KSCERATO",
      bio: "Jogador profissional brasileiro de Counter-Strike 2 da FURIA, atuando como rifler. Foi reconhecido como o melhor atleta de CS:GO do Brasil no Prêmio Esports Brasil por três anos consecutivos (incluindo 2023). É irmão de KNCERATO e primo de WOOD7.",
    },
    {
      nome: "yuurih",
      bio: "Jogador profissional brasileiro de Counter-Strike 2 que joga como rifler pela FURIA. Já foi classificado entre os melhores jogadores do Brasil e foi o MVP da HLTV de diversos torneios. É conhecido pelo apelido 'Carta 96'.",
    },
    {
      nome: "skullz",
      bio: "Jogador profissional brasileiro de Counter-Strike 2 e ex-jogador de Counter-Strike: Global Offensive. Joga como rifler pela FURIA. Foi classificado como o 10º melhor jogador do Brasil em 2022 pela DRAFT5.",
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  });
  const fotos = [molodoy, yekindar, fallen, kscerato, yuurih, skullz];
  return (
    <div>
      <div className="">
        <Menu />
        <div className="text-3xl text-center p-10">
          Time Counter Strike Furia
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 justify-between p-10">
          {nomes.map((nome, index) => (
            <div className="w-auto flex justify-center">
              <ul key={index} className="p-2 shadow-2xl">
                <li className="text-center">
                  <img
                    src={fotos[index]}
                    alt=""
                    className="bg-gray-500 w-auto"
                  />
                  <p className="  bg-neutral-900 text-white text-2xl text-center max-w-[400px]">
                    {nome.nome}
                  </p>
                  <p className=" max-w-[400px]">Biografia: {nome.bio}</p>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DadosTime;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";

const Resultados = () => {
  const datas: string[] = [
    "quarta-feira, 9 de abril de 2025",
    "terça-feira, 8 de abril de 2025",
    "segunda-feira, 7 de abril de 2025",
    "domingo, 6 de abril de 2025",
    "sábado, 22 de março de 2025",
  ];

  const resultados = [
    { time1: "Furia", time2: "The MongolZ", placar1: 0, placar2: 2 },
    { time1: "Furia", time2: "Virtus.pro", placar1: 0, placar2: 2 },
    { time1: "Furia", time2: "Complexity", placar1: 1, placar2: 2 },
    { time1: "Furia", time2: "Apogee", placar1: 2, placar2: 0 },
    { time1: "Furia", time2: "M80", placar1: 1, placar2: 2 },
  ];

  const links: string[] = [
    "https://draft5.gg/partida/36342-FURIA-vs-The-MongolZ-PGL-Bucharest-2025",
    "https://draft5.gg/partida/36349-FURIA-vs-Virtus.pro-PGL-Bucharest-2025",
    "https://draft5.gg/partida/36328-FURIA-vs-Complexity-PGL-Bucharest-2025",
    "https://draft5.gg/partida/36197-FURIA-vs-Apogee-PGL-Bucharest-2025",
    "https://draft5.gg/partida/35425-M80-vs-FURIA-BLAST-Open-Lisbon-2025",
  ];
  return (
    <div>
      <div className="p-3">
        <h2 className="text-3xl text-center italic text-gray-700">
          Últimos jogos
        </h2>
        {datas.map((data, index) => (
          <div className=" border-l-3 border-green-700 p-3 m-3 rounded-b-lg shadow-md bg-gray-100">
            <ul key={index}>
              <li className="flex flex-col">
                <p className=" text-gray-500">{data}</p>
                <span className=" not-italic">
                  {resultados[index].time1} {resultados[index].placar1} X{" "}
                  {resultados[index].placar2} {resultados[index].time2}
                </span>
                <Link
                  to={links[index]}
                  target="_blank"
                  className="text-gray-700 hover:text-red-500 "
                >
                  Informações
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resultados;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import * as uuid from "uuid";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Resultados from "../DadosTime/Resultados";
import logo from "@/assets/Furia_Esports_logo.png";
import Menu from "../Menu/Menu";

interface Message {
  id: string;
  name: string;
  text: string;
}

interface Payload {
  name: string;
  text: string;
}

interface TokenPayload {
  sub: string;
  email: string;
  name: string;
}

const socket = io("https://chat-furia-47ka.onrender.com");

const Chat: React.FC = () => {
  const [title] = useState("Chat Furia");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<any>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setName(decoded.name);
      } catch (err) {
        setError(err);
      }
    }
  }, []);

  useEffect(() => {
    function receivedMessage(message: Payload) {
      const newMessage: Message = {
        id: uuid.v4(),
        name: message.name,
        text: message.text,
      };

      setMessages([...messages, newMessage]);
    }

    socket.on("msgToClient", (message: Payload) => {
      receivedMessage(message);
    });
  }, [messages, name, text]);

  function validateInput() {
    return name.length > 0 && text.length > 0;
  }

  function sendMessage() {
    if (validateInput()) {
      const message: Payload = {
        name,
        text,
      };
      socket.emit("msgToServer", message);
      setText("");
    }
  }

  return (
    <>
      <Menu />
      <div className="flex justify-center items-center h-full sm:h-screen w-full flex-col sm:flex-row">
        <div className="flex flex-col p-6 h-full max-h-[600px] w-full max-w-[600px] bg-white border-solid border-black border-5 rounded-lg">
          <div className="flex">
            <span className="flex">
              <img src={logo} className="w-[30px]" alt="Logo da Furia" />
              <h1 className="text-2xl ">{title}</h1>
            </span>
          </div>
          <span>
            Seja bem vindo <strong>{name}</strong>! Fique a vontade para
            interagir com os fãs do time de CS da Furia. Respeite o próximo!
          </span>
          <div className="mt-4 h-[500px] overflow-auto border border-gray-800 rounded-lg p-3">
            <ul>
              {messages.map((message) => {
                if (message.name === name) {
                  const isOwnMessage = message.name === name;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isOwnMessage ? "justify-end" : "justify-start"
                      } mb-2`}
                    >
                      <div
                        className={`p-2 w-48 rounded-lg ${
                          isOwnMessage
                            ? "bg-black text-white"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        <span className="block font-semibold mb-1">
                          {message.name} diz:
                        </span>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    className="p-2 no-underline flex flex-col justify-start items-start w-48 bg-black text-white mt-1 rounded-lg"
                    key={message.id}
                  >
                    <span>
                      {message.name}
                      {" diz:"}
                    </span>

                    <p>{message.text}</p>
                  </div>
                );
              })}
            </ul>
          </div>
          <Input
            className="mt-3 mb-3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Enter message..."
          />
          <Button type="button" onClick={() => sendMessage()}>
            Enviar
          </Button>
          {error && <p>{error}</p>}
        </div>
        <Resultados />
      </div>
    </>
  );
};

export default Chat;

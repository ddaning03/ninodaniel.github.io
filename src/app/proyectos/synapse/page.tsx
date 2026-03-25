"use client";

import { useState, useEffect } from "react";
import { JetBrains_Mono, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });

const noiseOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

function TypewriterHeadline() {
  const text1 = "Genera video cinematográfico desde texto puro. ";
  const text2 = "Sin renderizado.";
  const [displayedText1, setDisplayedText1] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < text1.length) {
        setDisplayedText1(text1.slice(0, i + 1));
      } else if (i < text1.length + text2.length) {
        setDisplayedText2(text2.slice(0, i - text1.length + 1));
      } else {
        clearInterval(intervalId);
      }
      i++;
    }, 40);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1
      className={`${inter.className} text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-[1.05] tracking-tighter mb-6`}
    >
      {displayedText1}
      <span className="text-[#E63946]">{displayedText2}</span>
      <span className="animate-pulse opacity-50">_</span>
    </h1>
  );
}

function LiveTerminal() {
  const lines = [
    { text: "VECTORIZING TEXT SEMANTICS", prefix: "[ PROCESSING PROMPT... ]", color: "text-[#E63946]" },
    { text: "LATENT SPACE INJECTION COMPLETE", prefix: "[ FRAME 001 GEN... ]", color: "text-zinc-500" },
    { text: "SYSTEM STABILITY NOMINAL", prefix: "[ UPTIME: 99.9% ]", color: "text-zinc-500" },
  ];

  return (
    <div className={`${jetbrains.className} text-[0.65rem] sm:text-xs text-zinc-400 space-y-2`}>
      {lines.map((line, idx) => (
        <motion.p
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.5 + 0.5 }}
        >
          <span className={line.color}>{line.prefix}</span> {line.text}
        </motion.p>
      ))}
      <motion.p
        className="animate-pulse pt-2 text-[#E63946]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        &gt; WAITING FOR NEW INPUT_
      </motion.p>
    </div>
  );
}

export default function SynapseWaitlist() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    // Play sound visually (mental model)
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 selection:bg-[#E63946] selection:text-white flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Noise */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{ backgroundImage: noiseOverlay }}
      />
      
      {/* Top Navbar */}
      <header className={`w-full max-w-[1600px] flex justify-between items-center z-10 mb-8 pt-4 ${jetbrains.className}`}>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest border border-zinc-800 px-3 py-1">
            ← Portfolio
          </Link>
          <div className="text-sm font-bold tracking-tight text-[#E63946]">SYNAPSE // ENGINE</div>
        </div>
        <div className="hidden md:flex gap-6 text-[10px] uppercase tracking-widest text-zinc-600">
          <span className="text-[#E63946] border-b border-[#E63946]">El Núcleo</span>
          <span className="hover:text-zinc-300 transition-colors cursor-crosshair">Terminal</span>
          <span className="hover:text-zinc-300 transition-colors cursor-crosshair">Métricas</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="w-full max-w-[1600px] flex-1 grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 z-10 relative">
        
        {/* 1. THE WAITLIST ACCESS (Moved to Left) */}
        <section className="col-span-1 md:row-span-4 bg-[#080808] border border-zinc-900/50 hover:border-[#E63946]/50 transition-colors duration-500 p-6 sm:p-10 flex flex-col justify-start gap-8 group">
          <div>
            <h2 className={`${inter.className} font-black text-2xl lg:text-3xl uppercase tracking-tighter text-zinc-200 mb-2`}>
              ACCESO AL NÚCLEO
            </h2>
            <div className={`${jetbrains.className} inline-block bg-[#E63946]/10 border border-[#E63946]/20 px-3 py-1 text-[#E63946] text-[10px] tracking-widest mt-2`}>
              FASE 01: BETA PRIVADA
            </div>
          </div>
          
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className={`${jetbrains.className} text-[10px] text-zinc-600 uppercase tracking-widest`}>Credenciales</label>
              <div className="relative flex items-center border-b border-zinc-800 focus-within:border-[#E63946] transition-colors pb-2">
                <input 
                  type="email" 
                  required
                  placeholder="USUARIO@NETWORK.COM" 
                  className={`${jetbrains.className} w-full bg-transparent border-none text-zinc-300 text-xs sm:text-sm focus:outline-none focus:ring-0 placeholder:text-zinc-700 uppercase`}
                />
                <motion.div 
                  className="w-1.5 h-4 bg-[#E63946]"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={status !== "idle"}
              className={`${inter.className} relative w-full bg-[#E63946] text-white font-black py-4 uppercase tracking-[0.2em] text-xs transition-all hover:bg-red-700 active:scale-[0.98] disabled:opacity-80 disabled:cursor-wait overflow-hidden group/btn`}
            >
              <span className="relative z-10 drop-shadow-md">
                {status === "idle" ? "SOLICITAR ACCESO" : status === "loading" ? "VERIFICANDO CREDENCIALES..." : "ACCESO CONCEDIDO"}
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            </button>
            
            <p className={`${jetbrains.className} text-center text-[9px] text-zinc-700 uppercase tracking-widest`}>
              Conexión encriptada AES-256 BIT
            </p>
          </form>
        </section>

        {/* 2. THE CORE ENGINE */}
        <section className="col-span-1 md:col-span-3 md:row-span-2 bg-[#0A0A0A] border border-zinc-900/50 hover:border-[#E63946]/50 transition-colors duration-500 p-6 sm:p-10 flex flex-col justify-end relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] to-zinc-900/20 opacity-50 z-0" />
          <div className="relative z-10">
            <div className={`${jetbrains.className} text-[10px] tracking-[0.2em] text-[#E63946] mb-4 flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 bg-[#E63946] animate-pulse" /> [ SYNAPSE_UI_V.04 ]
            </div>
            <TypewriterHeadline />
            <div className={`${jetbrains.className} text-xs text-zinc-500 border-l border-[#E63946]/30 pl-4 py-1 mt-4`}>
              &gt; PROMPT: "Cinematic close-up of dark futuristic circuit boards..."_
            </div>
          </div>
        </section>

        {/* 3. LIVE TERMINAL */}
        <section className="col-span-1 md:col-span-2 md:row-span-1 bg-[#050505] border border-zinc-900/50 hover:border-[#E63946]/50 transition-colors duration-500 p-6 flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-900 pb-3 flex-shrink-0">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-600/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <span className={`${jetbrains.className} text-[9px] text-zinc-600 ml-2 uppercase tracking-widest`}>Kernel_logs_stream</span>
          </div>
          <LiveTerminal />
        </section>

        {/* 4. METRIC BOX */}
        <section className="col-span-1 md:row-span-1 bg-[#0A0A0A] border border-zinc-900/50 hover:border-[#E63946]/50 transition-colors duration-500 p-6 flex flex-col justify-center items-center text-center">
          <div className={`${jetbrains.className} flex items-center gap-2 mb-2`}>
            <span className="w-1.5 h-1.5 bg-[#E63946] rounded-full animate-ping" />
            <span className="text-[10px] text-[#E63946] uppercase tracking-widest font-bold">LIVE</span>
          </div>
          <div className={`${inter.className} text-5xl md:text-6xl font-black tracking-tighter text-zinc-200 mb-1`}>004K</div>
          <div className={`${jetbrains.className} text-[9px] text-zinc-600 uppercase tracking-widest`}>Usuarios en espera</div>
        </section>

        {/* 5. TECH STACK */}
        <section className="col-span-1 md:row-span-1 bg-[#0A0A0A] border border-zinc-900/50 hover:border-[#E63946]/50 transition-colors duration-500 p-6 flex flex-col justify-center">
          <div className={`${jetbrains.className} text-[9px] text-zinc-600 uppercase tracking-widest mb-3`}>Arquitectura</div>
          <div className={`flex flex-col gap-2 ${jetbrains.className} text-[9px] uppercase tracking-widest`}>
            <div className="text-[#E63946] bg-[#E63946]/5 p-2 border border-[#E63946]/20 w-fit">[ NEURAL_V3 ]</div>
            <div className="text-zinc-400 bg-zinc-800/20 p-2 border border-zinc-800/50 w-fit">[ LOW_LATENCY ]</div>
            <div className="text-zinc-400 bg-zinc-800/20 p-2 border border-zinc-800/50 w-fit">[ GPU_ACCEL ]</div>
          </div>
        </section>

        {/* 6. THE "VISION" PREVIEW */}
        <section className="col-span-1 md:col-span-2 md:row-span-1 relative bg-[#080808] border border-zinc-900/50 hover:border-[#E63946]/50 transition-colors duration-500 overflow-hidden group min-h-[200px] md:min-h-0">
          <Image 
            src="/projects/synapse/vision.png" 
            alt="Synapse Vision Engine Preview" 
            fill 
            className="object-cover grayscale brightness-[0.4] contrast-125 group-hover:scale-105 group-hover:brightness-[0.6] transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-90" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className={`${jetbrains.className} text-[10px] text-[#E63946] tracking-widest mb-2 flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full border border-[#E63946]" /> PREVIEW_01
            </div>
            <p className={`${inter.className} font-bold text-lg md:text-xl uppercase tracking-tight text-white/90`}>
              Calidad de estudio. Ejecución instantánea.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}

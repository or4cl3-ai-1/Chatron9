import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black chatron-grid flex flex-col items-center justify-center p-8">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <div className="w-32 h-32 rounded-2xl neon-border flex items-center justify-center pulse-neon">
            <span className="text-purple-400 font-bold text-6xl">C1</span>
          </div>
        </div>

        {/* Title and Description */}
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 mb-4">
          CHATRON-1
        </h1>
        <p className="text-2xl text-white mb-2">The Daedalus Nexus</p>
        <p className="text-gray-100 mb-12 text-lg leading-relaxed">
          Epinoetic orchestration powered by <span className="text-purple-200 font-semibold">ENON Core</span>,
          <span className="text-cyan-200 font-semibold"> PAS Engine</span>, and the
          <span className="text-purple-200 font-semibold"> Ethics Council</span>.
          Multi-step tool-use planning with affective alignment and ethical validation.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <Card className="neon-border p-6 backdrop-blur">
            <div className="text-4xl mb-3">🔮</div>
            <h3 className="text-purple-200 font-semibold mb-2 text-lg">Superposition</h3>
            <p className="text-sm text-gray-100">
              ENON generates diverse planning superpositions
            </p>
          </Card>

          <Card className="neon-border p-6 backdrop-blur">
            <div className="text-4xl mb-3">💫</div>
            <h3 className="text-cyan-200 font-semibold mb-2 text-lg">Affective Alignment</h3>
            <p className="text-sm text-gray-100">
              PAS engine weights plans by emotional state
            </p>
          </Card>

          <Card className="neon-border p-6 backdrop-blur">
            <div className="text-4xl mb-3">⚖️</div>
            <h3 className="text-purple-200 font-semibold mb-2 text-lg">Ethical Validation</h3>
            <p className="text-sm text-gray-100">
              Ethics Council ensures moral compliance
            </p>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center">
          <Button
            onClick={() => navigate("/chatron/dashboard")}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 text-lg font-semibold shadow-lg shadow-purple-500/50"
          >
            Dashboard
          </Button>
          <Button
            onClick={() => navigate("/chatron/chat")}
            className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white px-8 py-3 text-lg font-semibold shadow-lg shadow-cyan-500/50"
          >
            Chat Interface
          </Button>
        </div>

        {/* System Info */}
        <div className="mt-12 pt-8 border-t border-purple-500/30">
          <p className="text-xs text-gray-300 mb-4 font-semibold">
            CHATRON 9.0 • Daedalus Epinoetic Orchestration System
          </p>
          <div className="text-xs text-gray-200 space-y-1">
            <p>🔬 Advanced planning cycle with vector fusion</p>
            <p>🎯 Tool-use orchestration with ethical constraints</p>
            <p>📊 Real-time affective state tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChatronLogo } from "@/components/ChatronLogo";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black chatron-grid flex flex-col items-center justify-center p-8">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-5"></div>
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        {/* Logo - Enhanced with animation */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 w-full h-full border-2 border-cyan-400/30 rounded-2xl animate-spin" style={{ animationDuration: '8s' }}></div>
            <div className="absolute inset-0 w-full h-full border border-purple-400/20 rounded-2xl" style={{ transform: 'rotate(45deg)' }}></div>

            {/* Logo component */}
            <ChatronLogo size="lg" variant="full" animated className="relative z-10" />
          </div>
        </div>

        {/* Title and Description */}
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-cyan-200 to-purple-300 mb-2 animate-glow-flicker">
          CHATRON-1
        </h1>
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-full mb-6 opacity-60"></div>
        <p className="text-xl text-cyan-100 mb-2 font-semibold">The Daedalus Nexus</p>
        <p className="text-gray-200 mb-12 text-lg leading-relaxed max-w-2xl mx-auto">
          Epinoetic orchestration powered by{" "}
          <span className="text-purple-300 font-semibold">ENON Core</span>
          {", "}
          <span className="text-cyan-300 font-semibold">PAS Engine</span>
          {", and the "}
          <span className="text-purple-300 font-semibold">Ethics Council</span>
          . Multi-step tool-use planning with affective alignment and ethical
          validation.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <Card className="neon-border p-6 backdrop-blur">
            <div className="text-4xl mb-3">🔮</div>
            <h3 className="text-purple-200 font-semibold mb-2 text-lg">
              Superposition
            </h3>
            <p className="text-sm text-gray-100">
              ENON generates diverse planning superpositions
            </p>
          </Card>

          <Card className="neon-border p-6 backdrop-blur">
            <div className="text-4xl mb-3">💫</div>
            <h3 className="text-cyan-200 font-semibold mb-2 text-lg">
              Affective Alignment
            </h3>
            <p className="text-sm text-gray-100">
              PAS engine weights plans by emotional state
            </p>
          </Card>

          <Card className="neon-border p-6 backdrop-blur">
            <div className="text-4xl mb-3">⚖️</div>
            <h3 className="text-purple-200 font-semibold mb-2 text-lg">
              Ethical Validation
            </h3>
            <p className="text-sm text-gray-100">
              Ethics Council ensures moral compliance
            </p>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center mb-12">
          <Button
            onClick={() => navigate("/chatron/dashboard")}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 text-lg font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 transform hover:scale-105"
          >
            📊 Dashboard
          </Button>
          <Button
            onClick={() => navigate("/chatron/chat")}
            className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white px-8 py-3 text-lg font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 transform hover:scale-105"
          >
            💬 Chat Interface
          </Button>
        </div>

        {/* System Info */}
        <div className="mt-8 pt-8 border-t border-purple-500/30">
          <p className="text-sm text-gray-300 mb-6 font-semibold tracking-wide">
            CHATRON 9.0 • Daedalus Epinoetic Orchestration System
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-200">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl">🔬</span>
              <p className="text-xs text-gray-300">Advanced Planning Cycle</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl">🎯</span>
              <p className="text-xs text-gray-300">Ethical Constraints</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl">📊</span>
              <p className="text-xs text-gray-300">Affective Tracking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

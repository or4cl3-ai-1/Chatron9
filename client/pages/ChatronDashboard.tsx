import { useEffect, useState } from "react";
import { getChatronCore } from "@/lib/chatron/daedalus-core";
import { OrchestrationRequest, AffectiveState, PlanningResponse } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ChatronDashboard() {
  const [systemStatus, setSystemStatus] = useState({
    totalRequests: 0,
    constraintsActive: 0,
    uptime: "initializing",
  });
  const [planHistory, setPlanHistory] = useState<PlanningResponse[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PlanningResponse | null>(
    null
  );
  const [isExecuting, setIsExecuting] = useState(false);

  const core = getChatronCore();

  useEffect(() => {
    updateDashboard();
    const interval = setInterval(updateDashboard, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateDashboard = () => {
    setSystemStatus(core.getSystemStatus());
    setPlanHistory(core.getHistory());
  };

  const handleGeneratePlan = async () => {
    const affectiveState: AffectiveState = {
      valence: Math.random() * 2 - 1, // -1 to 1
      arousal: Math.random(),
      trust: Math.random(),
    };

    const request: OrchestrationRequest = {
      userIntent: "Generate a comprehensive analysis and create an action plan",
      context:
        "User is working on system optimization and needs structured guidance",
      affectiveState,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await core.plan(request);
      setSelectedPlan(response);
      updateDashboard();
    } catch (error) {
      console.error("Planning error:", error);
    }
  };

  const handleExecutePlan = async () => {
    if (!selectedPlan) return;

    setIsExecuting(true);
    try {
      await core.executePlan(selectedPlan.selectedPlan);
      core.recordFeedback(selectedPlan.requestId, "success");
      updateDashboard();
    } catch (error) {
      console.error("Execution error:", error);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black chatron-grid p-8">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto bg-gradient-to-b from-transparent to-black/20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg neon-border flex items-center justify-center pulse-neon">
              <span className="text-purple-400 font-bold text-xl">C1</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                CHATRON-1 Nexus
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Daedalus Epinoetic Planning System
              </p>
            </div>
          </div>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="neon-border p-6">
            <div className="text-gray-300 text-sm mb-2">Total Requests</div>
            <div className="text-3xl font-bold text-purple-300">
              {systemStatus.totalRequests}
            </div>
          </Card>
          <Card className="neon-border p-6">
            <div className="text-gray-300 text-sm mb-2">Active Constraints</div>
            <div className="text-3xl font-bold text-cyan-300">
              {systemStatus.constraintsActive}
            </div>
          </Card>
          <Card className="neon-border p-6">
            <div className="text-gray-300 text-sm mb-2">System Status</div>
            <div className="text-lg font-bold text-green-300 capitalize">
              {systemStatus.uptime}
            </div>
          </Card>
        </div>

        {/* Main Control Section */}
        <Card className="neon-border p-8 mb-8">
          <h2 className="text-xl font-bold text-purple-200 mb-4">
            Epinoetic Planning Cycle
          </h2>
          <p className="text-gray-200 mb-6">
            Initiate the planning cycle to generate optimized tool-use plans
            aligned with ethical constraints and affective state.
          </p>

          <div className="flex gap-4">
            <Button
              onClick={handleGeneratePlan}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-2"
            >
              Generate Plan
            </Button>
            <Button
              onClick={handleExecutePlan}
              disabled={!selectedPlan || isExecuting}
              className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-2"
            >
              {isExecuting ? "Executing..." : "Execute Plan"}
            </Button>
          </div>
        </Card>

        {/* Selected Plan Display */}
        {selectedPlan && (
          <Card className="neon-border p-8 mb-8">
            <h2 className="text-xl font-bold text-cyan-200 mb-4">
              Selected Plan
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="mb-4">
                  <label className="text-gray-300 text-sm">Plan ID</label>
                  <div className="text-sm font-mono text-purple-300 mt-1">
                    {selectedPlan.selectedPlan.planId}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-gray-300 text-sm">Score</label>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                          style={{
                            width: `${selectedPlan.selectedPlan.score * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-cyan-300 font-bold">
                        {(selectedPlan.selectedPlan.score * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-gray-300 text-sm">
                    Ethical Approval
                  </label>
                  <div className="mt-2">
                    <Badge
                      className={
                        selectedPlan.selectedPlan.ethicalApproval
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }
                    >
                      {selectedPlan.selectedPlan.ethicalApproval
                        ? "Approved"
                        : "Rejected"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Reasoning
                </label>
                <p className="text-sm text-gray-300 bg-black/50 p-4 rounded border border-purple-500/30">
                  {selectedPlan.selectedPlan.reasoning}
                </p>
              </div>
            </div>

            {/* Tool Calls */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-purple-300 mb-4">
                Tool Calls ({selectedPlan.selectedPlan.toolCalls.length})
              </h3>
              <div className="space-y-3">
                {selectedPlan.selectedPlan.toolCalls.map((tool, idx) => (
                  <div
                    key={tool.id}
                    className="border border-purple-500/30 rounded p-4 bg-black/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-mono text-cyan-400 text-sm">
                        {idx + 1}. {tool.name}
                      </span>
                      <Badge className="text-xs bg-purple-600/50 text-purple-200">
                        Tool
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      {tool.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      Expected: {tool.expectedOutput}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Plan History */}
        {planHistory.length > 0 && (
          <Card className="neon-border p-8">
            <h2 className="text-xl font-bold text-purple-300 mb-4">
              Recent Plans ({planHistory.length})
            </h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {planHistory.map((plan) => (
                <div
                  key={plan.requestId}
                  className="border border-gray-700 rounded p-3 cursor-pointer hover:border-purple-500/50 transition-colors bg-black/50"
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs text-gray-500">
                        {plan.requestId}
                      </div>
                      <div className="text-sm text-cyan-400 font-semibold">
                        {plan.selectedPlan.planId}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-purple-400 font-bold">
                          {(plan.selectedPlan.score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Badge
                        className={`text-xs ${
                          plan.executionStatus === "ready"
                            ? "bg-blue-600"
                            : "bg-gray-600"
                        }`}
                      >
                        {plan.executionStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

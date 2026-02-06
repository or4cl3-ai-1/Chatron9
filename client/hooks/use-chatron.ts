import { useCallback, useEffect, useState } from "react";
import { getChatronCore, DaedalusCore } from "@/lib/chatron/daedalus-core";
import {
  AffectiveState,
  OrchestrationRequest,
  PlanningResponse,
} from "@shared/api";

export function useChatron() {
  const [core, setCore] = useState<DaedalusCore | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const coreInstance = getChatronCore();
    setCore(coreInstance);
    setIsInitialized(true);
  }, []);

  const generatePlan = useCallback(
    async (
      intent: string,
      context: string,
      affectiveState: AffectiveState
    ): Promise<PlanningResponse | null> => {
      if (!core) return null;

      const request: OrchestrationRequest = {
        userIntent: intent,
        context,
        affectiveState,
        timestamp: new Date().toISOString(),
      };

      return await core.plan(request);
    },
    [core]
  );

  const executePlan = useCallback(
    async (planId: string) => {
      if (!core) return null;
      const history = core.getHistory();
      const plan = history.find((p) => p.selectedPlan.planId === planId);
      if (!plan) return null;
      return await core.executePlan(plan.selectedPlan);
    },
    [core]
  );

  const getStatus = useCallback(() => {
    if (!core) return null;
    return core.getSystemStatus();
  }, [core]);

  const getHistory = useCallback(
    (limit?: number) => {
      if (!core) return [];
      return core.getHistory(limit);
    },
    [core]
  );

  return {
    core,
    isInitialized,
    generatePlan,
    executePlan,
    getStatus,
    getHistory,
  };
}

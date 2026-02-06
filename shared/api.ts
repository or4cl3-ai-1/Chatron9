/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * CHATRON 9.0 Planning System Types
 */
export interface AffectiveState {
  valence: number; // -1 to 1 (negative to positive)
  arousal: number; // 0 to 1 (calm to excited)
  trust: number; // 0 to 1 (low to high)
}

export interface ToolCall {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  expectedOutput: string;
}

export interface ToolUsePlan {
  planId: string;
  score: number;
  toolCalls: ToolCall[];
  reasoning: string;
  ethicalApproval: boolean;
}

export interface OrchestrationRequest {
  userIntent: string;
  context: string;
  affectiveState: AffectiveState;
  timestamp: string;
}

export interface PlanningResponse {
  requestId: string;
  selectedPlan: ToolUsePlan;
  allPlans: ToolUsePlan[];
  executionStatus: string;
}

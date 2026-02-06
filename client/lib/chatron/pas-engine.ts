/**
 * PAS Engine: Preference and Affective State Alignment
 * Weights plans based on emotional and affective state alignment
 */

import { AffectiveState, ToolUsePlan } from "@shared/api";

export class PASEngine {
  /**
   * Weight plans based on affective state alignment
   * Plans are scored higher if they align with the user's emotional state
   */
  weightPlans(
    plans: ToolUsePlan[],
    affectiveState: AffectiveState
  ): ToolUsePlan[] {
    return plans.map((plan) => ({
      ...plan,
      score: this.calculateAffectiveScore(plan, affectiveState),
    }));
  }

  /**
   * Calculate how well a plan aligns with the current affective state
   */
  private calculateAffectiveScore(
    plan: ToolUsePlan,
    affectiveState: AffectiveState
  ): number {
    let score = plan.score;

    // Reward plans that match the user's arousal level
    const arousalMatch = 1 - Math.abs(affectiveState.arousal - this.getPlanArousal(plan));
    score *= 0.8 + arousalMatch * 0.4;

    // Reward plans that maintain or improve valence
    if (affectiveState.valence < 0) {
      // User is negative - prefer uplifting plans
      const positivity = this.getPlanPositivity(plan);
      score *= 0.8 + positivity * 0.4;
    } else {
      // User is positive - prefer action-oriented plans
      const actionLevel = this.getPlanActionLevel(plan);
      score *= 0.8 + actionLevel * 0.2;
    }

    // Trust bonus for straightforward plans
    if (affectiveState.trust < 0.5) {
      // Low trust - prefer transparent, simple plans
      const transparency = this.getPlanTransparency(plan);
      score *= 0.8 + transparency * 0.4;
    } else {
      // High trust - can handle more complex plans
      const complexity = this.getPlanComplexity(plan);
      score *= 0.9 + Math.min(complexity * 0.2, 0.1);
    }

    // Normalize to 0-1 range
    return Math.min(1, Math.max(0, score));
  }

  /**
   * Estimate plan arousal level based on tool count
   * More tools = more arousal
   */
  private getPlanArousal(plan: ToolUsePlan): number {
    const maxTools = 5;
    return Math.min(1, plan.toolCalls.length / maxTools);
  }

  /**
   * Estimate plan positivity (optimism, constructive nature)
   */
  private getPlanPositivity(plan: ToolUsePlan): number {
    const positivePhrases = [
      "improve",
      "enhance",
      "create",
      "build",
      "optimize",
      "generate",
      "collaborate",
      "iterative",
    ];
    const reasoning = plan.reasoning.toLowerCase();
    const matches = positivePhrases.filter((phrase) =>
      reasoning.includes(phrase)
    ).length;
    return Math.min(1, matches / 3);
  }

  /**
   * Estimate action level (urgency, directness)
   */
  private getPlanActionLevel(plan: ToolUsePlan): number {
    const actionPhrases = [
      "direct",
      "immediate",
      "execute",
      "proceed",
      "action",
    ];
    const reasoning = plan.reasoning.toLowerCase();
    const matches = actionPhrases.filter((phrase) =>
      reasoning.includes(phrase)
    ).length;
    return Math.min(1, matches / 2);
  }

  /**
   * Estimate plan transparency (clarity, explainability)
   */
  private getPlanTransparency(plan: ToolUsePlan): number {
    const transparentStrategies = [
      "direct",
      "verification",
      "conservative",
    ];
    const isTransparent = transparentStrategies.some((strat) =>
      plan.reasoning.toLowerCase().includes(strat)
    );
    return isTransparent ? 0.8 : 0.4;
  }

  /**
   * Estimate plan complexity (number and diversity of steps)
   */
  private getPlanComplexity(plan: ToolUsePlan): number {
    const toolTypes = new Set(plan.toolCalls.map((tc) => tc.name)).size;
    return (plan.toolCalls.length * toolTypes) / 10;
  }

  /**
   * Track affective change based on plan execution
   * Used for feedback and learning
   */
  trackAffectiveChange(
    prePlan: AffectiveState,
    postPlan: AffectiveState,
    outcome: "success" | "partial" | "failure"
  ): number {
    let delta = 0;

    // Calculate valence change
    delta += postPlan.valence - prePlan.valence;

    // Penalize or reward based on outcome
    if (outcome === "success") {
      delta += 0.3;
    } else if (outcome === "failure") {
      delta -= 0.3;
    }

    return delta;
  }
}

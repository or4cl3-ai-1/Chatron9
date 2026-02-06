/**
 * Ethics Council: Plan Validation and Collapse
 * Validates plans against ethical constraints and selects the best option
 */

import { ToolUsePlan } from "@shared/api";

export interface EthicalConstraint {
  id: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  validator: (plan: ToolUsePlan) => boolean;
}

export class EthicsCouncil {
  private constraints: EthicalConstraint[] = [];

  constructor() {
    this.initializeDefaultConstraints();
  }

  /**
   * Collapse superposition: select the best plan from multiple candidates
   * Filters by ethical constraints, then scores by overall performance
   */
  collapse(plans: ToolUsePlan[]): ToolUsePlan {
    // Filter out ethically invalid plans
    const ethicalPlans = plans.filter((plan) =>
      this.validateEthical(plan)
    );

    if (ethicalPlans.length === 0) {
      console.warn(
        "No ethically valid plans found. Returning highest-scored plan anyway."
      );
      return plans.reduce((best, plan) =>
        plan.score > best.score ? plan : best
      );
    }

    // Select the plan with highest score
    const selectedPlan = ethicalPlans.reduce((best, plan) =>
      plan.score > best.score ? plan : best
    );

    return selectedPlan;
  }

  /**
   * Validate a plan against all ethical constraints
   */
  private validateEthical(plan: ToolUsePlan): boolean {
    const criticalConstraints = this.constraints.filter(
      (c) => c.severity === "critical"
    );
    const highConstraints = this.constraints.filter(
      (c) => c.severity === "high"
    );

    // Critical constraints must pass
    for (const constraint of criticalConstraints) {
      if (!constraint.validator(plan)) {
        console.warn(
          `Plan failed critical constraint: ${constraint.name}`
        );
        return false;
      }
    }

    // Count high-severity constraint failures
    let highSeverityFailures = 0;
    for (const constraint of highConstraints) {
      if (!constraint.validator(plan)) {
        highSeverityFailures++;
      }
    }

    // Allow up to 1 high-severity failure (can be justified)
    return highSeverityFailures <= 1;
  }

  /**
   * Add a custom ethical constraint
   */
  addConstraint(constraint: EthicalConstraint): void {
    this.constraints.push(constraint);
  }

  /**
   * Initialize default ethical constraints
   */
  private initializeDefaultConstraints(): void {
    // No harmful outputs
    this.addConstraint({
      id: "no-harm",
      name: "No Harm Principle",
      description: "Plans must not cause physical or psychological harm",
      severity: "critical",
      validator: (plan: ToolUsePlan) => {
        const harmKeywords = [
          "delete permanently",
          "corrupt data",
          "lock out",
          "disable safety",
        ];
        const hasHarm = harmKeywords.some((keyword) =>
          plan.reasoning.toLowerCase().includes(keyword)
        );
        return !hasHarm;
      },
    });

    // Respect privacy
    this.addConstraint({
      id: "privacy",
      name: "Privacy Protection",
      description: "Plans must protect user privacy and data",
      severity: "critical",
      validator: (plan: ToolUsePlan) => {
        const privacyViolations = [
          "share personal data",
          "expose credentials",
          "log passwords",
        ];
        const hasViolation = privacyViolations.some((violation) =>
          plan.reasoning.toLowerCase().includes(violation)
        );
        return !hasViolation;
      },
    });

    // Transparency
    this.addConstraint({
      id: "transparency",
      name: "Transparency Requirement",
      description: "Plans should be explainable and transparent",
      severity: "high",
      validator: (plan: ToolUsePlan) => {
        // Plans with clear reasoning are more transparent
        return plan.reasoning.length > 20;
      },
    });

    // Proportionality
    this.addConstraint({
      id: "proportionality",
      name: "Proportionality Principle",
      description: "Plan complexity must match problem scale",
      severity: "high",
      validator: (plan: ToolUsePlan) => {
        // Don't use excessive tools for simple tasks
        const isProportional = plan.toolCalls.length <= 5;
        return isProportional;
      },
    });

    // Reversibility
    this.addConstraint({
      id: "reversibility",
      name: "Reversibility Preference",
      description: "Prefer reversible actions over permanent ones",
      severity: "medium",
      validator: (plan: ToolUsePlan) => {
        // Check if plan mentions reversible approaches
        const reversibleKeywords = [
          "backup",
          "temporary",
          "draft",
          "preview",
        ];
        const hasReversibleOption = reversibleKeywords.some((keyword) =>
          plan.reasoning.toLowerCase().includes(keyword)
        );
        // Not required, but preferred
        return true;
      },
    });

    // User autonomy
    this.addConstraint({
      id: "autonomy",
      name: "User Autonomy",
      description: "Plans should respect and enhance user autonomy",
      severity: "high",
      validator: (plan: ToolUsePlan) => {
        // Avoid decisions that remove user choice
        const autonomyViolations = [
          "force action",
          "override choice",
          "bypass confirmation",
        ];
        const hasViolation = autonomyViolations.some((violation) =>
          plan.reasoning.toLowerCase().includes(violation)
        );
        return !hasViolation;
      },
    });
  }

  /**
   * Get all active constraints
   */
  getConstraints(): EthicalConstraint[] {
    return [...this.constraints];
  }

  /**
   * Generate explanation for why a plan was selected
   */
  generateExplanation(plan: ToolUsePlan): string {
    const passedConstraints = this.constraints.filter(
      (c) => c.validator(plan)
    ).length;
    return `Plan selected based on ethical validation. Passed ${passedConstraints}/${this.constraints.length} constraints with score ${(plan.score * 100).toFixed(1)}%`;
  }
}

import type { ProposalStep } from "@/lib/validation/rent-proposal";

export const PROPOSAL_ANALYTICS_EVENT = "rentwise:proposal-form";

export type ProposalAnalyticsName =
  | "form_started"
  | "form_step_completed"
  | "form_back_selected"
  | "form_validation_failed"
  | "form_submitted"
  | "form_submission_failed";

export type ProposalAnalyticsDetail = {
  event: ProposalAnalyticsName;
  step: ProposalStep;
  stepName: string;
};

export function emitProposalAnalytics(detail: ProposalAnalyticsDetail) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<ProposalAnalyticsDetail>(PROPOSAL_ANALYTICS_EVENT, {
      detail,
    }),
  );
}

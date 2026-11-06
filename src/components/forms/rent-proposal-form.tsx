"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion";
import { emitProposalAnalytics } from "@/lib/proposal-analytics";
import {
  BEDROOM_OPTIONS,
  createProposalPayload,
  getProposalStep,
  INITIAL_PROPOSAL_VALUES,
  normaliseProposalStep,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
  PROPOSAL_STEPS,
  validateProposalStep,
  type ProposalFieldErrors,
  type ProposalFieldName,
  type ProposalStep,
  type ProposalValues,
} from "@/lib/validation/rent-proposal";

type SubmissionState =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; preview: boolean; message: string }
  | { type: "error"; message: string };

type TransitionDirection = -1 | 1;

const stepTransitionVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 10,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -10,
  }),
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="field-error">
      {message}
    </p>
  );
}

function ProposalProgress({ currentStep }: { currentStep: ProposalStep }) {
  const progress = (currentStep - 1) / (PROPOSAL_STEPS.length - 1);
  const step = getProposalStep(currentStep);

  return (
    <>
      <div className="wizard-progress-desktop" aria-hidden="true">
        <span className="wizard-progress-track">
          <span
            className="wizard-progress-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </span>
        <ol>
          {PROPOSAL_STEPS.map((item) => {
            const state =
              item.number < currentStep
                ? "complete"
                : item.number === currentStep
                  ? "current"
                  : "future";

            return (
              <li data-state={state} key={item.number}>
                <span className="wizard-progress-marker">
                  {state === "complete"
                    ? "✓"
                    : String(item.number).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="wizard-progress-mobile" aria-hidden="true">
        <div>
          <span>
            Step {currentStep} of {PROPOSAL_STEPS.length}
          </span>
          <strong>{step.label}</strong>
        </div>
        <span className="wizard-mobile-track">
          <span
            className="wizard-progress-fill"
            style={{
              transform: `scaleX(${currentStep / PROPOSAL_STEPS.length})`,
            }}
          />
        </span>
      </div>
    </>
  );
}

function ReviewGroup({
  children,
  onEdit,
  title,
}: {
  children: ReactNode;
  onEdit: () => void;
  title: string;
}) {
  return (
    <section className="review-group">
      <header>
        <h4>{title}</h4>
        <button
          type="button"
          className="review-edit-button"
          aria-label={`Edit ${title.toLowerCase()}`}
          onClick={onEdit}
        >
          Edit
        </button>
      </header>
      <dl className="review-rows">{children}</dl>
    </section>
  );
}

function ReviewRow({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "review-row review-row-wide" : "review-row"}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function RentProposalForm() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [currentStep, setCurrentStep] = useState<ProposalStep>(1);
  const [direction, setDirection] = useState<TransitionDirection>(1);
  const [values, setValues] = useState<ProposalValues>(INITIAL_PROPOSAL_VALUES);
  const [errors, setErrors] = useState<ProposalFieldErrors>({});
  const [submission, setSubmission] = useState<SubmissionState>({
    type: "idle",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);
  const focusStepAfterNavigationRef = useRef(false);

  const step = getProposalStep(currentStep);
  const errorCount = Object.keys(errors).length;

  useEffect(() => {
    if (submission.type === "success") {
      successRef.current?.focus();
    }
  }, [submission.type]);

  useEffect(() => {
    if (submission.type !== "idle" || !focusStepAfterNavigationRef.current) {
      return;
    }

    const focusDelay = shouldReduceMotion
      ? 0
      : MOTION_DURATION.interface * 1000;
    const focusTimer = window.setTimeout(() => {
      focusStepAfterNavigationRef.current = false;
      stepHeadingRef.current?.focus();
    }, focusDelay);

    return () => window.clearTimeout(focusTimer);
  }, [currentStep, shouldReduceMotion, submission.type]);

  function announceFormStarted() {
    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;
    emitProposalAnalytics({
      event: "form_started",
      step: currentStep,
      stepName: step.label,
    });
  }

  function clearFieldError(name: ProposalFieldName) {
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });

    if (submission.type === "error") {
      setSubmission({ type: "idle" });
    }
  }

  function updateTextField(
    name: Exclude<ProposalFieldName, "consent">,
    value: string,
  ) {
    setValues((current) => ({ ...current, [name]: value }));
    clearFieldError(name);
  }

  function updateConsent(checked: boolean) {
    setValues((current) => ({ ...current, consent: checked }));
    clearFieldError("consent");
  }

  function focusFirstInvalidField(nextErrors: ProposalFieldErrors) {
    const firstInvalidName = Object.keys(nextErrors)[0] as ProposalFieldName;

    formRef.current
      ?.querySelector<HTMLElement>(`[name="${firstInvalidName}"]`)
      ?.focus();
  }

  function reportValidationFailure(nextErrors: ProposalFieldErrors) {
    setErrors(nextErrors);
    setSubmission({ type: "idle" });
    emitProposalAnalytics({
      event: "form_validation_failed",
      step: currentStep,
      stepName: step.label,
    });
    focusFirstInvalidField(nextErrors);
  }

  function moveToStep(
    nextStep: ProposalStep,
    nextDirection: TransitionDirection,
  ) {
    setErrors({});
    setSubmission({ type: "idle" });
    setDirection(nextDirection);
    focusStepAfterNavigationRef.current = true;
    setCurrentStep(nextStep);
  }

  function handleContinue() {
    const normalisedValues = normaliseProposalStep(values, currentStep);
    const nextErrors = validateProposalStep(normalisedValues, currentStep);

    setValues(normalisedValues);

    if (Object.keys(nextErrors).length > 0) {
      reportValidationFailure(nextErrors);
      return;
    }

    emitProposalAnalytics({
      event: "form_step_completed",
      step: currentStep,
      stepName: step.label,
    });
    moveToStep((currentStep + 1) as ProposalStep, 1);
  }

  function handleBack() {
    const nextStep = (currentStep - 1) as ProposalStep;

    emitProposalAnalytics({
      event: "form_back_selected",
      step: nextStep,
      stepName: getProposalStep(nextStep).label,
    });
    moveToStep(nextStep, -1);
  }

  function handleEdit(nextStep: ProposalStep) {
    emitProposalAnalytics({
      event: "form_back_selected",
      step: nextStep,
      stepName: getProposalStep(nextStep).label,
    });
    moveToStep(nextStep, -1);
  }

  async function submitProposal() {
    if (submission.type === "loading") {
      return;
    }

    const nextErrors = validateProposalStep(values, 4);

    if (Object.keys(nextErrors).length > 0) {
      reportValidationFailure(nextErrors);
      return;
    }

    setErrors({});
    setSubmission({ type: "loading" });

    try {
      const response = await fetch("/api/rent-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createProposalPayload(values)),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        preview?: boolean;
      };

      if (!response.ok || !result.ok) {
        throw new Error("Submission failed");
      }

      emitProposalAnalytics({
        event: "form_submitted",
        step: 4,
        stepName: "Review",
      });
      setValues(INITIAL_PROPOSAL_VALUES);
      setErrors({});
      setSubmission({
        type: "success",
        preview: Boolean(result.preview),
        message: result.preview
          ? "The form has been checked successfully. Submissions are not stored until the production enquiry service is connected."
          : "Rent Wise will review the details and contact you to discuss the property and its suitability.",
      });
    } catch {
      emitProposalAnalytics({
        event: "form_submission_failed",
        step: 4,
        stepName: "Review",
      });
      setSubmission({
        type: "error",
        message:
          "Your enquiry could not be submitted. Your details are still here, so you can try again.",
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (currentStep < 4) {
      handleContinue();
      return;
    }

    await submitProposal();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (
      event.key !== "Enter" ||
      currentStep === 4 ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLButtonElement
    ) {
      return;
    }

    event.preventDefault();
    handleContinue();
  }

  function startAnotherEnquiry() {
    setDirection(-1);
    setCurrentStep(1);
    setValues(INITIAL_PROPOSAL_VALUES);
    setErrors({});
    setSubmission({ type: "idle" });
    hasStartedRef.current = false;
    focusStepAfterNavigationRef.current = true;
  }

  if (submission.type === "success") {
    return (
      <m.div
        ref={successRef}
        className="proposal-form proposal-success"
        role="status"
        aria-live="polite"
        tabIndex={-1}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : MOTION_DURATION.interface,
          ease: MOTION_EASE.entrance,
        }}
      >
        <span className="success-marker" aria-hidden="true">
          ✓
        </span>
        <h3>
          {submission.preview
            ? "Form check complete"
            : "Thank you. Your property enquiry has been received."}
        </h3>
        <p>{submission.message}</p>
        <button
          type="button"
          className="form-secondary-button"
          onClick={startAnotherEnquiry}
        >
          Send another enquiry
        </button>
      </m.div>
    );
  }

  return (
    <m.form
      ref={formRef}
      className="proposal-form"
      noValidate
      aria-busy={submission.type === "loading"}
      onFocusCapture={announceFormStarted}
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
      initial={{ opacity: 0.985 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: shouldReduceMotion ? 0 : MOTION_DURATION.interface,
        ease: MOTION_EASE.entrance,
      }}
    >
      <ProposalProgress currentStep={currentStep} />

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Step {currentStep} of {PROPOSAL_STEPS.length}: {step.label}
      </p>

      <div className="wizard-stage">
        <AnimatePresence initial={false}>
          {submission.type === "error" ? (
            <m.div
              key="submission-error"
              className="form-status form-status-error"
              role="alert"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
              transition={{
                duration: shouldReduceMotion ? 0 : MOTION_DURATION.interface,
                ease: MOTION_EASE.entrance,
              }}
            >
              <strong>There was a problem</strong>
              <p>{submission.message}</p>
            </m.div>
          ) : null}

          {errorCount > 0 ? (
            <m.div
              key={`validation-error-${currentStep}`}
              className="form-status form-status-error"
              role="alert"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
              transition={{
                duration: shouldReduceMotion ? 0 : MOTION_DURATION.interface,
                ease: MOTION_EASE.entrance,
              }}
            >
              <strong>Check the highlighted fields</strong>
              <p>
                {errorCount === 1
                  ? "Complete the highlighted field before continuing."
                  : `Complete the ${errorCount} highlighted fields before continuing.`}
              </p>
            </m.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <m.div
            key={currentStep}
            className="wizard-step"
            custom={shouldReduceMotion ? 0 : direction}
            variants={stepTransitionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: shouldReduceMotion ? 0 : MOTION_DURATION.interface,
              ease: MOTION_EASE.interface,
            }}
          >
            <header className="wizard-step-header">
              <p className="wizard-step-label">{step.label}</p>
              <h3
                ref={stepHeadingRef}
                id={`proposal-step-${currentStep}-title`}
                tabIndex={-1}
              >
                {step.heading}
              </h3>
              <p>{step.description}</p>
            </header>

            {currentStep === 1 ? (
              <div className="wizard-fields">
                <div className="field-group wizard-field-wide">
                  <label htmlFor="postcode">Property postcode (required)</label>
                  <input
                    id="postcode"
                    name="postcode"
                    type="text"
                    autoComplete="postal-code"
                    value={values.postcode}
                    aria-invalid={Boolean(errors.postcode)}
                    aria-describedby={
                      errors.postcode ? "postcode-error" : undefined
                    }
                    onChange={(event) =>
                      updateTextField("postcode", event.target.value)
                    }
                  />
                  <FieldError id="postcode-error" message={errors.postcode} />
                </div>

                <div className="field-group">
                  <label htmlFor="propertyType">Property type (required)</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={values.propertyType}
                    aria-invalid={Boolean(errors.propertyType)}
                    aria-describedby={
                      errors.propertyType ? "property-type-error" : undefined
                    }
                    onChange={(event) =>
                      updateTextField("propertyType", event.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select property type
                    </option>
                    {PROPERTY_TYPES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <FieldError
                    id="property-type-error"
                    message={errors.propertyType}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="bedrooms">
                    Number of bedrooms (required)
                  </label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={values.bedrooms}
                    aria-invalid={Boolean(errors.bedrooms)}
                    aria-describedby={
                      errors.bedrooms ? "bedrooms-error" : undefined
                    }
                    onChange={(event) =>
                      updateTextField("bedrooms", event.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select bedrooms
                    </option>
                    {BEDROOM_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <FieldError id="bedrooms-error" message={errors.bedrooms} />
                </div>
              </div>
            ) : null}

            {currentStep === 2 ? (
              <div className="wizard-fields">
                <div className="field-group wizard-field-wide">
                  <label htmlFor="propertyStatus">
                    Current property status (required)
                  </label>
                  <select
                    id="propertyStatus"
                    name="propertyStatus"
                    value={values.propertyStatus}
                    aria-invalid={Boolean(errors.propertyStatus)}
                    aria-describedby={
                      errors.propertyStatus
                        ? "property-status-error"
                        : undefined
                    }
                    onChange={(event) =>
                      updateTextField("propertyStatus", event.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select current status
                    </option>
                    {PROPERTY_STATUSES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <FieldError
                    id="property-status-error"
                    message={errors.propertyStatus}
                  />
                </div>

                <div className="field-group wizard-field-wide">
                  <label htmlFor="message">Anything else we should know?</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    aria-describedby="message-help"
                    onChange={(event) =>
                      updateTextField("message", event.target.value)
                    }
                  />
                  <p id="message-help" className="field-help">
                    You can mention condition, availability, access or anything
                    else that may be useful.
                  </p>
                </div>
              </div>
            ) : null}

            {currentStep === 3 ? (
              <div className="wizard-fields">
                <div className="field-group wizard-field-wide">
                  <label htmlFor="fullName">Full name (required)</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={values.fullName}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? "full-name-error" : undefined
                    }
                    onChange={(event) =>
                      updateTextField("fullName", event.target.value)
                    }
                  />
                  <FieldError id="full-name-error" message={errors.fullName} />
                </div>

                <div className="field-group">
                  <label htmlFor="email">Email address (required)</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={values.email}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    onChange={(event) =>
                      updateTextField("email", event.target.value)
                    }
                  />
                  <FieldError id="email-error" message={errors.email} />
                </div>

                <div className="field-group">
                  <label htmlFor="telephone">Telephone number (required)</label>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={values.telephone}
                    aria-invalid={Boolean(errors.telephone)}
                    aria-describedby={
                      errors.telephone ? "telephone-error" : undefined
                    }
                    onChange={(event) =>
                      updateTextField("telephone", event.target.value)
                    }
                  />
                  <FieldError id="telephone-error" message={errors.telephone} />
                </div>

                <fieldset
                  className="contact-method wizard-field-wide"
                  aria-invalid={Boolean(errors.contactMethod)}
                  aria-describedby={
                    errors.contactMethod ? "contact-method-error" : undefined
                  }
                >
                  <legend>Preferred contact method (required)</legend>
                  <div>
                    {[
                      ["email-contact", "Email", "Email"],
                      ["telephone-contact", "Telephone", "Telephone"],
                      ["either-contact", "Either", "Either"],
                    ].map(([id, label, value]) => (
                      <label key={id} htmlFor={id}>
                        <input
                          id={id}
                          name="contactMethod"
                          type="radio"
                          value={value}
                          checked={values.contactMethod === value}
                          onChange={(event) =>
                            updateTextField("contactMethod", event.target.value)
                          }
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                  <FieldError
                    id="contact-method-error"
                    message={errors.contactMethod}
                  />
                </fieldset>
              </div>
            ) : null}

            {currentStep === 4 ? (
              <>
                <div className="review-groups">
                  <ReviewGroup
                    title="Property details"
                    onEdit={() => handleEdit(1)}
                  >
                    <ReviewRow label="Postcode" value={values.postcode} />
                    <ReviewRow
                      label="Property type"
                      value={values.propertyType}
                    />
                    <ReviewRow label="Bedrooms" value={values.bedrooms} />
                  </ReviewGroup>

                  <ReviewGroup
                    title="Current situation"
                    onEdit={() => handleEdit(2)}
                  >
                    <ReviewRow
                      label="Property status"
                      value={values.propertyStatus}
                    />
                    <ReviewRow
                      wide
                      label="Additional information"
                      value={values.message || "Not provided"}
                    />
                  </ReviewGroup>

                  <ReviewGroup
                    title="Contact details"
                    onEdit={() => handleEdit(3)}
                  >
                    <ReviewRow label="Name" value={values.fullName} />
                    <ReviewRow label="Email" value={values.email} />
                    <ReviewRow label="Telephone" value={values.telephone} />
                    <ReviewRow
                      label="Preferred contact method"
                      value={values.contactMethod}
                    />
                  </ReviewGroup>
                </div>

                <div className="consent-field wizard-consent">
                  <label htmlFor="consent">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={values.consent}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={
                        errors.consent ? "consent-error" : undefined
                      }
                      onChange={(event) => updateConsent(event.target.checked)}
                    />
                    <span>
                      I agree that Rent Wise may contact me about my property
                      enquiry. See the Privacy Policy for details.
                    </span>
                  </label>
                  <FieldError id="consent-error" message={errors.consent} />
                </div>
              </>
            ) : null}

            <div
              className={
                currentStep === 1
                  ? "wizard-actions wizard-actions-forward"
                  : "wizard-actions"
              }
            >
              {currentStep > 1 ? (
                <button
                  type="button"
                  className="form-secondary-button"
                  disabled={submission.type === "loading"}
                  onClick={handleBack}
                >
                  Back
                </button>
              ) : null}

              <button
                type="submit"
                className="form-primary-button"
                disabled={submission.type === "loading"}
              >
                <AnimatePresence initial={false} mode="wait">
                  <m.span
                    key={
                      submission.type === "loading" ? "loading" : currentStep
                    }
                    initial={{
                      opacity: 0,
                      y: shouldReduceMotion ? 0 : 3,
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: shouldReduceMotion ? 0 : -3,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : MOTION_DURATION.fast,
                      ease: MOTION_EASE.interface,
                    }}
                  >
                    {submission.type === "loading"
                      ? "Sending enquiry"
                      : currentStep === 4
                        ? "Request my proposal"
                        : "Continue"}
                  </m.span>
                </AnimatePresence>
              </button>
            </div>

            {currentStep === 4 ? (
              <p className="form-privacy-note">
                Your details are used only to respond to this property enquiry.
                Separate optional marketing consent is not requested.
              </p>
            ) : null}
          </m.div>
        </AnimatePresence>
      </div>
    </m.form>
  );
}

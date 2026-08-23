"use client";

import { useId } from "react";
import { AlertTriangle } from "lucide-react";

import Button from "@/components/shared/Button";

type ErrorStateProps = {
  title: string;
  description: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
};

export default function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = "Try again",
  className = "",
}: ErrorStateProps) {
  const titleId = useId();

  return (
    <section
      role="alert"
      aria-labelledby={titleId}
      className={`card-surface state-panel ${className}`}
    >
      <span className="state-icon bg-soft-warning text-warning">
        <AlertTriangle aria-hidden="true" size={28} />
      </span>
      <h2 id={titleId} className="state-title">
        {title}
      </h2>
      <p className="state-description">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} className="state-action">
          {retryLabel}
        </Button>
      )}
    </section>
  );
}

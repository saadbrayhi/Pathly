"use client";

import { useId } from "react";
import { FileQuestion } from "lucide-react";

import Button from "@/components/shared/Button";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={`card-surface state-panel ${className}`}
    >
      <span className="state-icon bg-soft-blue text-primary">
        <FileQuestion aria-hidden="true" size={28} />
      </span>
      <h2 id={titleId} className="state-title">
        {title}
      </h2>
      {description && <p className="state-description">{description}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="state-action">
          {actionLabel}
        </Button>
      )}
    </section>
  );
}

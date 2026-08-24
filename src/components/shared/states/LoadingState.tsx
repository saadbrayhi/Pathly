import { LoaderCircle } from "lucide-react";

type LoadingStateProps = {
  message?: string;
  className?: string;
};

export default function LoadingState({
  message,
  className = "",
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`loading-state ${className}`}
    >
      <LoaderCircle aria-hidden="true" className="loading-indicator" />
      <span className={message ? "" : "sr-only"}>{message ?? "Loading"}</span>
    </div>
  );
}

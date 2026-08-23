import { CheckCircle2, Users, AlertTriangle } from "lucide-react";

type VerificationStatus =
  | "verified"
  | "community-confirmed"
  | "needs-verification";

type VerificationBadgeProps = {
  status: VerificationStatus;
};

export default function VerificationBadge({ status }: VerificationBadgeProps) {
  const config = {
    verified: {
      label: "Verified",
      icon: CheckCircle2,
      className: "border-[#bde9df] bg-[#e7f8f4] text-[#0f9f8f]",
    },

    "community-confirmed": {
      label: "Community Confirmed",
      icon: Users,
      className: "border-[#c2d3ff] bg-[#eaf0ff] text-[#3157d5]",
    },

    "needs-verification": {
      label: "Needs Verification",
      icon: AlertTriangle,
      className: "border-[#f0d070] bg-[#fff5df] text-[#b76800]",
    },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${current.className}`}
    >
      <Icon size={13} />

      {current.label}
    </span>
  );
}

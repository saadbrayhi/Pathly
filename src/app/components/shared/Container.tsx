import {ReactNode} from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-300 px-6 ${className}`}
    >
      {children}
    </div>
  );
}
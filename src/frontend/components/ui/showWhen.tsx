import { ReactNode } from "react";

const ShowWhen = ({
  showWhen,
  children,
}: {
  showWhen: boolean;
  children: ReactNode;
}) => {
  if (showWhen) return children;
  return null;
};

export default ShowWhen;

import { Banner } from "@payloadcms/ui/elements/Banner";
import React from "react";

import { Button } from "@payloadcms/ui";

const baseClass = "before-dashboard";

export const DashboardCustom: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your dashboard!</h4>
      </Banner>
      Here&apos;s what to do next:
    </div>
  );
};

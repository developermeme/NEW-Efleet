import React, { useState } from "react";
import FullPageLoader from "../ui-kit/PageLoader/Index";

const usePageLoader = () => {
  const [loading, setLoading] = useState(false);

  return [
    loading ? <FullPageLoader /> : null,
    () => setLoading(true),
    () => setLoading(false),
  ];
};

export default usePageLoader;

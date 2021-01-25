import React from "react";

function useRenderCount() {
  const renderCount = React.useRef(0);

  React.useEffect(() => {
    renderCount.current += 1;
  });

  return renderCount.current;
}

function useLogRenderCount(componentLabel) {
  const renderCount = useRenderCount();
  React.useEffect(() => {
    console.log(`Component ${componentLabel} render count: ${renderCount}`);
  }, [componentLabel, renderCount]);
}

export { useRenderCount, useLogRenderCount };

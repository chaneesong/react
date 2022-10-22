import React, { memo } from 'react';

const TryHooks = memo(({ TriInfo }) => {
  return (
    <>
      <div>
        {TriInfo.value} - {TriInfo.result}
      </div>
    </>
  );
});

TryHooks.displayName = 'Try';

export default TryHooks;

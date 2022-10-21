import React from 'react';

const TryHooks = ({ TriInfo }) => {
  return (
    <>
      <div>
        {TriInfo.value} - {TriInfo.result}
      </div>
    </>
  );
};

export default TryHooks;

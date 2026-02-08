import { useState } from 'react';

export function useApproval() {
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  const approve = () => {
    setApproved(true);
    setRejected(false);
  };

  const reject = () => {
    setRejected(true);
    setApproved(false);
  };

  const reset = () => {
    setApproved(false);
    setRejected(false);
  };

  return { approved, rejected, approve, reject, reset };
}

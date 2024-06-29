import React from 'react';
import Button from '../Button.tsx';

interface SubmitButtonProps {
  isSubmitting: boolean;
  children: React.ReactNode;
}

function SubmitButton({ isSubmitting, children }: SubmitButtonProps) {
  return (
    <Button
      size="medium"
      shape="full"
      color="primary"
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting ? '...' : children}
    </Button>
  );
}

export default SubmitButton;

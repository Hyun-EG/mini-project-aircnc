import React from 'react';
import { IconDots } from '@tabler/icons-react';
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
      {isSubmitting ? <IconDots size={16} /> : children}
    </Button>
  );
}

export default SubmitButton;

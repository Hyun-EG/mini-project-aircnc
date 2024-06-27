import { useRef } from 'react';
import styled from 'styled-components';

const FormLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & > :last-child {
    margin-top: 24px;
  }
`;

interface FormProps {
  children: React.ReactNode;
  onSubmit: () => void;
}

function Form({ children, onSubmit }: FormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <FormLayout ref={formRef} onSubmit={onSubmit}>
      {children}
    </FormLayout>
  );
}

export default Form;

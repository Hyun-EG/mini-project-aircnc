import {
  SelectHTMLAttributes,
  createElement,
  forwardRef,
  useState,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import { IconSelector } from '@tabler/icons-react';

const SelectWrapper = styled.section`
  position: relative;
`;

const SelectLayout = styled.select<{ $isSelected: boolean }>`
  width: 100%;
  padding: 0.75rem 1.5rem;
  color: ${(props) => (props.$isSelected ? '#000' : '#777')};
  border: 1px solid #999;
  border-radius: 16px;
  outline-color: ${(props) => props.theme.color.primary};
  box-sizing: border-box;
  background-color: inherit;
  font-size: 1rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  line-height: 0;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
`;

const SelectLabel = styled.label`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
`;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  register?: UseFormRegisterReturn<string>;
  label?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, register = {}, label = '', ...props }, ref) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleOnChange = () => {
      setIsSelected(true);
    };

    return (
      <label htmlFor={register ? register.name : ''}>
        {label.length ? <SelectLabel>{label}</SelectLabel> : ''}
        <SelectWrapper>
          {createElement(
            SelectLayout,
            {
              ref,
              $isSelected: isSelected,
              ...register,
              onChange: handleOnChange,
              ...props,
            },
            children,
          )}
          <SelectIcon>
            <IconSelector color={isSelected ? '#000' : '#777'} />
          </SelectIcon>
        </SelectWrapper>
      </label>
    );
  },
);
Select.displayName = 'Select';

export default Select;

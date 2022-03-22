import React from 'react';
import { useForm } from 'react-hook-form';

interface FormProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  defaultValues?: Record<string, any>;
  children: React.ReactElement[];
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  className?: string;
}
export const Form = ({ defaultValues, children, onSubmit, className }: FormProps) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {React.Children.map(children, (child) => {
        // console.log(child.props.name);
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                control: methods.control,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};

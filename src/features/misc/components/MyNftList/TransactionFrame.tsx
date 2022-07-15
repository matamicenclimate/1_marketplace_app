export function TransactionFrame({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={`w-[70%] ${className ?? ''}`.trim()} {...props}>
      {children}
    </div>
  );
}

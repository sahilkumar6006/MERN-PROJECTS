import { Label } from "../ui/label";

export default function FormRow({
  label,
  info,
  error,
  children,
}: {
  label?: string;
  info?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <Label
          className="font-normal"
          htmlFor={children ? (children as React.ReactElement).props.id : ""}
        >
          {label}
        </Label>
      )}
      {children}
      {info && <div className="text-xs text-muted-foreground">{info}</div>}
      {error && <div className="text-xs text-red-700">{error}</div>}
    </div>
  );
}

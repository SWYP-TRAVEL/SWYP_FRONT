type LabelProps = {
  type?: string; // 1Noraml, 1Reading, 2
  htmlFor: string;
  children: string;
};

export default function Label({ htmlFor, children }: LabelProps) {
  return (
    <label className="text-sm text-primary" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

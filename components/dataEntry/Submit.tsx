import { Button } from "antd";
import { Control, useController, useFormContext } from "react-hook-form";

interface SubmitButtonPropsType {
  control: any;
  label: string;
  handleClick?: () => void;
}

export default function SubmitButton({
  label = "Submit",
  control,
}: SubmitButtonPropsType) {
  const data = useFormContext();
  //   const { field } = useController({
  //     ...control,
  //   });

  //   console.log('field', field);
  return <Button htmlType="submit">{label}</Button>;
}

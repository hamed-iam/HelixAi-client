import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from "react-hook-form";
import { Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

interface RHFInputFieldProps {
  control: Control<any>;
  name: string;
  type?: "outline" | "fill" | "password";
  label?: string;
  placeholder?: string;
  showStatus?: boolean;
  disabled?: boolean;
  size?: SizeType;
  onChange?: (value: string) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
}

const { Password } = Input;

const RHFInputField = (props: RHFInputFieldProps) => {
  const {
    control,
    type = "outline",
    name,
    label,
    rules,
    showStatus,
    ...rest
  } = props;

  const getStatus = (error: FieldError | undefined, isTouched: boolean) => {
    // TODO: refactor a bit later, more concise code needed

    if (type === "fill") {
      if (!showStatus) return ["", ""];
      if (error) return ["attentionIcon", "fill-error"];
      if (isTouched) return ["validationOkIcon", "fill-success"];
      return ["", ""];
    }

    if (type === "outline") {
      if (!showStatus) return ["", ""];
      if (error) return ["attentionIcon", "error"];
      if (isTouched) return ["validationOkIcon", "success"];
      return ["", ""];
    }

    return ["", ""];
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const [title, icon] = getStatus(fieldState.error, fieldState.isTouched);

        return (
          <>
            {label && <label htmlFor={field.name}>{label}</label>}
            <div className={`container`}>
              {type === "password" ? (
                <Password
                  {...rest}
                  {...field}
                  id={field.name}
                  status={fieldState.error ? "error" : undefined}
                  className={`${icon}`}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    if (props.onChange) {
                      props.onChange(e.target.value);
                    }
                  }}
                />
              ) : (
                <Input
                  {...rest}
                  {...field}
                  id={field.name}
                  status={fieldState.error ? "error" : undefined}
                  className={`${icon}`}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    if (props.onChange) {
                      props.onChange(e.target.value);
                    }
                  }}
                />
              )}
            </div>

            {fieldState.error ? (
              <span className="error-msg">{fieldState.error?.message}</span>
            ) : null}
          </>
        );
      }}
    />
  );
};

export default RHFInputField;

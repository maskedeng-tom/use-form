////////////////////////////////////////////////////////////////////////////////

interface HandlerOptionBase {
  ref?: React.MutableRefObject<HTMLElement | null | undefined>;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  validate?: (v: string) => string | boolean;
}

interface TextHandlerOptionBase extends HandlerOptionBase {
  maxLength?: number;
  minLength?: number;
  pattern?: string | RegExp;
}

interface NumberHandlerOptionBase extends HandlerOptionBase {
  max?: number;
  min?: number;
  step?: number;
}

interface DateTimeHandlerOptionBase extends HandlerOptionBase {
  max?: string;
  min?: string;
  step?: number | 'any';
}

////////////////////////////////////////////////////////////////////////////////

interface FormHandlerOption {
  noValidate?: boolean;
}

////////////////////////////////////////////////////////////////////////////////

interface CheckboxHandlerOption extends Omit<HandlerOptionBase, 'validate'> {
  maxChecked?: number;
  minChecked?: number;
  value?: string;
}

type ColorHandlerOption = Omit<HandlerOptionBase, 'validate'>;

type DateHandlerOption = DateTimeHandlerOptionBase;

type DateTimeLocalHandlerOption = DateTimeHandlerOptionBase;

type EmailHandlerOption = TextHandlerOptionBase;

type FileHandlerOption = Omit<HandlerOptionBase, 'validate'>;

type MonthHandlerOption = DateTimeHandlerOptionBase;

type NumberHandlerOption = NumberHandlerOptionBase;

type PasswordHandlerOption = TextHandlerOptionBase;

interface RadioHandlerOption extends Omit<HandlerOptionBase, 'validate'> {
  value?: string;
}

type RangeHandlerOption = NumberHandlerOptionBase;

type SearchHandlerOption = TextHandlerOptionBase;

type TelHandlerOption = TextHandlerOptionBase;

type TextHandlerOption = TextHandlerOptionBase;

type TimeHandlerOption = DateTimeHandlerOptionBase;

type UrlHandlerOption = TextHandlerOptionBase;

type WeekHandlerOption = DateTimeHandlerOptionBase;

////////////////////////////////////////////////////////////////////////////////

type TextAreaHandlerOption = TextHandlerOption;

type SelectHandlerOption = Omit<HandlerOptionBase, 'validate'>

interface SelectMultipleHandlerOption extends Omit<HandlerOptionBase, 'validate'>{
  maxSelected?: number;
  minSelected?: number;
}

////////////////////////////////////////////////////////////////////////////////

interface HandlerOption {
  ref?: React.MutableRefObject<HTMLElement | null | undefined>;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  pattern?: string | RegExp;
  validate?: (v: string) => string | boolean;
  maxLength?: number;
  minLength?: number;
  max?: string | number;
  min?: string | number;
  step?: string | number;
  maxChecked?: number;
  minChecked?: number;
  maxSelected?: number;
  minSelected?: number;
}

////////////////////////////////////////////////////////////////////////////////

const margeHandlerOption = (option?: HandlerOption, hooksOption?: HandlerOption): HandlerOption => {
  return {
    ref: option?.ref ?? hooksOption?.ref,
    //
    required: option?.required ?? hooksOption?.required,
    maxLength: option?.maxLength ?? hooksOption?.maxLength,
    minLength: option?.minLength ?? hooksOption?.minLength,
    max: option?.max ?? hooksOption?.max,
    min: option?.min ?? hooksOption?.min,
    step: option?.step ?? hooksOption?.step,
    pattern: option?.pattern ?? hooksOption?.pattern,
    //
    disabled: option?.disabled ?? hooksOption?.disabled,
    readonly: option?.readonly ?? hooksOption?.readonly,
    //
    validate: option?.validate ?? hooksOption?.validate,
    //
    maxChecked: option?.maxChecked ?? hooksOption?.maxChecked,
    minChecked: option?.minChecked ?? hooksOption?.minChecked,
    //
    maxSelected: option?.maxSelected ?? hooksOption?.maxSelected,
    minSelected: option?.minSelected ?? hooksOption?.minSelected,
  };
};

////////////////////////////////////////////////////////////////////////////////

export {
  HandlerOption,
  margeHandlerOption,
  //
  FormHandlerOption,
  //
  CheckboxHandlerOption,
  ColorHandlerOption,
  DateHandlerOption,
  DateTimeLocalHandlerOption,
  EmailHandlerOption,
  FileHandlerOption,
  MonthHandlerOption,
  NumberHandlerOption,
  PasswordHandlerOption,
  RadioHandlerOption,
  RangeHandlerOption,
  SearchHandlerOption,
  TelHandlerOption,
  TextHandlerOption,
  TimeHandlerOption,
  UrlHandlerOption,
  WeekHandlerOption,
  //
  TextAreaHandlerOption,
  SelectHandlerOption,
  SelectMultipleHandlerOption,
};
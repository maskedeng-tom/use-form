import { useState } from 'react';
import {
  useForm,
  SubmitHandler,
  UseFormOptions,
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
} from '../';

////////////////////////////////////////////////////////////////////////////////

interface FormProps {
  email?: string;
  password?: string;
  search?: string;
  tel?: string;
  text?: string;
  url?: string;
  //
  date?: string;
  dateTimeLocal?: string;
  month?: string;
  time?: string;
  week?: string;
  //
  number?: number;
  range?: number;
  //
  checkbox?: string[];
  radio?: string;
  //
  color?: string;
  file?: FileList;
  //
  select?: string;
  textarea?: string;
  //
  selectMultiple?: string[];
}

interface FormPropsOptions {
  email?: EmailHandlerOption;
  password?: PasswordHandlerOption;
  search?: SearchHandlerOption;
  tel?: TelHandlerOption;
  text?: TextHandlerOption;
  url?: UrlHandlerOption;
  //
  date?: DateHandlerOption;
  dateTimeLocal?: DateTimeLocalHandlerOption;
  month?: MonthHandlerOption;
  time?:   TimeHandlerOption;
  week?: WeekHandlerOption;
  //
  number?: NumberHandlerOption;
  range?: RangeHandlerOption;
  //
  checkbox?: CheckboxHandlerOption;
  radio?: RadioHandlerOption;
  //
  color?: ColorHandlerOption;
  file?: FileHandlerOption;
  //
  select?: SelectHandlerOption;
  textarea?: TextAreaHandlerOption;
  //
  selectMultiple?: SelectMultipleHandlerOption;
}

////////////////////////////////////////////////////////////////////////////////

interface TestResult {
  invalid?: {[key: string]:string | undefined};
  isInvalid?: boolean;
  values?: FormProps;
  resultValues?: FormProps;
}

const Test = ({
  test,
  required,
  defaultValues,
  options,
  handlerOptions
} : {
  test: TestResult,
  required?: boolean,
  defaultValues?: FormProps,
  options?: UseFormOptions<FormProps>
  handlerOptions?: FormPropsOptions
}) => {

  const {
    values,
    label,
    form, submit,
    reset,
    //input,
    select, selectMultiple,
    textarea,
    checkbox, radio,
    color,
    file,
    date, dateTimeLocal, month, time, week,
    number, range,
    email, password, search, tel, text, url,
    isInvalid, invalid,
    //isChanged, changed,
    //isBlurred, blurred,
  } = useForm<FormProps>({
    defaultValues,
    options
  });

  test.invalid = invalid;
  test.isInvalid = isInvalid;
  test.values = values;

  const [result, setResult] = useState<FormProps>({});

  const onSubmit: SubmitHandler<FormProps> = (v: FormProps) => {
    test.resultValues = v;
    setResult(v);
  };

  return (
    <>
      <form {...form(onSubmit)}>

        <fieldset>
          <legend>text</legend>

          <div>
            <label {...label('email')}>email</label>
            <input data-testid="email" {...email('email', {required, ...handlerOptions?.email})} />
            <span className="output">{values.email} ({typeof values.email}) {JSON.stringify(handlerOptions?.email)}</span>
          </div>

          <div>
            <label {...label('password')}>password</label>
            <input data-testid="password" {...password('password', {required, ...handlerOptions?.password})} />
            <span className="output">{values.password} ({typeof values.password}) {JSON.stringify(handlerOptions?.password)}</span>
          </div>

          <div>
            <label {...label('search')}>search</label>
            <input data-testid="search" {...search('search', {required, ...handlerOptions?.search})} />
            <span className="output">{values.search} ({typeof values.search}) {JSON.stringify(handlerOptions?.search)}</span>
          </div>

          <div>
            <label {...label('tel')}>tel</label>
            <input data-testid="tel" {...tel('tel', {required, ...handlerOptions?.tel})} />
            <span className="output">{values.tel} ({typeof values.tel}) {JSON.stringify(handlerOptions?.tel)}</span>
          </div>

          <div>
            <label {...label('text')}>text</label>
            <input data-testid="text" {...text('text', {required, ...handlerOptions?.text})} />
            <span className="output">{values.text} ({typeof values.text}) {JSON.stringify(handlerOptions?.text)}</span>
          </div>

          <div>
            <label {...label('url')}>url</label>
            <input data-testid="url" {...url('url', {required, ...handlerOptions?.url})} />
            <span className="output">{values.url} ({typeof values.url}) {JSON.stringify(handlerOptions?.url)}</span>
          </div>

        </fieldset>

        <fieldset>
          <legend>datetime</legend>

          <div>
            <label {...label('date')}>date</label>
            <input data-testid="date" {...date('date', {required, ...handlerOptions?.date})} />
            <span className="output">{values.date} ({typeof values.date}) {JSON.stringify(handlerOptions?.date)}</span>
          </div>

          <div>
            <label {...label('dateTimeLocal')}>dateTimeLocal</label>
            <input data-testid="dateTimeLocal" {...dateTimeLocal('dateTimeLocal', {required, ...handlerOptions?.dateTimeLocal})} />
            <span className="output">{values.dateTimeLocal} ({typeof values.dateTimeLocal}) {JSON.stringify(handlerOptions?.dateTimeLocal)}</span>
          </div>

          <div>
            <label {...label('month')}>month</label>
            <input data-testid="month" {...month('month', {required, ...handlerOptions?.month})} />
            <span className="output">{values.month} ({typeof values.month}) {JSON.stringify(handlerOptions?.month)}</span>
          </div>

          <div>
            <label {...label('time')}>time</label>
            <input data-testid="time" {...time('time', {required, ...handlerOptions?.time})} />
            <span className="output">{values.time} ({typeof values.time}) {JSON.stringify(handlerOptions?.time)}</span>
          </div>

          <div>
            <label {...label('week')}>week</label>
            <input data-testid="week" {...week('week', {required, ...handlerOptions?.week})} />
            <span className="output">{values.week} ({typeof values.week}) {JSON.stringify(handlerOptions?.week)}</span>
          </div>

        </fieldset>

        <fieldset>
          <legend>number</legend>

          <div>
            <label {...label('number')}>number</label>
            <input data-testid="number" {...number('number', {required, ...handlerOptions?.number})} />
            <span className="output">{values.number} ({typeof values.number}) {JSON.stringify(handlerOptions?.number)}</span>
          </div>

          <div>
            <label {...label('range')}>range</label>
            <input data-testid="range" {...range('range', {required, ...handlerOptions?.range})} />
            <span className="output">{values.range} ({typeof values.range}) {JSON.stringify(handlerOptions?.range)}</span>
          </div>

        </fieldset>

        <fieldset>
          <legend>checkbox, radio</legend>

          <div>
            <label {...label('checkbox')}>checkbox</label>
            <label>
              <input data-testid="checkbox-c1" {...checkbox('checkbox', {required, ...handlerOptions?.checkbox, value:'C1'})} />
              C1
            </label>
            <label>
              <input data-testid="checkbox-c2" {...checkbox('checkbox')} value="C2"/>
              C2
            </label>
            <label>
              <input data-testid="checkbox-c3" {...checkbox('checkbox', {value: 'C3'})}/>
              C3
            </label>
            <label>
              <input data-testid="checkbox-c4" {...checkbox('checkbox', {value: 'C4'})}/>
              C4
            </label>
            <label>
              <input data-testid="checkbox-c5" {...checkbox('checkbox', {value: 'C5'})}/>
              C5
            </label>
            <span className="output">{values.checkbox} ({typeof values.checkbox}) {JSON.stringify(handlerOptions?.checkbox)}</span>
          </div>

          <div>
            <label {...label('radio')}>radio</label>
            <label>
              <input data-testid="radio-r1" {...radio('radio', {required, ...handlerOptions?.radio, value: 'R1'})} />
              R1
            </label>
            <label>
              <input data-testid="radio-r2" {...radio('radio')} value="R2"/>
              R2
            </label>
            <label>
              <input data-testid="radio-r3" {...radio('radio', {value: 'R3'})} />
              R3
            </label>
            <span className="output">{values.radio} ({typeof values.radio}) {JSON.stringify(handlerOptions?.radio)}</span>
          </div>

        </fieldset>

        <fieldset>
          <legend>select</legend>

          <div>
            <label {...label('select')}>select</label>
            <select data-testid="select" {...select('select', {required, ...handlerOptions?.select})}>
              <option value="">-</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
            <span className="output">{values.select} ({typeof values.select}) {JSON.stringify(handlerOptions?.select)}</span>
          </div>

          <div>
            <label {...label('selectMultiple')}>select multiple</label>
            <select data-testid="select-multiple" {...selectMultiple('selectMultiple', {required, ...handlerOptions?.selectMultiple})}>
              <option value="">-----------</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
              <option value="S4">S4</option>
              <option value="S5">S5</option>
            </select>
            <span className="output">{values.selectMultiple} ({typeof values.selectMultiple}) {JSON.stringify(handlerOptions?.selectMultiple)}</span>
          </div>

        </fieldset>

        <fieldset>
          <legend>textarea</legend>

          <div>
            <label {...label('textarea')} style={{verticalAlign: 'top'}}>textarea</label>
            <textarea data-testid="textarea" {...textarea('textarea', {required, ...handlerOptions?.textarea})}></textarea>
            <span className="output" style={{verticalAlign: 'top'}}>{values.textarea} ({typeof values.textarea}) {JSON.stringify(handlerOptions?.textarea)}</span>
          </div>

        </fieldset>

        <fieldset>
          <legend>special</legend>

          <div>
            <label {...label('color')}>color</label>
            <input data-testid="color" {...color('color', {required, ...handlerOptions?.color})} />
            <span className="output">{values.color} ({typeof values.color}) {JSON.stringify(handlerOptions?.color)}</span>
          </div>

          <div>
            <label {...label('file')}>file</label>
            <input data-testid="file" {...file('file', {required, ...handlerOptions?.file})} />
            <span className="output">{values.file?.length} {JSON.stringify(handlerOptions?.file)}</span>
          </div>

        </fieldset>

        <hr/>
        <button type="submit" disabled={isInvalid?true:undefined}>SUBMIT</button>
        <button type="button" data-testid="submit" onClick={() => submit(onSubmit)}>FORCE SUBMIT</button>
        <button type="button" data-testid="reset-blank" onClick={() => reset({})}>RESET BLANK</button>
        <button type="button" data-testid="reset" onClick={() => reset()}>RESET</button>
        <span className="output">isInvalid: {isInvalid.toString()}</span>
        <hr/>

        <div>
          <div style={{display: 'inline-block', width: '30%', verticalAlign: 'top'}}>
            invalid<br/>
            <pre>
              {JSON.stringify({
                invalid,
              }, null, 2)}
            </pre>
          </div>
          <div style={{display: 'inline-block', width: '30%', verticalAlign: 'top'}}>
            values<br/>
            <pre>
              {JSON.stringify({
                values,
              }, null, 2)}
            </pre>
          </div>
          <div style={{display: 'inline-block', width: '30%', verticalAlign: 'top'}}>
            submit<br/>
            <pre>
              {JSON.stringify({
                result,
              }, null, 2)}
            </pre>
          </div>
        </div>
      </form>
    </>
  );

};

////////////////////////////////////////////////////////////////////////////////

export default Test;
export { FormProps, UseFormOptions, FormPropsOptions, TestResult };
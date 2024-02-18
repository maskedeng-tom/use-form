import { useForm, UseFormParams, EmailHandlerOption, NumberHandlerOption, CheckboxHandlerOption, SelectMultipleHandlerOption } from '../';

interface OptionTestProps {
  email: string,
  number: number,
  checkbox?: string[];
  selectMultiple?: string[];
}

interface OptionsType {
  email: EmailHandlerOption,
  number: NumberHandlerOption,
  checkbox: CheckboxHandlerOption,
  selectMultiple: SelectMultipleHandlerOption,
}

const OptionTest = ({required, defaultValues, options, dataAttributes}: {required?: boolean, defaultValues: OptionTestProps, options: OptionsType, dataAttributes?: UseFormParams<OptionTestProps>['dataAttributes']}) => {

  const f = useForm<OptionTestProps>({
    defaultValues,
    options,
    dataAttributes,
  });

  return (<>
    <form {...f.form()}>

      <fieldset>
        <legend>email</legend>
        <div>
          <label data-testid="email-label" {...f.label('email')}>email</label>
          <input data-testid="email" {...f.email('email', {required})} />
        </div>
      </fieldset>

      <fieldset>
        <legend>number</legend>
        <div>
          <label data-testid="number-label" {...f.label('number')}>number</label>
          <input data-testid="number" {...f.number('number', {required})} />
        </div>
      </fieldset>
      <fieldset>
        <legend>checkbox, radio</legend>
        <div>
          <label data-testid="checkbox-label" {...f.label('checkbox')}>checkbox</label>
          <label>
            <input data-testid="checkbox-c1" {...f.checkbox('checkbox', {required, value:'C1'})} />
              C1
          </label>
          <label>
            <input data-testid="checkbox-c2" {...f.checkbox('checkbox')} value="C2"/>
              C2
          </label>
          <label>
            <input data-testid="checkbox-c3" {...f.checkbox('checkbox', {value: 'C3'})}/>
              C3
          </label>
          <label>
            <input data-testid="checkbox-c4" {...f.checkbox('checkbox', {value: 'C4'})}/>
              C4
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>select</legend>
        <div>
          <label data-testid="select-multiple-label" {...f.label('selectMultiple')}>select multiple</label>
          <select data-testid="select-multiple" {...f.selectMultiple('selectMultiple', {required})}>
            <option value="">-----------</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
            <option value="S4">S4</option>
            <option value="S5">S5</option>
          </select>
        </div>
      </fieldset>

    </form>
  </>);
};

export default OptionTest;
export { OptionTestProps, OptionsType };

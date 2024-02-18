/**
 * @jest-environment jsdom
**/
import { useForm, SubmitHandler } from '../src/useForm';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';

////////////////////////////////////////////////////////////////////////////////

interface Ext<T> {
  createIdForHtml?: (_key: string) => string;
  values?: T;
  resultValues?: T;
  labelRef?: React.RefObject<HTMLLabelElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const initialTest = async <T,>(
  ext: Ext<T>,
  key: string,
  initialValue: string | number,
  invalidValues?: string,
)=>{
  const idText = ext.createIdForHtml?.(key);

  // label
  const label = (await screen.findAllByTestId('test-label'))[0];
  expect(label).toHaveAttribute('for', idText);
  // input
  const input = (await screen.findAllByTestId('test-input'))[0];
  expect(input).toHaveAttribute('id', idText);
  expect(input).toHaveAttribute('name', key);
  // submit
  const submit = (await screen.findAllByTestId('test-submit'))[0];

  // ref
  expect(ext.labelRef?.current).toBe(label);
  expect(ext.inputRef?.current).toBe(input);

  // value
  expect(input).toHaveValue(initialValue);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  expect((ext?.values as any)?.[key]).toBe(initialValue);
  await userEvent.click(submit);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  expect((ext?.resultValues as any)?.[key]).toBe(initialValue);
  // data-is-invalid
  if(invalidValues === undefined){
    expect(input).not.toHaveAttribute('data-is-invalid');
    expect(label).not.toHaveAttribute('data-is-invalid');
  }else{
    expect(input).toHaveAttribute('data-is-invalid', invalidValues);
    expect(label).toHaveAttribute('data-is-invalid', invalidValues);
  }
};

const inputTest = async <T,>(
  ext: Ext<T>,
  key: string,
  inputValue: string | number,
  invalidValues?: string,
) => {
  //
  const label = (await screen.findAllByTestId('test-label'))[0];
  const input = (await screen.findAllByTestId('test-input'))[0];
  const submit = (await screen.findAllByTestId('test-submit'))[0];
  //
  input.focus();
  expect(input).toHaveFocus();
  await userEvent.clear(input);
  await userEvent.keyboard((inputValue !== undefined)?String(inputValue):'');
  // value
  expect(input).toHaveValue(inputValue);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  expect((ext?.values as any)?.[key]).toBe(inputValue);
  // submit
  await userEvent.click(submit);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  expect((ext?.resultValues as any)?.[key]).toBe(inputValue);
  // data-is-invalid
  if(invalidValues === undefined){
    expect(input).not.toHaveAttribute('data-is-invalid');
    expect(label).not.toHaveAttribute('data-is-invalid');
  }else{
    expect(input).toHaveAttribute('data-is-invalid', invalidValues);
    expect(label).toHaveAttribute('data-is-invalid', invalidValues);
  }
  //
};

////////////////////////////////////////////////////////////////////////////////

describe('useForm handler', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      inputRef?: React.RefObject<HTMLInputElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, handler } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...handler('v', {
              ref: ext.inputRef,
              required: true,
              disabled: false,
              readonly: false,
              pattern: /\w{3,16}/,
              validate: (_v: string) => { return true; },
              maxLength: 10,
              minLength: 5,
              max: 100,
              min: 0,
              step: 2,
              maxChecked: 10,
              minChecked: 5,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    // mount
    const { unmount } = render(<App/>);
    const idText = ext.createIdForHtml?.('v');

    // label
    const label = (await screen.findAllByTestId('test-label'))[0];
    expect(label).toHaveAttribute('for', idText);
    // input
    const input = (await screen.findAllByTestId('test-input'))[0];
    expect(input).toHaveAttribute('id', idText);
    expect(input).toHaveAttribute('name', 'v');
    // submit
    const submit = (await screen.findAllByTestId('test-submit'))[0];

    // ref
    expect(ext.labelRef?.current).toBe(label);
    expect(ext.inputRef?.current).toBe(input);

    // value
    expect(input).toHaveValue('');
    expect(ext.values?.v).toBe('');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toBe('');

    // change
    input.focus();
    expect(input).toHaveFocus();
    await userEvent.clear(input);
    await userEvent.keyboard('Hello');
    // value
    expect(input).toHaveValue('Hello');
    expect(ext.values?.v).toBe('Hello');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toBe('Hello');

    // change
    input.focus();
    expect(input).toHaveFocus();
    await userEvent.clear(input);
    await userEvent.keyboard('World');
    // value
    expect(input).toHaveValue('World');
    expect(ext.values?.v).toBe('World');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toBe('World');

    //
    //screen.debug();
    unmount();

  });

});

////////////////////////////////////////////////////////////////////////////////

// button

describe('useForm checkbox', () => {

  test('basic', async () => {

    interface FormData {
      v: string[];
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      inputRef?: React.RefObject<HTMLInputElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, checkbox } = useForm<FormData>({
        defaultValues: {
          v: [],
        },
        options: {
          v: {
            required: true,
            maxChecked: 1,
            minChecked: 1,
          }
        }
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            CheckBox:
          </label>
          <label>
            <input data-testid="test-input-1" {...checkbox('v')} value="C1"/>
            C1
          </label>
          <label>
            <input data-testid="test-input-2" {...checkbox('v', {value: 'C2'})}/>
            C2
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    // mount
    const { unmount } = render(<App/>);

    // label
    const label = (await screen.findAllByTestId('test-label'))[0];
    // input-1
    const input1 = (await screen.findAllByTestId('test-input-1'))[0];
    expect(input1).toHaveAttribute('value', 'C1');
    // input-2
    const input2 = (await screen.findAllByTestId('test-input-2'))[0];
    expect(input2).toHaveAttribute('value', 'C2');
    // submit
    const submit = (await screen.findAllByTestId('test-submit'))[0];
    // ref
    expect(ext.labelRef?.current).toBe(label);

    // value
    expect(ext.values?.v).toEqual([]);
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual([]);
    // data-is-invalid
    expect(label).toHaveAttribute('data-is-invalid', 'value-missing');

    // change
    await userEvent.click(input2);
    // value
    expect(ext.values?.v).toEqual(['C2']);
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual(['C2']);
    // data-is-invalid
    expect(label).not.toHaveAttribute('data-is-invalid');

    // change
    await userEvent.click(input1);
    // value
    expect(ext.values?.v).toEqual(['C1', 'C2']);
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual(['C1', 'C2']);
    // data-is-invalid
    expect(label).toHaveAttribute('data-is-invalid', 'checked-overflow');

    //
    //screen.debug();
    unmount();

  });
});

describe('useForm color', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: Ext<FormData> = {};

    const App = () => {

      const { values, createIdForHtml, form, label, color } = useForm<FormData>({
        defaultValues: {
          v: '#ff0000',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...color('v', {
              ref: ext.inputRef,
              required: true,
              disabled: false,
              readonly: false,
              //validate: (_v: string) => { return true; },
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    // mount
    const { unmount } = render(<App/>);
    const idText = ext.createIdForHtml?.('v');

    // label
    const label = (await screen.findAllByTestId('test-label'))[0];
    expect(label).toHaveAttribute('for', idText);
    // input
    const input = (await screen.findAllByTestId('test-input'))[0];
    expect(input).toHaveAttribute('id', idText);
    expect(input).toHaveAttribute('name', 'v');
    // submit
    const submit = (await screen.findAllByTestId('test-submit'))[0];

    // ref
    expect(ext.labelRef?.current).toBe(label);
    expect(ext.inputRef?.current).toBe(input);

    // value
    expect(input).toHaveValue('#ff0000');
    expect(ext.values?.v).toBe('#ff0000');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toBe('#ff0000');

    fireEvent.input(input, {target: {value: '#333333'}});
    expect(ext.values?.v).toBe('#333333');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toBe('#333333');

    //screen.debug();
    unmount();

  });

  test('default undefined', async () => {

    interface FormData {
      v?: string;
    }

    const ext: Ext<FormData> = {};

    const App = () => {

      const { values, createIdForHtml, form, label, color } = useForm<FormData>({
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...color('v', {
              ref: ext.inputRef,
              required: true,
              disabled: false,
              readonly: false,
              //validate: (_v: string) => { return true; },
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    // mount
    const { unmount } = render(<App/>);
    const idText = ext.createIdForHtml?.('v');

    // label
    const label = (await screen.findAllByTestId('test-label'))[0];
    expect(label).toHaveAttribute('for', idText);
    // input
    const input = (await screen.findAllByTestId('test-input'))[0];
    expect(input).toHaveAttribute('id', idText);
    expect(input).toHaveAttribute('name', 'v');
    // submit
    const submit = (await screen.findAllByTestId('test-submit'))[0];

    // ref
    expect(ext.labelRef?.current).toBe(label);
    expect(ext.inputRef?.current).toBe(input);

    // value
    expect(input).toHaveValue('#000000');
    expect(ext.values?.v).toBe(undefined);
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toBe(undefined);

    //screen.debug();
    unmount();

  });
});

describe('useForm date', () => {

  //////////////////////////////////////////////////////////////////////////////

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: Ext<FormData> = {};

    const App = () => {

      const { values, createIdForHtml, form, label, date } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...date('v', {
              ref: ext.inputRef,
              required: true,
              min: '2000-01-01',
              max: '2025-01-01',
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', '', 'value-missing');
    await inputTest(ext, 'v', '1999-01-01', 'range-underflow');
    await inputTest(ext, 'v', '2021-11-22', undefined);
    await inputTest(ext, 'v', '2028-01-01', 'range-overflow');
    //
    unmount();

  });
});

describe('useForm datetime-local', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: Ext<FormData> = {};

    const App = () => {

      const { values, createIdForHtml, form, label, dateTimeLocal } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...dateTimeLocal('v', {
              ref: ext.inputRef,
              required: true,
              min: '2000-01-01T11:22:00',
              max: '2025-01-01T22:33:00',
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', '', 'value-missing');
    await inputTest(ext, 'v', '1999-11-22T11:22', 'range-underflow');
    await inputTest(ext, 'v', '2021-11-22T11:22', undefined);
    await inputTest(ext, 'v', '2021-11-22T11:22:44.000', 'step-mismatch');
    await inputTest(ext, 'v', '2030-11-22T11:22', 'range-overflow');
    //
    unmount();
  });

});

describe('useForm email', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      inputRef?: React.RefObject<HTMLInputElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, email } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...email('v', {
              ref: ext.inputRef,
              required: true,
              pattern: /^([\w!#$%&'*+\-/=?^`{|}~]+(\.[\w!#$%&'*+\-/=?^`{|}~]+)*|"([\w!#$%&'*+\-/=?^`{|}~. ()<>[\]:;@,]|\\[\\"])+")@(([a-zA-Z\d-]+\.)+[a-zA-Z]+|\[(\d{1,3}(\.\d{1,3}){3}|IPv6:[\da-fA-F]{0,4}(:[\da-fA-F]{0,4}){1,5}(:\d{1,3}(\.\d{1,3}){3}|(:[\da-fA-F]{0,4}){0,2}))\])$/,
              //pattern: /^[-a-z0-9~!$%^&*_=+}{\\'?]+(\.[-a-z0-9~!$%^&*_=+}{\\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
              maxLength: 20,
              minLength: 10,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', '', 'value-missing');
    await inputTest(ext, 'v', 't@me.com', 'too-short');
    await inputTest(ext, 'v', 'test@test.com', undefined);
    await inputTest(ext, 'v', 'test@test.sample.com', undefined);
    //await inputTest(ext, 'v', 'test@test.sample2.com', 'too-long');
    //
    unmount();
  });

});

describe('useForm file', () => {

  test('basic', async () => {

    interface FormData {
      v?: FileList;
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      inputRef?: React.RefObject<HTMLInputElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, file } = useForm<FormData>({
        defaultValues: {
          //v: [],
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...file('v', {
              ref: ext.inputRef,
              required: true,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    // label
    const label = (await screen.findAllByTestId('test-label'))[0];
    // input-1
    const input = (await screen.findAllByTestId('test-input'))[0];
    // submit
    const submit = (await screen.findAllByTestId('test-submit'))[0];

    //
    expect(ext.labelRef?.current).toBe(label);
    expect(ext.inputRef?.current).toBe(input);
    //
    expect(label).toHaveAttribute('data-is-invalid', 'value-missing');
    expect(input).toHaveAttribute('data-is-invalid', 'value-missing');

    await userEvent.click(input);
    expect(input).toHaveFocus();
    await userEvent.upload(input, new File(['(⌐□_□)'], 'test.txt', { type: 'text/plain' }));
    //
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual(expect.any(FileList));
    expect((ext.resultValues?.v as FileList).length).toBe(1);
    //
    unmount();
  });

});

// hidden

// image

describe('useForm month', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      inputRef?: React.RefObject<HTMLInputElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, month } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...month('v', {
              ref: ext.inputRef,
              required: true,
              min: '2020-01',
              max: '2025-01',
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', '', 'value-missing');
    await inputTest(ext, 'v', '1999-01', 'range-underflow');
    await inputTest(ext, 'v', '2019-12', 'range-underflow');
    await inputTest(ext, 'v', '2020-01', undefined);
    await inputTest(ext, 'v', '2025-01', undefined);
    await inputTest(ext, 'v', '2025-02', 'range-overflow');
    //
    unmount();
  });

});

describe('useForm number', () => {

  test('basic', async () => {

    interface FormData {
      v: number;
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      inputRef?: React.RefObject<HTMLInputElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, number } = useForm<FormData>({
        defaultValues: {
          v: 0,
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...number('v', {
              ref: ext.inputRef,
              required: true,
              min: 2,
              max: 10,
              step: 2,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', 0, 'range-underflow');
    await inputTest(ext, 'v', 1, 'range-underflow');
    await inputTest(ext, 'v', 2, undefined);
    await inputTest(ext, 'v', 3, 'step-mismatch');
    await inputTest(ext, 'v', 10, undefined);
    await inputTest(ext, 'v', 11, 'range-overflow');
    //
    unmount();
  });

  test('default undefined', async () => {

    interface FormData {
      v?: number;
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      inputRef?: React.RefObject<HTMLInputElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, number } = useForm<FormData>({
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...number('v', {
              ref: ext.inputRef,
              required: true,
              min: 2,
              max: 10,
              step: 2,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);

    // label
    const label = (await screen.findAllByTestId('test-label'))[0];
    const input = (await screen.findAllByTestId('test-input'))[0];
    const submit = (await screen.findAllByTestId('test-submit'))[0];

    // ref
    expect(ext.labelRef?.current).toBe(label);
    expect(ext.inputRef?.current).toBe(input);

    // value
    expect(input).toHaveValue(null);
    expect(ext.values?.v).toBe(undefined);
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toBe(undefined);
    //
    input.focus();
    expect(input).toHaveFocus();
    await userEvent.clear(input);
    await userEvent.keyboard('2');
    //
    expect(input).toHaveValue(2);
    expect(ext.values?.v).toBe(2);
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toBe(2);
    //
    unmount();
  });

});

describe('useForm password', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      inputRef?: React.RefObject<HTMLInputElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, password } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...password('v', {
              ref: ext.inputRef,
              required: true,
              maxLength: 20,
              minLength: 10,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', '', 'value-missing');
    await inputTest(ext, 'v', 't^me.com', 'too-short');
    await inputTest(ext, 'v', 'test^test.com', undefined);
    await inputTest(ext, 'v', 'test^test.sample.com', undefined);
    //await inputTest(ext, 'v', 'test@test.sample2.com', 'too-long');
    //
    unmount();
  });

});

describe('useForm radio', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      inputRef?: React.RefObject<HTMLInputElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, radio } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
        options: {
          v: {
            required: true,
          }
        }
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            Radio:
          </label>
          <label>
            <input data-testid="test-input-1" {...radio('v')} value="R1"/>
            R1
          </label>
          <label>
            <input data-testid="test-input-2" {...radio('v', {value: 'R2'})}/>
            R2
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    // mount
    const { unmount } = render(<App/>);

    // label
    const label = (await screen.findAllByTestId('test-label'))[0];
    // input-1
    const input1 = (await screen.findAllByTestId('test-input-1'))[0];
    expect(input1).toHaveAttribute('value', 'R1');
    // input-2
    const input2 = (await screen.findAllByTestId('test-input-2'))[0];
    expect(input2).toHaveAttribute('value', 'R2');
    // submit
    const submit = (await screen.findAllByTestId('test-submit'))[0];
    // ref
    expect(ext.labelRef?.current).toBe(label);

    // value
    expect(ext.values?.v).toEqual('');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual('');
    // data-is-invalid
    expect(label).toHaveAttribute('data-is-invalid', 'value-missing');

    // change
    await userEvent.click(input2);
    // value
    expect(ext.values?.v).toEqual('R2');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual('R2');
    // data-is-invalid
    expect(label).not.toHaveAttribute('data-is-invalid');

    // change
    await userEvent.click(input1);
    // value
    expect(ext.values?.v).toEqual('R1');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual('R1');
    // data-is-invalid
    expect(label).not.toHaveAttribute('data-is-invalid');

    //
    //screen.debug();
    unmount();

  });
});

describe('useForm range', () => {

  test('basic', async () => {

    interface FormData {
      v: number;
    }

    const ext: Ext<FormData> = {};

    const App = () => {

      const { values, createIdForHtml, form, label, range } = useForm<FormData>({
        defaultValues: {
          v: 2,
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...range('v', {
              ref: ext.inputRef,
              required: true,
              min: 2,
              max: 10,
              step: 2,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    // label
    const label = (await screen.findAllByTestId('test-label'))[0];
    // input-1
    const input = (await screen.findAllByTestId('test-input'))[0];
    // submit
    const submit = (await screen.findAllByTestId('test-submit'))[0];
    // ref
    expect(ext.labelRef?.current).toBe(label);
    expect(ext.inputRef?.current).toBe(input);
    expect(input).toHaveValue('2');

    fireEvent.change(input, { target: { value: 5 } });
    expect(input).toHaveValue('5');
    //
    expect(ext.values?.v).toBe(5);
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toBe(5);
    // data-is-invalid
    expect(label).toHaveAttribute('data-is-invalid', 'step-mismatch');
    expect(input).toHaveAttribute('data-is-invalid', 'step-mismatch');

    fireEvent.change(input, { target: { value: 6 } });
    expect(input).toHaveValue('6');
    //
    expect(ext.values?.v).toBe(6);
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toBe(6);
    // data-is-invalid
    expect(label).not.toHaveAttribute('data-is-invalid');
    expect(input).not.toHaveAttribute('data-is-invalid');

    //
    unmount();
  });

});

// reset

describe('useForm search', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      inputRef?: React.RefObject<HTMLInputElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, search } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...search('v', {
              ref: ext.inputRef,
              required: true,
              maxLength: 20,
              minLength: 10,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', '', 'value-missing');
    await inputTest(ext, 'v', 't^me.com', 'too-short');
    await inputTest(ext, 'v', 'test^test.com', undefined);
    await inputTest(ext, 'v', 'test^test.sample.com', undefined);
    //await inputTest(ext, 'v', 'test@test.sample2.com', 'too-long');
    //
    unmount();
  });

});

// submit

describe('useForm tel', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: Ext<FormData> = {};

    const App = () => {

      const { values, createIdForHtml, form, label, tel } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...tel('v', {
              ref: ext.inputRef,
              required: true,
              maxLength: 20,
              minLength: 10,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', '', 'value-missing');
    await inputTest(ext, 'v', 't^me.com', 'too-short');
    await inputTest(ext, 'v', 'test^test.com', undefined);
    await inputTest(ext, 'v', 'test^test.sample.com', undefined);
    //await inputTest(ext, 'v', 'test@test.sample2.com', 'too-long');
    //
    unmount();
  });

});

describe('useForm text', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: Ext<FormData> = {};

    const App = () => {

      const { values, createIdForHtml, form, label, text } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...text('v', {
              ref: ext.inputRef,
              required: true,
              maxLength: 20,
              minLength: 10,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', '', 'value-missing');
    await inputTest(ext, 'v', 't^me.com', 'too-short');
    await inputTest(ext, 'v', 'test^test.com', undefined);
    await inputTest(ext, 'v', 'test^test.sample.com', undefined);
    //await inputTest(ext, 'v', 'test@test.sample2.com', 'too-long');
    //
    unmount();
  });

  test('default undefined', async () => {

    interface FormData {
      v?: string;
    }

    const ext: Ext<FormData> = {};

    const App = () => {

      const { values, createIdForHtml, form, label, text } = useForm<FormData>({
        defaultValues: {
          //v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...text('v', {
              ref: ext.inputRef,
              required: true,
              maxLength: 20,
              minLength: 10,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);

    // label
    const label = (await screen.findAllByTestId('test-label'))[0];
    const input = (await screen.findAllByTestId('test-input'))[0];
    const submit = (await screen.findAllByTestId('test-submit'))[0];

    // ref
    expect(ext.labelRef?.current).toBe(label);
    expect(ext.inputRef?.current).toBe(input);

    // value
    expect(input).toHaveValue('');
    expect(ext.values?.v).toBe(undefined);
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toBe(undefined);
    //
    input.focus();
    expect(input).toHaveFocus();
    await userEvent.clear(input);
    await userEvent.keyboard('a');
    //
    expect(input).toHaveValue('a');
    expect(ext.values?.v).toBe('a');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toBe('a');

    unmount();
  });

});

describe('useForm time', () => {

  //////////////////////////////////////////////////////////////////////////////

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: Ext<FormData> = {};

    const App = () => {

      const { values, createIdForHtml, form, label, time } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...time('v', {
              ref: ext.inputRef,
              required: true,
              min: '08:00',
              max: '18:00',
              step: 60 * 60,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', '', 'value-missing');
    await inputTest(ext, 'v', '02:00', 'range-underflow');
    await inputTest(ext, 'v', '10:00', undefined);
    await inputTest(ext, 'v', '10:10', 'step-mismatch');
    await inputTest(ext, 'v', '20:00', 'range-overflow');
    //
    unmount();

  });
});

describe('useForm url', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      inputRef?: React.RefObject<HTMLInputElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, url } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...url('v', {
              ref: ext.inputRef,
              required: true,
              maxLength: 20,
              minLength: 10,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', '', 'value-missing');
    await inputTest(ext, 'v', 't^me.com', 'type-mismatch');
    await inputTest(ext, 'v', 'http://localhost', undefined);
    await inputTest(ext, 'v', 'http://localhost.com', undefined);
    //
    unmount();
  });

});

describe('useForm week', () => {

  //////////////////////////////////////////////////////////////////////////////

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: Ext<FormData> = {};

    const App = () => {

      const { values, createIdForHtml, form, label, week } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <input data-testid="test-input" {...week('v', {
              ref: ext.inputRef,
              required: true,
              min: '2020-W00',
              max: '2026-W00',
              //step: 60 * 60,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', '', 'value-missing');
    //await inputTest(ext, 'v', '2019-W00', 'range-underflow');
    await inputTest(ext, 'v', '2024-W08', undefined);
    //await inputTest(ext, 'v', '10:10', 'step-mismatch');
    //await inputTest(ext, 'v', '20:00', 'range-overflow');
    //
    unmount();

  });
});

describe('useForm textarea', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: Ext<FormData> = {};

    const App = () => {

      const { values, createIdForHtml, form, label, textarea } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.inputRef = useRef<HTMLInputElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            <textarea data-testid="test-input" {...textarea('v', {
              ref: ext.inputRef,
              required: true,
              maxLength: 20,
              minLength: 10,
            })}/>
          </label>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    //
    const { unmount } = render(<App/>);
    //
    await initialTest(ext, 'v', '', 'value-missing');
    await inputTest(ext, 'v', 't^me.com', 'too-short');
    await inputTest(ext, 'v', 'test^test.com', undefined);
    await inputTest(ext, 'v', 'test^test.sample.com', undefined);
    //await inputTest(ext, 'v', 'test@test.sample2.com', 'too-long');
    //
    unmount();
  });

});

describe('useForm select', () => {

  test('basic', async () => {

    interface FormData {
      v: string;
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      selectRef?: React.RefObject<HTMLSelectElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, select } = useForm<FormData>({
        defaultValues: {
          v: '',
        },
        options: {
          v: {
            required: true,
          }
        }
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.selectRef = useRef<HTMLSelectElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            Select:
          </label>
          <select data-testid="test-select" {...select('v', {ref: ext.selectRef})}>
            <option value="">-- Select --</option>
            <option data-testid="test-input-1" value="S1">S1</option>
            <option data-testid="test-input-2" value="S2">S2</option>
          </select>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    // mount
    const { unmount } = render(<App/>);

    // select
    const select = (await screen.findAllByTestId('test-select'))[0] as HTMLSelectElement;
    // label
    const label = (await screen.findAllByTestId('test-label'))[0];
    // input-1
    const input1 = (await screen.findAllByTestId('test-input-1'))[0];
    expect(input1).toHaveAttribute('value', 'S1');
    // input-2
    const input2 = (await screen.findAllByTestId('test-input-2'))[0];
    expect(input2).toHaveAttribute('value', 'S2');
    // submit
    const submit = (await screen.findAllByTestId('test-submit'))[0];
    // ref
    expect(ext.labelRef?.current).toBe(label);
    expect(ext.selectRef?.current).toBe(select);

    // value
    expect(ext.values?.v).toEqual('');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual('');
    // data-is-invalid
    expect(label).toHaveAttribute('data-is-invalid', 'value-missing');

    //
    await userEvent.click(select);
    await userEvent.selectOptions(select, ['S2']);
    // value
    expect(ext.values?.v).toEqual('S2');
    expect(select).not.toHaveAttribute('data-is-invalid');
    expect(label).not.toHaveAttribute('data-is-invalid');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual('S2');

    await userEvent.click(select);
    await userEvent.selectOptions(select, 'S1');
    // value
    expect(ext.values?.v).toEqual('S1');
    expect(select).not.toHaveAttribute('data-is-invalid');
    expect(label).not.toHaveAttribute('data-is-invalid');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual('S1');

    //screen.debug();
    unmount();

  });
});

describe('useForm select multi', () => {

  test('basic', async () => {

    interface FormData {
      v: string[];
    }

    const ext: {
      createIdForHtml?: (_key: string) => string;
      values?: FormData;
      resultValues?: FormData;
      labelRef?: React.RefObject<HTMLLabelElement>;
      selectRef?: React.RefObject<HTMLSelectElement>;
    } = {};

    const App = () => {

      const { values, createIdForHtml, form, label, selectMultiple } = useForm<FormData>({
        defaultValues: {
          v: [],
        },
        options: {
          v: {
            required: true,
          }
        }
      });
      ext.values = values;
      ext.createIdForHtml = createIdForHtml;

      const onSubmit: SubmitHandler<FormData> = (values) => {
        ext.resultValues = values;
      };

      ext.labelRef = useRef<HTMLLabelElement>(null);
      ext.selectRef = useRef<HTMLSelectElement>(null);

      return (
        <form {...form(onSubmit)}>
          <label data-testid="test-label" {...label('v', {ref: ext.labelRef})}>
            Select:
          </label>
          <select data-testid="test-select" {...selectMultiple('v', {ref: ext.selectRef})}>
            <option value="">-- Select --</option>
            <option data-testid="test-input-1" value="S1">S1</option>
            <option data-testid="test-input-2" value="S2">S2</option>
          </select>
          <button data-testid="test-submit" type="submit">Submit</button>
        </form>
      );
    };

    // mount
    const { unmount } = render(<App/>);

    // select
    const select = (await screen.findAllByTestId('test-select'))[0] as HTMLSelectElement;
    // label
    const label = (await screen.findAllByTestId('test-label'))[0];
    // input-1
    const input1 = (await screen.findAllByTestId('test-input-1'))[0];
    expect(input1).toHaveAttribute('value', 'S1');
    // input-2
    const input2 = (await screen.findAllByTestId('test-input-2'))[0];
    expect(input2).toHaveAttribute('value', 'S2');
    // submit
    const submit = (await screen.findAllByTestId('test-submit'))[0];
    // ref
    expect(ext.labelRef?.current).toBe(label);
    expect(ext.selectRef?.current).toBe(select);

    // value
    expect(ext.values?.v).toEqual([]);
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual([]);
    // data-is-invalid
    expect(label).toHaveAttribute('data-is-invalid', 'value-missing');

    //
    await userEvent.click(select);
    await userEvent.selectOptions(select, ['S2']);
    // value
    expect(ext.values?.v).toEqual(['S2']);
    expect(select).not.toHaveAttribute('data-is-invalid');
    expect(label).not.toHaveAttribute('data-is-invalid');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual(['S2']);

    await userEvent.click(select);
    await userEvent.selectOptions(select, ['S1']);
    // value
    expect(ext.values?.v).toEqual(['S1','S2']);
    expect(select).not.toHaveAttribute('data-is-invalid');
    expect(label).not.toHaveAttribute('data-is-invalid');
    await userEvent.click(submit);
    expect(ext.resultValues?.v).toEqual(['S1','S2']);

    //screen.debug();
    unmount();

  });
});

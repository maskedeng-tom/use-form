/**
 * @jest-environment jsdom
**/
import { useForm, UseFormParams, SubmitHandler } from '../src/useForm';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useState, useRef, useMemo } from 'react';

describe('useForm basic', () => {

  test('required', async () => {

    interface FormData {
      text: string;
    }

    let createIdForHtmlFunc = (_key: string) => '';
    let formValues: FormData = { text: '' };
    //
    const App = () => {

      const def: UseFormParams<FormData> = useMemo(() => {
        return {
          defaultValues: {
            text: 'Hello',
          },
          options: {
            text: {
              required: true,
            }
          }
        };
      } , []);
      const { values, createIdForHtml, input, label } = useForm<FormData>(def);

      createIdForHtmlFunc = createIdForHtml;
      formValues = values;
      return (
        <form>
          <label data-testid="test-label" {...label('text')}>
            <input data-testid="test-input" {...input('text')}/>
          </label>
        </form>
      );
    };

    const { unmount } = render(<App/>);
    const idText = createIdForHtmlFunc('text');

    // label
    const testLabel = await screen.findAllByTestId('test-label');
    expect(testLabel.length).toBe(1);
    const label = testLabel[0];
    // for
    expect(label).toHaveAttribute('for', idText);
    // data-required
    expect(label).toHaveAttribute('data-required', '');

    // input
    const testInput = await screen.findAllByTestId('test-input');
    expect(testInput.length).toBe(1);
    const input = testInput[0];
    // id
    expect(input).toHaveAttribute('id', idText);
    // name
    expect(input).toHaveAttribute('name', 'text');
    // required
    expect(input).toHaveAttribute('required', '');
    expect(input).toHaveAttribute('data-required', '');
    // value
    expect(input).toHaveValue('Hello');

    // change to '' => value-missing
    input.focus();
    expect(input).toHaveFocus();
    //
    await userEvent.clear(input);
    await waitFor(() => {
      expect(input).toHaveAttribute('data-is-changed', '');
      expect(label).toHaveAttribute('data-is-changed', '');
      expect(input).toHaveAttribute('data-is-invalid', 'value-missing');
      expect(label).toHaveAttribute('data-is-invalid', 'value-missing');
      expect(input).toHaveValue('');
    });
    expect(formValues.text).toBe('');

    // change to World
    input.focus();
    expect(input).toHaveFocus();
    //
    await userEvent.clear(input);
    await userEvent.keyboard('World');
    await waitFor(() => {
      expect(input).toHaveAttribute('data-is-changed', '');
      expect(label).toHaveAttribute('data-is-changed', '');
      expect(input).not.toHaveAttribute('data-is-invalid');
      expect(label).not.toHaveAttribute('data-is-invalid');
      expect(input).toHaveValue('World');
    });
    expect(formValues.text).toBe('World');

    //
    //screen.debug();
    unmount();

  });

  test('pattern', async () => {

    interface FormData {
      text: string;
    }

    let createIdForHtmlFunc = (_key: string) => '';
    let formValues: FormData = { text: '' };
    //
    const App = () => {
      const { values, createIdForHtml, input, label } = useForm<FormData>({
        defaultValues: {
          text: 'Hello',
        },
        options: {
          text: {
            pattern: /^[a-zA-Z]+$/,
          }
        }
      });
      createIdForHtmlFunc = createIdForHtml;
      formValues = values;
      return (
        <form>
          <label data-testid="test-label" {...label('text')}>
            <input data-testid="test-input" {...input('text')}/>
          </label>
        </form>
      );
    };

    const { unmount } = render(<App/>);
    const idText = createIdForHtmlFunc('text');

    // label
    const testLabel = await screen.findAllByTestId('test-label');
    expect(testLabel.length).toBe(1);
    const label = testLabel[0];
    // for
    expect(label).toHaveAttribute('for', idText);

    // input
    const testInput = await screen.findAllByTestId('test-input');
    expect(testInput.length).toBe(1);
    const input = testInput[0];
    // id
    expect(input).toHaveAttribute('id', idText);
    // name
    expect(input).toHaveAttribute('name', 'text');
    // pattern
    expect(input).toHaveAttribute('pattern', '^[a-zA-Z]+$');
    // value
    expect(input).toHaveValue('Hello');

    // change to '' => pattern-mismatch
    input.focus();
    expect(input).toHaveFocus();
    //
    await userEvent.clear(input);
    await userEvent.keyboard(' {Backspace}');
    await waitFor(() => {
      expect(input).toHaveAttribute('data-is-changed', '');
      expect(label).toHaveAttribute('data-is-changed', '');
      expect(input).not.toHaveAttribute('data-is-invalid');
      expect(label).not.toHaveAttribute('data-is-invalid');
      expect(input).toHaveValue('');
    });
    expect(formValues.text).toBe('');

    // change to World
    input.focus();
    expect(input).toHaveFocus();
    //
    await userEvent.clear(input);
    await userEvent.keyboard('World');
    await waitFor(() => {
      expect(input).toHaveAttribute('data-is-changed', '');
      expect(label).toHaveAttribute('data-is-changed', '');
      expect(input).not.toHaveAttribute('data-is-invalid');
      expect(label).not.toHaveAttribute('data-is-invalid');
      expect(input).toHaveValue('World');
    });
    expect(formValues.text).toBe('World');

    // change to x-World => pattern-mismatch
    input.focus();
    expect(input).toHaveFocus();
    //
    await userEvent.clear(input);
    await userEvent.keyboard('-World-');
    await waitFor(() => {
      expect(input).toHaveAttribute('data-is-changed', '');
      expect(label).toHaveAttribute('data-is-changed', '');
      expect(input).toHaveAttribute('data-is-invalid', 'pattern-mismatch');
      expect(label).toHaveAttribute('data-is-invalid', 'pattern-mismatch');
      expect(input).toHaveValue('-World-');
    });
    expect(formValues.text).toBe('-World-');

    //
    //screen.debug();
    unmount();

  });

  test('validate', async () => {

    interface FormData {
      text: string;
    }

    let createIdForHtmlFunc = (_key: string) => '';
    let formValues: FormData = { text: '' };
    //
    const App = () => {
      const { values, createIdForHtml, input, label } = useForm<FormData>({
        defaultValues: {
          text: 'Hello',
        },
        options: {
          text: {
            validate: (s: string) => {
              if (s.indexOf('x') >= 0) {
                return 'x-contained';
              }
              if (s.indexOf('X') >= 0) {
                // upper case X
                return false; // validate-function-error
              }
              return true;
            },
          }
        }
      });
      createIdForHtmlFunc = createIdForHtml;
      formValues = values;
      return (
        <form>
          <label data-testid="test-label" {...label('text')}>
            <input data-testid="test-input" {...input('text')}/>
          </label>
        </form>
      );
    };

    const { unmount } = render(<App/>);
    const idText = createIdForHtmlFunc('text');

    // label
    const testLabel = await screen.findAllByTestId('test-label');
    expect(testLabel.length).toBe(1);
    const label = testLabel[0];
    // for
    expect(label).toHaveAttribute('for', idText);

    // input
    const testInput = await screen.findAllByTestId('test-input');
    expect(testInput.length).toBe(1);
    const input = testInput[0];
    // id
    expect(input).toHaveAttribute('id', idText);
    // name
    expect(input).toHaveAttribute('name', 'text');
    // value
    expect(input).toHaveValue('Hello');

    // change to '' => pattern-mismatch
    input.focus();
    expect(input).toHaveFocus();
    //
    await userEvent.clear(input);
    await userEvent.keyboard('A');
    await userEvent.keyboard('{Backspace}');
    await waitFor(() => {
      expect(input).toHaveAttribute('data-is-changed', '');
      expect(label).toHaveAttribute('data-is-changed', '');
      expect(input).not.toHaveAttribute('data-is-invalid');
      expect(label).not.toHaveAttribute('data-is-invalid');
      expect(input).toHaveValue('');
    });
    expect(formValues.text).toBe('');

    // change to World
    input.focus();
    expect(input).toHaveFocus();
    //
    await userEvent.clear(input);
    await userEvent.keyboard('World');
    await waitFor(() => {
      expect(input).toHaveAttribute('data-is-changed', '');
      expect(label).toHaveAttribute('data-is-changed', '');
      expect(input).not.toHaveAttribute('data-is-invalid');
      expect(label).not.toHaveAttribute('data-is-invalid');
      expect(input).toHaveValue('World');
    });
    expect(formValues.text).toBe('World');

    // change to x-World => x-contained
    input.focus();
    expect(input).toHaveFocus();
    //
    await userEvent.clear(input);
    await userEvent.keyboard('x-World');
    await waitFor(() => {
      expect(input).toHaveAttribute('data-is-changed', '');
      expect(label).toHaveAttribute('data-is-changed', '');
      expect(input).toHaveAttribute('data-is-invalid', 'x-contained');
      expect(label).toHaveAttribute('data-is-invalid', 'x-contained');
      expect(input).toHaveValue('x-World');
    });
    expect(formValues.text).toBe('x-World');

    // change to X-World => validate-function-error
    input.focus();
    expect(input).toHaveFocus();
    //
    await userEvent.clear(input);
    await userEvent.keyboard('X-World');
    await waitFor(() => {
      expect(input).toHaveAttribute('data-is-changed', '');
      expect(label).toHaveAttribute('data-is-changed', '');
      expect(input).toHaveAttribute('data-is-invalid', 'validate-function-error');
      expect(label).toHaveAttribute('data-is-invalid', 'validate-function-error');
      expect(input).toHaveValue('X-World');
    });
    expect(formValues.text).toBe('X-World');

    //
    //screen.debug();
    unmount();

  });

  test('blur', async () => {

    interface FormData {
      text: string;
    }

    let createIdForHtmlFunc = (_key: string) => '';
    let formValues: FormData = { text: '' };
    //
    const App = () => {
      const { values, createIdForHtml, input, label } = useForm<FormData>({
        defaultValues: {
          text: 'Hello',
        },
        options: {
          text: {
            required: true,
          }
        }
      });
      createIdForHtmlFunc = createIdForHtml;
      formValues = values;
      return (
        <form>
          <label data-testid="test-label" {...label('text')}>
            <input data-testid="test-input" {...input('text')}/>
            <input data-testid="test-input2" {...input('text2')}/>
          </label>
        </form>
      );
    };

    const { unmount } = render(<App/>);
    const idText = createIdForHtmlFunc('text');

    // label
    const testLabel = await screen.findAllByTestId('test-label');
    expect(testLabel.length).toBe(1);
    const label = testLabel[0];
    // for
    expect(label).toHaveAttribute('for', idText);
    // data-required
    expect(label).toHaveAttribute('data-required', '');

    // input
    const testInput = await screen.findAllByTestId('test-input');
    expect(testInput.length).toBe(1);
    const input = testInput[0];
    // id
    expect(input).toHaveAttribute('id', idText);
    // name
    expect(input).toHaveAttribute('name', 'text');
    // required
    expect(input).toHaveAttribute('required', '');
    expect(input).toHaveAttribute('data-required', '');
    // value
    expect(input).toHaveValue('Hello');

    // change to World
    input.focus();
    expect(input).toHaveFocus();
    //
    await userEvent.clear(input);
    await userEvent.keyboard('World');
    //
    await waitFor(() => {
      expect(input).toHaveAttribute('data-is-changed', '');
      expect(label).toHaveAttribute('data-is-changed', '');
      expect(input).not.toHaveAttribute('data-is-blurred');
      expect(label).not.toHaveAttribute('data-is-blurred');
      expect(input).toHaveValue('World');
    });
    expect(formValues.text).toBe('World');

    // chang focus to input2
    await userEvent.click(screen.getByTestId('test-input2'));
    const testInput2 = await screen.findAllByTestId('test-input2');
    expect(testInput2.length).toBe(1);
    const input2 = testInput2[0];
    expect(input2).toHaveFocus();
    //
    await waitFor(() => {
      expect(input).toHaveAttribute('data-is-changed', '');
      expect(label).toHaveAttribute('data-is-changed', '');
      expect(input).toHaveAttribute('data-is-blurred', '');
      expect(label).toHaveAttribute('data-is-blurred', '');
      expect(input).toHaveValue('World');
    });
    expect(formValues.text).toBe('World');

    //
    //screen.debug();
    unmount();

  });

  test('readonly', async () => {

    interface FormData {
      text: string;
    }

    let createIdForHtmlFunc = (_key: string) => '';
    //
    const App = () => {
      //
      const [readonly, setReadOnly] = useState<boolean>(true);
      //
      const { createIdForHtml, input, label } = useForm<FormData>({
        defaultValues: {
          text: 'Hello',
        },
        options: {
          text: {
            readonly,
          }
        }
      });
      createIdForHtmlFunc = createIdForHtml;
      return (
        <form>
          <label data-testid="test-label" {...label('text')}>
            <input data-testid="test-input" {...input('text')}/>
          </label>
          <button type="button" data-testid="test-button" onClick={() => setReadOnly(false)}>not readonly</button>
        </form>
      );
    };

    const { unmount } = render(<App/>);
    const idText = createIdForHtmlFunc('text');

    // label
    const testLabel = await screen.findAllByTestId('test-label');
    expect(testLabel.length).toBe(1);
    const label = testLabel[0];
    // for
    expect(label).toHaveAttribute('for', idText);
    // data-readonly
    expect(label).toHaveAttribute('data-readonly', '');

    // input
    const testInput = await screen.findAllByTestId('test-input');
    expect(testInput.length).toBe(1);
    const input = testInput[0];
    // id
    expect(input).toHaveAttribute('id', idText);
    // name
    expect(input).toHaveAttribute('name', 'text');
    // readonly
    expect(input).toHaveAttribute('readonly', '');
    expect(input).toHaveAttribute('data-readonly', '');
    // value
    expect(input).toHaveValue('Hello');

    // off setReadOnly
    await userEvent.click(screen.getByTestId('test-button'));
    await waitFor(() => {
      expect(label).not.toHaveAttribute('data-readonly');
      expect(input).not.toHaveAttribute('readonly');
      expect(input).not.toHaveAttribute('data-readonly');
    });

    //
    //screen.debug();
    unmount();

  });

  test('disabled', async () => {

    interface FormData {
      text: string;
    }

    let createIdForHtmlFunc = (_key: string) => '';
    //
    const App = () => {
      //
      const [disabled, setDisabled] = useState<boolean>(true);
      //
      const { createIdForHtml, input, label } = useForm<FormData>({
        defaultValues: {
          text: 'Hello',
        },
        options: {
          text: {
            disabled,
          }
        }
      });
      createIdForHtmlFunc = createIdForHtml;
      return (
        <form>
          <label data-testid="test-label" {...label('text')}>
            <input data-testid="test-input" {...input('text')}/>
          </label>
          <button type="button" data-testid="test-button" onClick={() => setDisabled(false)}>not disabled</button>
        </form>
      );
    };

    const { unmount } = render(<App/>);
    const idText = createIdForHtmlFunc('text');

    // label
    const testLabel = await screen.findAllByTestId('test-label');
    expect(testLabel.length).toBe(1);
    const label = testLabel[0];
    // for
    expect(label).toHaveAttribute('for', idText);
    // data-readonly
    expect(label).toHaveAttribute('data-disabled', '');

    // input
    const testInput = await screen.findAllByTestId('test-input');
    expect(testInput.length).toBe(1);
    const input = testInput[0];
    // id
    expect(input).toHaveAttribute('id', idText);
    // name
    expect(input).toHaveAttribute('name', 'text');
    // readonly
    expect(input).toHaveAttribute('disabled', '');
    expect(input).toHaveAttribute('data-disabled', '');
    // value
    expect(input).toHaveValue('Hello');

    // off setReadOnly
    await userEvent.click(screen.getByTestId('test-button'));
    await waitFor(() => {
      expect(label).not.toHaveAttribute('data-disabled');
      expect(input).not.toHaveAttribute('disabled');
      expect(input).not.toHaveAttribute('data-disabled');
    });

    //
    //screen.debug();
    unmount();

  });

  test('ref', async () => {

    interface FormData {
      text: string;
    }

    let createIdForHtmlFunc = (_key: string) => '';
    let refLabelElement: React.RefObject<HTMLLabelElement> = { current: null };
    let refInputElement: React.RefObject<HTMLInputElement> = { current: null };
    //
    const App = () => {
      //
      const { createIdForHtml, input, label } = useForm<FormData>({
        defaultValues: {
          text: 'Hello',
        },
      });
      createIdForHtmlFunc = createIdForHtml;

      const refLabel = refLabelElement = useRef<HTMLLabelElement | null>(null);
      const refText = refInputElement = useRef<HTMLInputElement | null>(null);

      return (
        <form>
          <label data-testid="test-label" {...label('text', {ref: refLabel})}>
            <input data-testid="test-input" {...input('text', {ref: refText})}/>
          </label>
        </form>
      );
    };

    const { unmount } = render(<App/>);
    const idText = createIdForHtmlFunc('text');

    // label
    const testLabel = await screen.findAllByTestId('test-label');
    expect(testLabel.length).toBe(1);
    const label = testLabel[0];
    // for
    expect(label).toHaveAttribute('for', idText);

    // input
    const testInput = await screen.findAllByTestId('test-input');
    expect(testInput.length).toBe(1);
    const input = testInput[0];
    // id
    expect(input).toHaveAttribute('id', idText);
    // name
    expect(input).toHaveAttribute('name', 'text');
    // value
    expect(input).toHaveValue('Hello');

    // label
    expect(refLabelElement.current).toHaveAttribute('for', idText);
    // id
    expect(refInputElement.current).toHaveAttribute('id', idText);
    // name
    expect(refInputElement.current).toHaveAttribute('name', 'text');
    // value
    expect(refInputElement.current).toHaveValue('Hello');

    //
    //screen.debug();
    unmount();

  });

  test('form', async () => {

    interface FormData {
      text?: string;
      text2?: string;
    }

    let createIdForHtmlFunc = (_key: string) => '';
    let extValues: FormData = {};
    let resultValues: FormData = {};
    //
    const App = () => {
      //
      const { values, createIdForHtml, input, label, submit, form, reset } = useForm<FormData>();
      createIdForHtmlFunc = createIdForHtml;
      extValues = values;

      const onSubmit: SubmitHandler<FormData> = (v: FormData) => {
        resultValues = v;
      };

      return (
        <form data-testid="test-form" {...form(onSubmit)}>
          <label data-testid="test-label" {...label('text')}>
            <input data-testid="test-input" {...input('text')}/>
          </label>
          <label data-testid="test-label2" {...label('text2')}>
            <input data-testid="test-input2" {...input('text2')}/>
          </label>
          <button type="submit" data-testid="test-submit-button">Submit</button>
          <input type="button" data-testid="test-input-button" onClick={() => submit(onSubmit)} value="Input Submit"/>&nbsp;
          <button type="button" data-testid="test-reset-button" onClick={() => reset()}>Reset</button>
          <button type="button" data-testid="test-reset-button2" onClick={() => reset({
            text: '123',
          })}>Reset</button>
        </form>
      );
    };

    const { unmount } = render(<App/>);

    ////////////////////////////////////////////////////////////////////////////
    // form
    const testForm = await screen.findAllByTestId('test-form');
    expect(testForm.length).toBe(1);
    const form = testForm[0];
    expect(form).toHaveAttribute('noValidate', '');

    ////////////////////////////////////////////////////////////////////////////
    // label
    const testLabel = await screen.findAllByTestId('test-label');
    expect(testLabel.length).toBe(1);
    const label = testLabel[0];
    // for
    const idText = createIdForHtmlFunc('text');
    expect(label).toHaveAttribute('for', idText);

    // input
    const testInput = await screen.findAllByTestId('test-input');
    expect(testInput.length).toBe(1);
    const input = testInput[0];
    // id
    expect(input).toHaveAttribute('id', idText);
    // name
    expect(input).toHaveAttribute('name', 'text');
    // value
    expect(input).toHaveValue('');

    ////////////////////////////////////////////////////////////////////////////
    // label2
    const testLabel2 = await screen.findAllByTestId('test-label2');
    expect(testLabel2.length).toBe(1);
    const label2 = testLabel2[0];
    // for
    const idText2 = createIdForHtmlFunc('text2');
    expect(label2).toHaveAttribute('for', idText2);

    // input2
    const testInput2 = await screen.findAllByTestId('test-input2');
    expect(testInput2.length).toBe(1);
    const input2 = testInput2[0];
    // id
    expect(input2).toHaveAttribute('id', idText2);
    // name
    expect(input2).toHaveAttribute('name', 'text2');
    // value
    expect(input2).toHaveValue('');

    ////////////////////////////////////////////////////////////////////////////
    // blank submit

    await userEvent.click(screen.getByTestId('test-input-button'));
    await waitFor(() => {
      expect(extValues.text).toBe(undefined);
      expect(extValues.text2).toBe(undefined);
      expect(resultValues.text).toBe(undefined);
      expect(resultValues.text2).toBe(undefined);
    });

    ////////////////////////////////////////////////////////////////////////////
    // text ABC

    input.focus();
    expect(input).toHaveFocus();
    await userEvent.clear(input);
    await userEvent.keyboard('ABC');
    await userEvent.click(screen.getByTestId('test-input-button'));
    await waitFor(() => {
      expect(extValues.text).toBe('ABC');
      expect(extValues.text2).toBe(undefined);
      expect(resultValues.text).toBe('ABC');
      expect(resultValues.text2).toBe(undefined);
    });

    ////////////////////////////////////////////////////////////////////////////
    // text2 DEF

    input2.focus();
    expect(input2).toHaveFocus();
    await userEvent.clear(input2);
    await userEvent.keyboard('DEF');
    await userEvent.click(screen.getByTestId('test-input-button'));
    await waitFor(() => {
      expect(extValues.text).toBe('ABC');
      expect(extValues.text2).toBe('DEF');
      expect(resultValues.text).toBe('ABC');
      expect(resultValues.text2).toBe('DEF');
    });

    ////////////////////////////////////////////////////////////////////////////
    // reset

    await userEvent.click(screen.getByTestId('test-reset-button'));
    await waitFor(() => {
      expect(extValues.text).toBe(undefined);
      expect(extValues.text2).toBe(undefined);
    });

    ////////////////////////////////////////////////////////////////////////////
    // submit text abc

    input.focus();
    expect(input).toHaveFocus();
    await userEvent.clear(input);
    await userEvent.keyboard('abc');
    await userEvent.click(screen.getByTestId('test-submit-button'));
    await waitFor(() => {
      expect(extValues.text).toBe('abc');
      expect(extValues.text2).toBe(undefined);
      expect(resultValues.text).toBe('abc');
      expect(resultValues.text2).toBe(undefined);
    });

    ////////////////////////////////////////////////////////////////////////////
    // submit text2 def

    input2.focus();
    expect(input2).toHaveFocus();
    await userEvent.clear(input2);
    await userEvent.keyboard('def');
    await userEvent.click(screen.getByTestId('test-submit-button'));
    await waitFor(() => {
      expect(extValues.text).toBe('abc');
      expect(extValues.text2).toBe('def');
      expect(resultValues.text).toBe('abc');
      expect(resultValues.text2).toBe('def');
    });

    ////////////////////////////////////////////////////////////////////////////
    // reset

    await userEvent.click(screen.getByTestId('test-reset-button2'));
    await waitFor(() => {
      expect(extValues.text).toBe('123');
      expect(extValues.text2).toBe(undefined);
    });

    ////////////////////////////////////////////////////////////////////////////
    // submit text abc

    await userEvent.click(screen.getByTestId('test-submit-button'));
    await waitFor(() => {
      expect(extValues.text).toBe('123');
      expect(extValues.text2).toBe(undefined);
      expect(resultValues.text).toBe('123');
      expect(resultValues.text2).toBe(undefined);
    });

    //
    //screen.debug();
    unmount();

  });

  test('noValidate', async () => {

    interface FormData {
      text?: string;
      text2?: string;
    }
    //
    const App = () => {
      //
      const { form } = useForm<FormData>();

      const onSubmit: SubmitHandler<FormData> = () => {
        //
      };

      return (
        <form data-testid="test-form" {...form(onSubmit, {noValidate: false})}>
        </form>
      );
    };

    const { unmount } = render(<App/>);

    ////////////////////////////////////////////////////////////////////////////
    // form
    const testForm = await screen.findAllByTestId('test-form');
    expect(testForm.length).toBe(1);
    const form = testForm[0];
    expect(form).not.toHaveAttribute('noValidate');

    //
    //screen.debug();
    unmount();
  });

});
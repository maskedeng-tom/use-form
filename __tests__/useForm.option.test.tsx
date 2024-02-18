/**
 * @jest-environment jsdom
**/
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Option, { OptionsType, OptionTestProps } from './Option';

const options: OptionsType = {
  email: { maxLength: 12, minLength: 7 },
  number: { max: 10, min: 1, step: 2 },
  checkbox: { maxChecked: 3, minChecked: 2},
  selectMultiple: { maxSelected: 3, minSelected: 2},
};

describe('useForm options tests', () => {

  test('default', async () => {

    const defaultValues: OptionTestProps = {
      email: '',
      number: 0,
      checkbox: [],
      selectMultiple: [],
    };
    /*
    const dataAttributes = {

    }
    */

    // mount
    const { unmount } = render(<Option
      defaultValues={defaultValues}
      /*dataAttributes={dataAttributes}*/
      required
      options={options}
    />);

    const emailLabel = screen.getAllByTestId('email-label')[0];
    const emailInput = screen.getAllByTestId('email')[0];
    const numberLabel = screen.getAllByTestId('number-label')[0];
    const numberInput = screen.getAllByTestId('number')[0];
    const checkboxLabel = screen.getAllByTestId('checkbox-label')[0];
    const checkbox1 = screen.getAllByTestId('checkbox-c1')[0];
    const checkbox2 = screen.getAllByTestId('checkbox-c2')[0];
    const checkbox3 = screen.getAllByTestId('checkbox-c3')[0];
    const checkbox4 = screen.getAllByTestId('checkbox-c4')[0];
    const selectLabel = screen.getAllByTestId('select-multiple-label')[0];
    const selectInput = screen.getAllByTestId('select-multiple')[0];

    expect(emailLabel).toHaveAttribute('data-is-invalid', 'value-missing');
    expect(emailInput).toHaveAttribute('data-is-invalid', 'value-missing');
    expect(numberLabel).toHaveAttribute('data-is-invalid', 'range-underflow');
    expect(numberInput).toHaveAttribute('data-is-invalid', 'range-underflow');
    expect(checkboxLabel).toHaveAttribute('data-is-invalid', 'value-missing');
    expect(selectLabel).toHaveAttribute('data-is-invalid', 'value-missing');
    expect(selectInput).toHaveAttribute('data-is-invalid', 'value-missing');
    //
    //screen.debug();
    unmount();

  });

  test('custom', async () => {

    const defaultValues: OptionTestProps = {
      email: '',
      number: 0,
      checkbox: [],
      selectMultiple: [],
    };

    const xDataAttributes = {
      required: 'data-x-required',
      disabled: 'data-x-disabled',
      readonly: 'data-x-readonly',
      isChanged: 'data-x-is-changed',
      isBlurred: 'data-x-is-blurred',
      isInvalid: 'data-x-is-invalid',
    };

    // mount
    const { unmount } = render(<Option
      defaultValues={defaultValues}
      dataAttributes={xDataAttributes}
      required
      options={options}
    />);

    const emailLabel = screen.getAllByTestId('email-label')[0];
    const emailInput = screen.getAllByTestId('email')[0];
    const numberLabel = screen.getAllByTestId('number-label')[0];
    const numberInput = screen.getAllByTestId('number')[0];
    const checkboxLabel = screen.getAllByTestId('checkbox-label')[0];
    const checkbox1 = screen.getAllByTestId('checkbox-c1')[0];
    const checkbox2 = screen.getAllByTestId('checkbox-c2')[0];
    const checkbox3 = screen.getAllByTestId('checkbox-c3')[0];
    const checkbox4 = screen.getAllByTestId('checkbox-c4')[0];
    const selectLabel = screen.getAllByTestId('select-multiple-label')[0];
    const selectInput = screen.getAllByTestId('select-multiple')[0];

    expect(emailLabel).toHaveAttribute('data-x-is-invalid', 'value-missing');
    expect(emailInput).toHaveAttribute('data-x-is-invalid', 'value-missing');
    expect(numberLabel).toHaveAttribute('data-x-is-invalid', 'range-underflow');
    expect(numberInput).toHaveAttribute('data-x-is-invalid', 'range-underflow');
    expect(checkboxLabel).toHaveAttribute('data-x-is-invalid', 'value-missing');
    expect(selectLabel).toHaveAttribute('data-x-is-invalid', 'value-missing');
    expect(selectInput).toHaveAttribute('data-x-is-invalid', 'value-missing');
    //
    //screen.debug();
    unmount();

  });

  test('ignore', async () => {

    const defaultValues: OptionTestProps = {
      email: '',
      number: 0,
      checkbox: [],
      selectMultiple: [],
    };

    const xDataAttributes = {
      required: null,
      disabled: null,
      readonly: null,
      isChanged: null,
      isBlurred: null,
      isInvalid: null,
    };

    // mount
    const { unmount } = render(<Option
      defaultValues={defaultValues}
      dataAttributes={xDataAttributes}
      required
      options={options}
    />);

    const emailLabel = screen.getAllByTestId('email-label')[0];
    const emailInput = screen.getAllByTestId('email')[0];
    const numberLabel = screen.getAllByTestId('number-label')[0];
    const numberInput = screen.getAllByTestId('number')[0];
    const checkboxLabel = screen.getAllByTestId('checkbox-label')[0];
    const checkbox1 = screen.getAllByTestId('checkbox-c1')[0];
    const checkbox2 = screen.getAllByTestId('checkbox-c2')[0];
    const checkbox3 = screen.getAllByTestId('checkbox-c3')[0];
    const checkbox4 = screen.getAllByTestId('checkbox-c4')[0];
    const selectLabel = screen.getAllByTestId('select-multiple-label')[0];
    const selectInput = screen.getAllByTestId('select-multiple')[0];

    expect(emailLabel).not.toHaveAttribute('data-is-invalid');
    expect(emailInput).not.toHaveAttribute('data-is-invalid');
    expect(numberLabel).not.toHaveAttribute('data-is-invalid');
    expect(numberInput).not.toHaveAttribute('data-is-invalid');
    expect(checkboxLabel).not.toHaveAttribute('data-is-invalid');
    expect(selectLabel).not.toHaveAttribute('data-is-invalid');
    expect(selectInput).not.toHaveAttribute('data-is-invalid');

    //screen.debug();
    unmount();

  });

});

import { useForm } from '../';

////////////////////////////////////////////////////////////////////////////////

interface InputFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  terms: string[];
}

const Sample = () => {

  const uf = useForm<InputFormProps>({
    options: {
      email: { required: true },
      password: { required: true, minLength: 8 },
      confirmPassword: { required: true },
      terms: { required: true },
    },
    validate: (v: InputFormProps) => {
      return v.password === v.confirmPassword;
    }
  });

  const onSubmit = (v: InputFormProps) => {
    console.log('------->', v);
  };

  return (<>
    <form {...uf.form(onSubmit)}>

      <fieldset>
        <legend>Create Account</legend>
        <div>
          <label>
            <div>Email</div>
            <input {...uf.email('email')} />
          </label>
        </div>
        <div>
          <label>
            <div>Choose password</div>
            <input {...uf.password('password')} />
          </label>
        </div>
        <div>
          <label>
            <div>Confirm password</div>
            <input {...uf.password('confirmPassword')} />
          </label>
        </div>
        <div>
          <label>
            <input {...uf.checkbox('terms')} value="terms"/>
            I accept the <a href="#">terms</a>
          </label>
        </div>
        <div>
          <button type="submit" disabled={uf.isInvalid}>Create Account</button>
        </div>
      </fieldset>

      <fieldset>
        <legend>debug</legend>
        email : {uf.invalid['email']}<br/>
        password : {uf.invalid['password']}<br/>
        confirmPassword : {uf.invalid['confirmPassword']}<br/>
        terms : {uf.invalid['terms']}<br/>
        validate : {uf.validateError}<br/>
      </fieldset>

    </form>
  </>);
};

export default Sample;
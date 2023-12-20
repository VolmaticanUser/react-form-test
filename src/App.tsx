import './App.css';
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  userName: string
  password: string
  confirmPassword: string
  email: string
  dob: any
  bio: string
  gender: string
  terms: boolean
}


function App() {

  function getYearDiff(date1: Date, date2: Date): number {
    return Math.abs(date2.getFullYear() - date1.getFullYear());
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  }


  console.log(watch("dob")) // watch input value by passing the name of it


  return (
    <div className='flex w-full h-screen items-center justify-center bg-slate-700'>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>


          <div className="mb-4">
            <label className="formLabel" >
              Username
            </label>
            <input className={`${errors.userName ? "formInputError" : "formInput"} focus:outline-none focus:shadow-outline`} {...register("userName", { required: true, minLength: 3, maxLength: 15 })} placeholder="Username" />
            {errors.userName && <p className="formError">Please choose a username.</p>}
          </div>

          <div className="mb-4">
            <label className="formLabel" >
              Email Address
            </label>
            <input className={`${errors.email ? "formInputError" : "formInput"} focus:outline-none focus:shadow-outline`} {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })} placeholder="abc@email.com" />
            {errors.email && <p className="formError">Please choose an email address.</p>}
          </div>


          <div className="mb-4">
            <label className="formLabel">
              Password
            </label>
            <input className={`${errors.password ? "formInputError" : "formInput"} focus:outline-none focus:shadow-outline`} {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i })} placeholder="********" />
            {errors.password && <p className="formError">Please choose a password.</p>}
          </div>



          <div className="mb-4">
            <label className="formLabel">
              Confirm Password
            </label>
            <input className={`${errors.confirmPassword ? "formInputError" : "formInput"} focus:outline-none focus:shadow-outline`} {...register("confirmPassword", { required: true, validate: (value, formValue) => value === formValue.password })} placeholder="********" />
            {errors.confirmPassword && <p className="formError">Password don't match</p>}
          </div>




          <div className="mb-4">
            <label className="formLabel">
              Date of birth
            </label>
            <input type='date' className={`${errors.dob ? "formInputError" : "formInput"} focus:outline-none focus:shadow-outline`} {...register("dob", {
              required: true, validate: (value, formValue) => {
                const age: number = getYearDiff(new Date(value), new Date())
                return age > 18;
              }
            })} placeholder="Must be older than 18" />
            {errors.dob && <p className="formError">Please enter correct date</p>}
          </div>


          <div className="mb-4">
            <label className="formLabel" >
              Bio
            </label>
            <textarea className={`formInput focus:outline-none focus:shadow-outline`} {...register("bio", { required: true, maxLength: 300 })} placeholder="Write your bio here (optional)" />
          </div>


          <div className='mb-2'>
            <label className='formLabel'>Select your gender</label>
          </div>

          <div className='mb-4'>
            <div className='flex items-center'>
              <input {...register("gender", { required: true })} type="radio" value="Male" />
              <label className="radioLabel" >
                Male
              </label>
            </div>

            <div className='flex items-center'>
              <input {...register("gender", { required: true })} type="radio" value="Female" />
              <label className="radioLabel" >
                Female
              </label>
            </div>

            <div className='flex items-center'>
              <input {...register("gender", { required: true })} type="radio" value="Others" />
              <label className="radioLabel" >
                Others
              </label>
            </div>
            {errors.gender && <p className="formError">Please select ur gender</p>}
          </div>

          <div className="mb-4">
            <input type="checkbox" placeholder="terms" {...register("terms", { required: true })} />
            <label className="radioLabel" >
              I agree to terms and conditions
            </label>
            {errors.terms && <p className="formError">You must agree.</p>}
          </div>



          <div className="flex items-center justify-center">
            <input className="submitButton focus:outline-none focus:shadow-outline" type="submit" value={"Submit"} />
          </div>
        </form>


      </div>
    </div>

  );
}

export default App;

import React, {useState} from "react"
import axios from "axios"
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup"
import "./register.scss"
import { useNavigate,Link } from "react-router-dom";
import Merkato from "./merkatologodark.png"


export default function Register(){
    const [error,setError] = useState()
    const navigate = useNavigate()
    
async function handleSubmitData(data){
    const formData = new FormData();



    const url = `${import.meta.env.VITE_API_URL}/api/auth/register`
    for(const name in data){
        formData.append(name, data[name])
    }

axios.post(url, formData).then((res) => {
        if(res.data.isSuccess === false){
          if(res.data.message==="DuplicateUserName"){
            setError("Email address already exist")
            setTimeout(()=>{setError("")}, 5000)
          }

        }
        else if (res.data.isSuccess === true){
          navigate(`/account/confirmation/${data.email.substring(0, data.email.length-4)}`)
        }
      })
      .catch((err) => {
        console.log(err);
      });

}
 const formSchema = Yup.object().shape({firstName: Yup.string().required("First name is required"),lastName: Yup.string().required("Last name is required"),email: Yup.string().email().required("Email address is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length must be greater than 6 characters").test("isValidPass", "Password must contain lowercase, uppercase and special character", (value, context) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSymbole = /[!@#%&]/.test(value);
        let validConditions = 0;
        const numberOfMustBeValidConditions = 3;
        const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbole];
        conditions.forEach((condition) =>
          condition ? validConditions++ : null
        );
        if (validConditions >= numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      })
      .required(),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length must be greater than 6 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match")
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema)
  });

return(
    <div className="register">
      <img src={Merkato} alt="" />
      <h1>Merkato Market</h1>
      <h2>Create Account</h2>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <label>
             <p className={errors.firstName?`labelError label`:"label"}>First Name</p>
            <input type="text"   className={errors.firstName?`inputError`:""}{...register(("firstName"),{required:true})}  />
            {errors.firstName && <li className="error" >{errors.firstName.message}</li>}
            </label>

            <label>
            <p   className={errors.lastName?`labelError label`:"label"}>Last Name</p> 
            <input type="text" className={errors.lastName?`inputError`:""} {...register(("lastName"),{required:true})}  />
            {errors.lastName && <li className="error" >{errors.lastName.message}</li>}
            </label>


            <label>
             <p  className={errors.email?`labelError label`:"label"}>Email</p>
            <input type="email"  className={errors.email?`inputError`:""} {...register(("email"),{required:true})}  />
            {errors.email && <li className="error">{errors.email.message}</li>}
            </label>

            <label>
            <p  className={errors.password?`labelError label`:"label"}>Password</p>
            <input type="password"  className={errors.password?`inputError`:""} {...register("password")}  />
            {errors.password && <li className="error" >{errors.password.message}</li>}
            </label>

            <label>
            <p  className={errors.confirmPassword?`labelError label`:"label"}>Confirm Password</p>
            <input type="password"  className={errors.confirmPassword?`inputError`:""} {...register("confirmPassword")}  />
    {errors.confirmPassword && <li className="error">{errors.confirmPassword.message}</li>}
            </label>

            {error && <div><p>Account already exist please login</p></div>}

            <input id="registerButton" type="submit"  value="Register" />

            <div className="loginRegister">
              <Link to="/account/login">Login instead? </Link>
            </div>
            
        </form>
    </div>
)
}
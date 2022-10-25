import React, {useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup"
import {useForm} from "react-hook-form"
import "./resetpassword.scss"
import Merkato from "./merkatologodark.png"
import { useNavigate } from "react-router-dom";

export default function ResetPassword(props){
    const {email, token} = useParams()
    const navigate = useNavigate()

async function handleSubmitData(data){
    const formData = new FormData();


    const url = `${import.meta.env.VITE_API_URL}/api/auth/ResetPassword`
    for(const name in data){
        formData.append(name, data[name])
    }

axios.post(url, formData).then((res) => {
        navigate("/account")
      })
      .catch((err) => {
        console.log(err);
      });

}
 const formSchema = Yup.object().shape({email: Yup.string().email().required(),
    newPassword: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters").test("isValidPass", "must containe lowercase uppercase and symbol", (value, context) => {
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
      .min(4, "Password length should be at least 4 characters")
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
  });
 
  const {
    register,
    handleSubmit,watch,getValues,
    formState: { errors }
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema)
  });
console.log(getValues())
console.log(errors)
return(
    <div className="resetPassword">
      <img src={Merkato} alt="" />
      <h1>Merkato Market</h1>
      <h2>Set new Password</h2>
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <input  type="email" hidden value= {email} {...register("email")}  />
            <input type="text" hidden value={token} {...register("token")}  />

            
            <label>
            <p  className={errors.newPassword?`labelError label`:"label"}>Password</p>
            <input type="password"  className={errors.newPassword?`inputError passwords`:"passwords"} {...register("newPassword")}  />
            {errors.newPassword && <li className="error" >{errors.newPassword.message}</li>}
            </label>

            <label>
            <p  className={errors.confirmPassword?`labelError label`:"label"}>Confirm Password</p>
            <input type="password"  className={errors.confirmPassword?`inputError passwords`:" passwords"} {...register("confirmPassword")}  />
    {errors.confirmPassword && <li className="error">{errors.confirmPassword.message}</li>}
            </label>
            
            <input id="submit" type="submit"  value="Submit" />
        </form>
    </div>
)
}
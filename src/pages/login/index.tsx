import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/router';

type Inputs = {
  email: string,
  password: any
};

function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const onSubmit = async (items: any) => {
    const { password, email } = items;
   
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .like('password', password);
  if (error) {
    console.error('Помилка при вході користувача:', error);
  } else {
    if (data.length) {
      console.log('Користувач успішно увійшов:', data);
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/');
      reset();
    } else {
      console.error('Невірний пароль або емейл');
    }
  }
  };

  return (
    <div>
      <h1>Вхід</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} type="text" placeholder="Емейл" />
        {errors.email && <span>Це поле обов&apos;язкове</span>}

        <input {...register("password", { required: true })} type="password"
          placeholder="Пароль" />
        {errors.password && <span>Це поле обов&apos;язкове</span>}

        <button type="submit">Увійти</button>
      </form>
    </div>
  );
}

export default Login;

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/utils/supabaseClient';

type Inputs = {
  name: string,
  email: string,
  password: any,
  position: string,
};

function Register() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
  const [errorData, setErrorData] = useState('')
  const router = useRouter();
  const [formData, setFormData] = useState({});

  const onSubmit = async (props: any) => {
    const { name, email, password, position } = props;

    const { data, error } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password,
        position,
      }).select()
      .single()
    if (error) {
      console.error('Помилка при реєстрації користувача:', error.message);
      setErrorData(`Помилка при реєстрації користувача: ${error.message}`);
    } else {
      console.log('Користувач успішно зареєстрований:', data);
      localStorage.setItem('user', JSON.stringify([...data]));
      router.push('/');
      reset();
    }
  };

  return (
    <div>
      <h1>Реєстрація</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} type="text" placeholder="Ім'я" />

        {errors.name && <span>Це поле обов&apos;язкове</span>}

        <input {...register("email", { required: true })} type="email" placeholder="Електронна пошта" />

        {errors.email && <span>Це поле обов&apos;язкове</span>}

        <input {...register("password", { required: true })} type="password"
          placeholder="Пароль" />

        {errors.password && <span>Це поле обов&apos;язкове</span>}

        <select {...register("position")}>
          <option value="author">Author</option>
          <option value="commentator">Commentator</option>
        </select>

        {errorData && <span>{errorData}</span>}

        <button type="submit">Зареєструватися</button>

        <Link href="/register">Уже зареєстрований</Link>
      </form>
    </div>
  );
}

export default Register;

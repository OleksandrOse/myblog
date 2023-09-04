import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabaseClient';
import { User } from '../../types/user';

type Props = {
  user: User[];
}

export const PostForm: React.FC<Props> = ({ user }) =>  {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const createPostMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  async function createPost(items: any) {
    const { post, post_name } = items;

    const { data, error } = await supabase
      .from('posts').insert({
        user_id: user[0].id,
        post,
        post_name,
        author_name: user[0].name,
      }).select()
      .single()
    if (error) {
      console.error('Помилка:', error.message);
    } else {
      console.log('успішно:', data);
      reset();
    }
    return data;
  }

  const onSubmit = (data: any) => {
    createPostMutation.mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("post_name", { required: true })}
        type="text"
        placeholder="Заголовок"
      />

      <textarea {...register("post", { required: true })} placeholder="Напишіть вашу публікацію" />
      <button type="submit">Опублікувати</button>
    </form>
  );
}

export default PostForm;
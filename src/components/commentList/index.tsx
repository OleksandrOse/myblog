import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabaseClient';
import { User } from '../../types/user';

type Props = {
  user: User[];
}

export const CommentsList: React.FC<Props> = ({ user }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const { data: comments } = useQuery('comments', fetchComments);
  console.log(user[0].position);
  const isAuthor = user[0].position === 'author';


  const createCommentMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });

  function fetchComments() {
    return supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
      .then((response: any) => response.data);
  }

  async function createComment(items: any) {
    const { comment } = items;

    const { data, error } = await supabase
      .from('comments').insert({
        user_id: user[0].id,
        comment,
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
    createCommentMutation.mutate(data);
  }

  return (
    <div>
      {comments?.map((comment: any) => (
        <div key={comment.id}>
          <h2>{comment.name}</h2>
          <p>{comment.comment}</p>
          {isAuthor && <form onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register('content')} placeholder="Додайте коментар" />
            <input type="hidden" {...register('authorId', { value: comment.id })} />
            <button type="submit">Додати коментар</button>
          </form>}
        </div>
      ))}
    </div>
  );
}

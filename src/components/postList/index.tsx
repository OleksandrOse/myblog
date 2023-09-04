import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '../../utils/supabaseClient';
import { CommentsList } from '../commentList';
import { User } from '../../types/user';
import PostForm from '../postForm';

type Props = {
  user: User[];
}

export const PostList: React.FC<Props> = ({ user }) => {
  const queryClient = useQueryClient();
  const { data: posts } = useQuery('posts', fetchPosts);

  function fetchPosts() {
    return supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
      .then((response: any) => response.data);
  }

  return (
    <div>
      <div>
        {posts?.map((post: any) => (
          <div key={post.id}>
            <h1>{post.post_name}</h1>
            <p>{post.post}</p>
            <span>by {post.author_name}</span>

            <CommentsList user={user} />
            <hr/>
          </div>
        ))}
      </div>

      <PostForm user={user} />
    </div>
  );
}

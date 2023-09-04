import { NextPage } from 'next'
import Link from 'next/link';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { PostList } from '../components/postList';

type User = {
  id: string;
  created_at: string;
  name: string,
  email: string,
  password: string,
  position: string,
}

const Home: NextPage = () => {
  const [user, setUser] = useState<User[] | null>(null);

  useEffect(() => {
    // Perform localStorage action
    const item = JSON.parse(localStorage.getItem('user')!);
    setUser(item);
  }, [])
  console.log(user)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!user && <div>
        <h1>Головна сторінка</h1>
        <Link href="/register">Реєстрація</Link>
        <Link href="/login">Вхід</Link>
      </div>}

      {user && <PostList user={user} />}
    </main>
  )
}

export default Home;

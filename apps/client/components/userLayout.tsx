import withAuth from './withAuth';
import { useSignOut, useUserId } from '@nhost/nextjs';
import { gql, useQuery } from '@apollo/client';

const GET_USER_QUERY = gql`
  query GetUser($id: uuid!) {
    user(id: $id) {
      id
      email
      displayName
      metadata
      avatarUrl
    }
  }
`;

function UserLayout({ children }) {
  const id = useUserId();
  const { signOut } = useSignOut();
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { id },
    skip: !id,
  });
  const user = data?.user;

  if (error) {
    return <p>Something went wrong. Try to refresh the page.</p>;
  }
  if (loading) {
    return null;
  }

  return (
    <main className="h-full">
      <div>
        <span>{user.displayName}</span>
        <button
          className="rounded bg-blue-500 ml-2 py-1 px-1 text-white hover:bg-blue-600 focus:bg-blue-400"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
      {children}
    </main>
  );
}

export default withAuth(UserLayout);

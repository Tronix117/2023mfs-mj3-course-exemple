import { useState } from 'react';

import { trpc } from '../utils/trpc';

export default function IndexPage() {
  const [firstname, setFirstname] = useState('');

  const hello = trpc.hello.useQuery();
  const sayHello = trpc.sayHello.useQuery({ firstname });

  if (!hello.data) return <div>Loading...</div>;

  return (
    <div>
      <label>
        Firstname:
        <input
          onInput={(e) => {
            setFirstname(e.currentTarget.value);
          }}
          value={firstname}
        />
      </label>
      <p>{hello.data}</p>
      <p>
        <h4>The server says : </h4>
        {sayHello.data}
      </p>
    </div>
  );
}

'use client';

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Something went wrong...</h2>
      <p>Could not fetch the list of teachers.{error.message}</p>
    </div>
  );
}

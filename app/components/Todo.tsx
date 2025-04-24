import React from 'react';
import Image from 'next/image';

const todoImage = '/images/todo-placeholder.jpg'; // You'll need to add an actual image in the public/images directory

interface TodoProps {
  // Add any props you need here
}

const Todo: React.FC<TodoProps> = () => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={todoImage}
        alt="Todo image"
        width={200}
        height={200}
        priority={true}
        className="rounded-lg"
      />
    </div>
  );
};

export default Todo; 
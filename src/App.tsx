import React, { useState } from 'react';
import NavBar from './components/NavBar';
import CodeIcon from '@mui/icons-material/Code';

const App: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Header Nav Bar */}
      <div className="flex justify-between items-between min-w-[100vw]">
        <CodeIcon />
        <NavBar />
      </div>
    </>
  )
};

export default App;

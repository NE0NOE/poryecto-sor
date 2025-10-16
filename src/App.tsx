import { useState, useEffect } from 'react';
import ChatLayout from './components/ChatLayout';
import UsernameDialog from './components/UsernameDialog';
import AdminPanel from './components/AdminPanel';
import { Toaster } from './components/ui/sonner';

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('chisChatUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (window.location.pathname === '/admin') {
      setIsAdminView(true);
    }
  }, []);

  const handleUsernameSet = (name: string) => {
    localStorage.setItem('chisChatUsername', name);
    setUsername(name);
  };

  if (isAdminView) {
    return (
      <>
        <AdminPanel />
        <Toaster />
      </>
    );
  }

  if (!username) {
    return (
      <>
        <UsernameDialog onUsernameSet={handleUsernameSet} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <ChatLayout username={username} />
      <Toaster />
    </>
  );
}

export default App;

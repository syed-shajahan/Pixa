import { useState, useEffect } from "react";
import { auth } from "../fireBaseConfig";
import { toast } from "react-toastify";

const WelcomeMessage = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser; 
    if (user) {
      setUserName(user.displayName || "Guest"); 
      toast.success(`you have be Login as ${user.displayName}`);
    }
  }, []);

  return (
    <div className="welcome-message">
      {userName && <h2>Welcome, {userName}!</h2>}
    </div>
  );
};

export default WelcomeMessage;

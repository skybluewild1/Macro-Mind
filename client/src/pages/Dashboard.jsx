import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import './Dashboard.css';  // Importing a new CSS file for styling

export default function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
      {user ? (
        <div className="user-card">
          <h2 className="greeting">Hi {user.username}!</h2>
          <p className="user-info">You are all set to track your progress and goals.</p>
          {/* You can add more personalized features here */}
        </div>
      ) : (
        <p className="no-user">Please log in to see your dashboard.</p>
      )}
    </div>
  );
}

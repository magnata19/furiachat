import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="m-1">
      <div className="mr-1 hover:cursor-pointer" onClick={handleLogout}>
        Sair
      </div>
    </div>
  );
};

export default Logout;

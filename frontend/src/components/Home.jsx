import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { MessageCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      {/* Glowing circle behind icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-150" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
          <MessageCircle className="h-12 w-12 text-primary-foreground" />
        </div>
      </div>

      <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground font-[family-name:'Georgia',serif]">
        WeChat
      </h1>
      <p className="mb-10 text-muted-foreground text-lg">
        Connect with friends, anytime, anywhere
      </p>

      <div className="flex w-full max-w-xs flex-col gap-4">
        <Button variant="hero" size="lg" className="w-full h-12" onClick={() => navigate("/Create")}>
          Create Account
        </Button>
        <Button variant="heroOutline" size="lg" className="w-full h-12" onClick={() => navigate("/Login")}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Index;

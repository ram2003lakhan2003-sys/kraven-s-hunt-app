import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Crosshair } from "lucide-react";
import { login } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      toast({ title: "Access Denied", description: result.error, variant: "destructive" });
      return;
    }
    if (result.user?.role === "organizer") {
      navigate("/organizer");
    } else {
      localStorage.setItem("huntTeam", JSON.stringify(result.user?.data));
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-hunter-gradient flex flex-col">
      <div className="flex items-center px-4 pt-6 pb-2">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-gold transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-center font-display text-lg text-gold tracking-wider">
          Hunter Login
        </h2>
        <div className="w-6" />
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="flex-1 px-6 py-6 space-y-5 max-w-md mx-auto w-full"
      >
        <div className="flex items-center justify-center mb-2">
          <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center bg-forest-deep/60 glow-gold">
            <Crosshair className="w-7 h-7 text-gold" />
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm tracking-widest uppercase font-body">
          Enter the Arena
        </p>

        <div className="space-y-2">
          <Label className="text-sm text-gold/80 font-body tracking-wider uppercase">Email Address</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hunter@kravenshunt.com"
            type="email"
            required
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:ring-gold/20"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gold/80 font-body tracking-wider uppercase">Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            required
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:ring-gold/20"
          />
        </div>

        <div className="pt-4">
          <Button type="submit" variant="hunt" size="xl" className="w-full">
            Hunter Login
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground/50 tracking-[0.3em] uppercase mt-6">
          The hunt awaits the worthy
        </p>
      </motion.form>
    </div>
  );
};

export default Login;

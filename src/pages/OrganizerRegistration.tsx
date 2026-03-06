import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield } from "lucide-react";
import { register } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const OrganizerRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = register(formData.email, formData.password, "organizer", {
      name: formData.name,
    });
    if (!result.success) {
      toast({ title: "Registration Failed", description: result.error, variant: "destructive" });
      return;
    }
    toast({ title: "Access Granted", description: "Welcome to Hunter's Control." });
    navigate("/organizer");
  };

  return (
    <div className="min-h-screen bg-hunter-gradient flex flex-col">
      <div className="flex items-center px-4 pt-6 pb-2">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-gold transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-center font-display text-lg text-gold tracking-wider">
          Organizer Registration
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
            <Shield className="w-7 h-7 text-gold" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gold/80 font-body tracking-wider uppercase">Organizer Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Your name"
            required
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:ring-gold/20"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gold/80 font-body tracking-wider uppercase">Email Address</Label>
          <Input
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="organizer@kravenshunt.com"
            type="email"
            required
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:ring-gold/20"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gold/80 font-body tracking-wider uppercase">Password</Label>
          <Input
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="••••••••"
            type="password"
            required
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:ring-gold/20"
          />
        </div>

        <div className="pt-4">
          <Button type="submit" variant="hunt" size="xl" className="w-full">
            <Shield className="w-5 h-5 mr-2" />
            Hunter's Control
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default OrganizerRegistration;

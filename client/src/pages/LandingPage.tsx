import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Loader2,
  MessageCircle,
  Moon,
  School,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { useSaveCallerUserProfile } from "../hooks/useQueries";



export default function LandingPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, requestOTP, verifyOTP, loading } = useAuth();
  const saveProfile = useSaveCallerUserProfile();

  // Login state
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Registration state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCountry, setRegCountry] = useState("");
  const [regState, setRegState] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regEducation, setRegEducation] = useState("");
  const [regStream, setRegStream] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);



  // Handle Registration OTP Request
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !regCountry || !regState || !regCity || !regEducation) {
      toast.error("Please fill all required fields");
      return;
    }

    setRegLoading(true);
    try {
      const otpResult = await requestOTP(regEmail, false);
      if (otpResult.success) {
        sessionStorage.setItem("regName", regName);
        sessionStorage.setItem("regEmail", regEmail);
        sessionStorage.setItem("regPhone", regPhone);
        sessionStorage.setItem("regCountry", regCountry);
        sessionStorage.setItem("regState", regState);
        sessionStorage.setItem("regCity", regCity);
        sessionStorage.setItem("regEducation", regEducation);
        sessionStorage.setItem("regStream", regStream || "");

        setOtpSent(true);
        setEmail(regEmail);
        toast.success("OTP sent to your email! Please verify.");
      } else {
        toast.error(otpResult.message);
      }
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setRegLoading(false);
    }
  };

  const handleLoginRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const result = await requestOTP(email, true);
    if (result.success) {
      setOtpSent(true);
      toast.success("OTP sent to your email!");
    } else {
      setLoginError(result.message);
      toast.error(result.message);
    }
  };

  // Handle OTP Verification (for both login and registration)
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await verifyOTP(email, otp);
    if (result.success) {
      const regEmail = sessionStorage.getItem("regEmail");
      if (regEmail && regEmail === email) {
        await saveProfile.mutateAsync({
          name: sessionStorage.getItem("regName") || "",
          email: email,
          phone: sessionStorage.getItem("regPhone") || "",
          country: sessionStorage.getItem("regCountry") || "",
          state: sessionStorage.getItem("regState") || "",
          city: sessionStorage.getItem("regCity") || "",
          educationLevel: sessionStorage.getItem("regEducation") || "",
          stream: sessionStorage.getItem("regStream") || undefined,
          language: "en",
          appearance: "light",
        });
        sessionStorage.clear();
      }
      toast.success("Login successful!");
      setLoginOpen(false);
    } else {
      toast.error(result.message);
    }
  };

  // Features array
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Career Quiz",
      desc: "Discover your ideal career stream through our AI-powered aptitude assessment.",
      color: "bg-teal-50 text-teal-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Scholarships",
      desc: "Find government and private scholarships with direct links to apply.",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Internships",
      desc: "Explore internships by domain — Engineering, Medical, Commerce, Arts.",
      color: "bg-teal-50 text-teal-600",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Mock Tests",
      desc: "Practice with subject-wise mock tests and track your performance.",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: <School className="h-6 w-6" />,
      title: "College Finder",
      desc: "Explore top universities and find the perfect environment for your higher education.",
      color: "bg-teal-50 text-teal-600",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "AI Chatbot",
      desc: "Get personalized guidance from our AI mentor, available 24/7.",
      color: "bg-teal-50 text-teal-600",
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 glass-card !rounded-none border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/assets/images/sarthi-mobile-logo.png"
              alt="Sarthi"
              className="h-10 w-10 rounded-lg object-contain"
            />
            <span className="font-heading font-bold text-xl text-teal-600 dark:text-teal-400">Sarthi</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-teal-600" />
              )}
            </button>

            {/* Profile Icon with Login/Register Modal */}
            <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <User className="h-5 w-5 text-muted-foreground" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    {otpSent ? "Verify OTP" : "Welcome to Sarthi"}
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    {otpSent
                      ? "Enter the 6-digit OTP sent to your email"
                      : "Login or create your account"}
                  </DialogDescription>
                </DialogHeader>

                {!otpSent ? (
                  <Tabs defaultValue="login" className="w-full" onValueChange={() => setLoginError("")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>

                    {/* Login Tab */}
                    <TabsContent value="login">
                      <form onSubmit={handleLoginRequestOTP} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setLoginError("");
                            }}
                            required
                            className={loginError ? "border-red-500" : ""}
                          />
                        </div>
                        {loginError && (
                          <p className="text-xs font-medium text-red-500 mt-1">
                            {loginError}
                          </p>
                        )}
                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending OTP...
                            </>
                          ) : (
                            "Login with Email"
                          )}
                        </Button>

                      </form>
                    </TabsContent>

                    {/* Register Tab */}
                    <TabsContent value="register">
                      <form onSubmit={handleRegister} className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
                        <div className="space-y-2">
                          <Label htmlFor="reg-name">Full Name *</Label>
                          <Input
                            id="reg-name"
                            placeholder="e.g. Arjun Sharma"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-email">Email *</Label>
                          <Input
                            id="reg-email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-phone">Phone Number *</Label>
                          <Input
                            id="reg-phone"
                            type="tel"
                            placeholder="9876543210"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-country">Country *</Label>
                          <Input
                            id="reg-country"
                            placeholder="e.g. India"
                            value={regCountry}
                            onChange={(e) => setRegCountry(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-state">State *</Label>
                          <Input
                            id="reg-state"
                            placeholder="e.g. Maharashtra"
                            value={regState}
                            onChange={(e) => setRegState(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-city">City *</Label>
                          <Input
                            id="reg-city"
                            placeholder="e.g. Mumbai"
                            value={regCity}
                            onChange={(e) => setRegCity(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-education">Education Level *</Label>
                          <select
                            id="reg-education"
                            value={regEducation}
                            onChange={(e) => setRegEducation(e.target.value)}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">Select education level</option>
                            <option value="10th">Class 10 (Matriculation)</option>
                            <option value="12th">Class 12 (Intermediate)</option>
                            <option value="ug">Undergraduate (B.A., B.Sc., B.Com, B.Tech)</option>
                            <option value="pg">Postgraduate (M.A., M.Sc., M.Com, M.Tech)</option>
                            <option value="diploma">Diploma</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-stream">Stream (Optional)</Label>
                          <select
                            id="reg-stream"
                            value={regStream}
                            onChange={(e) => setRegStream(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">Select stream (optional)</option>
                            <option value="science">Science (PCM/PCB)</option>
                            <option value="commerce">Commerce</option>
                            <option value="arts">Arts/Humanities</option>
                            <option value="vocational">Vocational</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <Button
                          type="submit"
                          disabled={regLoading}
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all"
                        >
                          {regLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Registering...
                            </>
                          ) : (
                            "Register"
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                        className="text-center text-lg tracking-widest"
                        autoFocus
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-sm text-muted-foreground hover:text-teal-600 w-full text-center"
                    >
                      Back to login/register
                    </button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      
      <section className="relative pt-0 pb-24 md:pt-0 md:pb-32 overflow-hidden">
        <div className="gradient-hero absolute inset-0 -z-10" />

        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-slate-900 dark:text-white space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-teal-500/10 dark:bg-white/10 backdrop-blur-md border border-teal-500/20 dark:border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-teal-800 dark:text-white">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                AI-Powered Career Guidance
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Your Digital Mentor for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-500 dark:from-amber-400 dark:to-amber-600">Career Success</span>
              </h1>
              <p className="text-slate-700 dark:text-white/90 text-xl leading-relaxed max-w-lg">
                Sarthi helps school and college students discover the right
                career path, find scholarships, explore internships, and get
                AI-powered guidance — all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setLoginOpen(true)}
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-base px-8 py-3 rounded-lg shadow-lg transition-all"
                >
                  Get Started Free
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
              </div>
              <p className="text-slate-500 dark:text-white/60 text-sm font-medium">
                Secure login with email OTP · No password needed
              </p>
            </div>
            <div className="hidden md:block animate-float">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-amber-500 rounded-2xl blur opacity-30" />
                <img
                  src="/assets/images/sarthi-dashboard.png"
                  alt="Sarthi Dashboard"
                  className="relative rounded-2xl shadow-2xl w-full object-cover border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From career discovery to skill building, Sarthi is your all-in-one
            educational companion.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-xl p-6 card-hover"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}
              >
                {feature.icon}
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center glass-card rounded-2xl p-10">
          <GraduationCap className="h-12 w-12 text-teal-600 mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
            Ready to Find Your Path?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of students who have discovered their ideal career
            with Sarthi.
          </p>
          <Button
            onClick={() => setLoginOpen(true)}
            size="lg"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-all"
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 text-center text-sm text-muted-foreground">
        <p>
          Built with <span className="text-red-500">♥</span> by Sarthi · ©{" "}
          {new Date().getFullYear()} Sarthi
        </p>
      </footer>
    </div>
  );
}
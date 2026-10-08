import { useMemo, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { FiAlertCircle, FiArrowLeft, FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { loginSchema, passwordChecks, signupSchema, type LoginValues, type SignupValues } from "../../../../lib/auth-schema";
import BrandPanel, { BrandLogo } from "../components/BrandPanel";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";
import useSocialProviders from "../../hooks/ui/useSocialProviders";




type Provider = "google" | "github" | "apple";
type View = "providers" | "email";
type Mode = "login" | "signup";

/* One shape for both modes. Login simply ignores the extra fields. */
type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

const defaultValues: FormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};


const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));


async function loginWithEmail(values: LoginValues) {
  await wait(900);
  console.log("login", values.email);
}
async function signupWithEmail(values: SignupValues) {
  await wait(900);
  console.log("signup", values.email);
}

export default function AuthPage() {

  const [view, setView] = useState<View>("providers");

  const [mode, setMode] = useState<Mode>("login");

  const [pending, setPending] = useState<Provider | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);

  const isLogin = mode === "login";

  // The schema changes with the mode, so the resolver does too.
  const resolver = useMemo(
    () => zodResolver(isLogin ? loginSchema : signupSchema) as unknown as Resolver<FormValues>,
    [isLogin],
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver, mode: "onTouched", defaultValues });

  const password = watch("password");

  const resetForm = () => {
    reset(defaultValues);
    setServerError(null);
    setShowPassword(false);
  };

  const switchMode = () => {
    setMode(isLogin ? "signup" : "login");
    resetForm();
  };


  const {handleSocialAuth,isPending} = useSocialProviders();

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      if (isLogin) await loginWithEmail(values);
      else await signupWithEmail(values);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Try again.";
      if (!isLogin && /already (exists|registered)/i.test(message)) {
        setError("email", { message: "An account with this email already exists." });
      } else {
        setServerError(message);
      }
    }
  });

  return (
    <main className="auth-layout">
      <BrandPanel />

      <div className="auth-shell">
        <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-mobile-brand">
          <BrandLogo />
        </div>

        {view === "email" && (
          <button
            type="button"
            className="btn btn-ghost btn-sm auth-back"
            onClick={() => {
              setView("providers");
              resetForm();
            }}
          >
            <FiArrowLeft />
            All sign-in options
          </button>
        )}

        <header>
          <h1 id="auth-title" className="auth-title">
            {view === "providers"
              ? "Welcome to CortexAI"
              : isLogin
                ? "Log in with email"
                : "Create your account"}
          </h1>
          <p className="auth-subtitle">
            {view === "providers"
              ? "Log in or sign up to continue."
              : isLogin
                ? "Enter your email and password."
                : "Use an email and a strong password."}
          </p>
        </header>

        {view === "providers" ? (
          <div className="stack-sm">
            <button className="btn btn-provider btn-lg btn-block" onClick={() => handleSocialAuth("google")} disabled={isPending}>
              {pending === "google" ? <span className="spinner" /> : <FcGoogle size={18} />}
              Continue with Google
            </button>
            <button className="btn btn-provider btn-lg btn-block" onClick={() => handleSocialAuth("github")} disabled={isPending}>
              {pending === "github" ? <span className="spinner" /> : <FaGithub size={18}  />}
              Continue with Github
            </button>
            <button className="btn btn-provider btn-lg btn-block" onClick={() => handleSocialAuth("apple")} disabled={isPending}>
              {pending === "apple" ? <span className="spinner" /> : <FaApple size={18} />}
              Continue with Apple
            </button>

            <div className="auth-divider" role="separator">or</div>

            <button className="btn btn-primary btn-lg btn-block" onClick={() => setView("email")} disabled={isPending}>
              <FiMail size={18} />
              Continue with email
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={onSubmit} noValidate className="stack" aria-label={isLogin ? "Log in" : "Sign up"}>
              {serverError && (
                <div className="alert alert-danger" role="alert">
                  <FiAlertCircle size={16} />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Email — both modes */}
              <div className="field">
                <label className="field-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  placeholder="name@example.com"
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  autoFocus
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                />
                {errors.email && <p id="email-error" className="field-error" role="alert">{errors.email.message}</p>}
              </div>

              {/* Password — both modes */}
              <div className="field">
                <label className="field-label" htmlFor="password">Password</label>
                <div className="input-wrap">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="input has-action"
                    placeholder={isLogin ? "Your password" : "Create a password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    aria-invalid={errors.password ? true : undefined}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="input-action"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                {errors.password && <p id="password-error" className="field-error" role="alert">{errors.password.message}</p>}

                {/* Sign-up only: live requirements */}
                {!isLogin && password && (
                  <ul className="strength-list" aria-label="Password requirements">
                    {passwordChecks.map((c) => (
                      <li key={c.id} className={c.test(password) ? "is-met" : ""}>{c.label}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Sign-up only: confirm password */}
              {!isLogin && (
                <div className="field">
                  <label className="field-label" htmlFor="confirmPassword">Confirm password</label>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    className="input"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    aria-invalid={errors.confirmPassword ? true : undefined}
                    aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && <p id="confirm-error" className="field-error" role="alert">{errors.confirmPassword.message}</p>}
                </div>
              )}

              {/* Sign-up only: terms */}
              {!isLogin && (
                <div className="field">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      aria-invalid={errors.acceptTerms ? true : undefined}
                      aria-describedby={errors.acceptTerms ? "terms-error" : undefined}
                      {...register("acceptTerms")}
                    />
                    <span>I agree to the <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.</span>
                  </label>
                  {errors.acceptTerms && <p id="terms-error" className="field-error" role="alert">{errors.acceptTerms.message}</p>}
                </div>
              )}

              {/* Login only: forgot password */}
              {isLogin && (
                <div className="row-between">
                  <span />
                  <Link to="/forgot-password" className="text-sm-link">Forgot password?</Link>
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={isSubmitting}>
                {isSubmitting && <span className="spinner spinner-on-accent" />}
                {isSubmitting
                  ? isLogin ? "Logging in…" : "Creating account…"
                  : isLogin ? "Log in" : "Create account"}
              </button>
            </form>

            <p className="auth-switch">
              {isLogin ? "New to CortexAI?" : "Already have an account?"}{" "}
              <button type="button" className="link-button" onClick={switchMode}>
                {isLogin ? "Create an account" : "Log in"}
              </button>
            </p>
          </>
        )}

        {view === "providers" && (
          <p className="auth-footer">
            By continuing, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
          </p>
        )}
      </section>
      </div>
    </main>
  );
}
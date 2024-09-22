import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from '../firebase/auth-config';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type SetErrorFunction = (error: string) => void;
type SetIsLoadingFunction = (isLoading: boolean) => void;

export async function handleSubmit(
  email: string,
  password: string,
  setError: SetErrorFunction,
  setIsLoading: SetIsLoadingFunction,
  router: AppRouterInstance
): Promise<void> {
  setError("");
  setIsLoading(true);

  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);

    if (email) {
      const response: Response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userCredential.user.uid,
          email: userCredential.user.email,
        }),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        console.error("Login API request failed:", await response.text());
        setError("Login API request failed.");
      }
    }
  } catch (authError) {
    console.error('Authentication error:', authError);
    setError("Invalid email or password.");
  } finally {
    setIsLoading(false);
  }
}
"use client"
import { useLoginForm } from "@/hooks/use-login-form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Home } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { emailRef, passwordRef, error, isLoading, onSubmit, handleInputChange } = useLoginForm();

  return (
  <div className="">
     <Button variant="link" className="m-2" aria-label="Home">
       <Link href="/"> <Home className="w-5 h-5"/> </Link>
      </Button>
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  ref={emailRef}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  ref={passwordRef}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isLoading} aria-label="Sign In">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Card>
    </div>
    </div>
  );
}
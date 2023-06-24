import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    try {
      setIsAuthenticating(true);
      const token = await createUser(email, password);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Sign up Unsuccessful",
        "Unable to register user. Please try again."
      );
      setIsAuthenticating(false);      
    }

  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;

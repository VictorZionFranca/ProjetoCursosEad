import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";

// Registrar novo usuário com nome
export async function signup(email: string, password: string, nome: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Adiciona o nome no perfil do usuário
    await updateProfile(userCredential.user, {
      displayName: nome,
    });

    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Login
export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

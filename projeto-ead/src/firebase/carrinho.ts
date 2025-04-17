import { db } from "./config";
import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";

// Adicionar curso ao carrinho
export const adicionarAoCarrinho = async (userId: string, cursoId: string, cursoData: any) => {
  const ref = doc(db, "Users", userId, "carrinho", cursoId);
  await setDoc(ref, cursoData);
};

// Remover curso do carrinho
export const removerDoCarrinho = async (userId: string, cursoId: string) => {
  const ref = doc(db, "Users", userId, "carrinho", cursoId);
  await deleteDoc(ref);
};

// Listar cursos no carrinho
export const listarCarrinho = async (userId: string) => {
  const snapshot = await getDocs(collection(db, "Users", userId, "carrinho"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

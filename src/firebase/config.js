import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "mawazeen-alsharq.firebaseapp.com",
  projectId: "mawazeen-alsharq",
  storageBucket: "mawazeen-alsharq.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id-here"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
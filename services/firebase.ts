import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.config';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  createdAt: Date;
}

export interface EmployeeData {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  startDate: string;
  salary: string;
  phoneNumber: string;
  createdAt: Date;
}

// Authentication functions
export const signUpUser = async (email: string, password: string, userData: Omit<UserData, 'email' | 'createdAt'>) => {
  console.log('🔄 Starting signup process for:', email);
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('✅ User account created successfully:', user.uid);
    
    // Prepare user data for Firestore
    const userDocData = {
      ...userData,
      email,
      createdAt: new Date(),
    };
    console.log('📝 Preparing to save user data:', userDocData);
    
    // Store additional user data in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, userDocData);
    console.log('✅ User data saved to Firestore successfully');
    
    return { success: true, user };
  } catch (error: any) {
    console.error('❌ SignUp error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    return { success: false, error: error.message };
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Employee data functions
export const addEmployee = async (employeeData: Omit<EmployeeData, 'createdAt'>) => {
  console.log('🔄 Adding employee data:', employeeData);
  try {
    const docRef = await addDoc(collection(db, 'employees'), {
      ...employeeData,
      createdAt: new Date(),
    });
    console.log('✅ Employee added successfully with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('❌ Add employee error:', error);
    return { success: false, error: error.message };
  }
};

export const getEmployees = async () => {
  try {
    const q = query(collection(db, 'employees'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const employees: (EmployeeData & { id: string })[] = [];
    
    querySnapshot.forEach((doc) => {
      employees.push({ id: doc.id, ...doc.data() } as EmployeeData & { id: string });
    });
    
    return { success: true, employees };
  } catch (error: any) {
    console.error('❌ Get employees error:', error);
    return { success: false, error: error.message };
  }
};
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

// form values
interface SignInFormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

// form validation schema
const SignInSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain letters")
    .matches(/\d/, "Password must contain numbers"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Passwords must match"
  ),
});

const SignUp = () => {
  const router = useRouter();

  const handleLogin = (values: SignInFormValues) => {
    console.log("Login values:", values);
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Formik<SignInFormValues>
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={styles.linkText}>Back To Landing Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    color: "#2563eb",
    marginTop: 20,
  },
});

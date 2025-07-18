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

interface SignInFormValues {
  username: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const SignIn = () => {
  const router = useRouter();

  const handleLogin = (values: SignInFormValues) => {
    console.log("Login values:", values);
    router.push("/employee");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Formik<SignInFormValues>
        initialValues={{
          username: "",
          password: "",
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
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Sign In</Text>
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

export default SignIn;

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

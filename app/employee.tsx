import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

// form values
interface EmployeeFormValues {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  startDate: string;
  salary: string;
  phoneNumber: string;
}

// form validation schema
const EmployeeSchema = Yup.object().shape({
  employeeId: Yup.string()
    .required("Employee ID is required")
    .length(6, "Employee ID must be exactly 6 characters"),
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  department: Yup.string()
    .required("Department is required")
    .min(2, "Department must be at least 2 characters"),
  position: Yup.string()
    .required("Position is required")
    .min(2, "Position must be at least 2 characters"),
  startDate: Yup.string()
    .required("Start date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format"),
  salary: Yup.number()
    .required("Salary is required")
    .positive("Salary must be a positive number")
    .min(1000, "Salary must be at least $1,000"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
});

const Employee = () => {
  const router = useRouter();

  const handleSubmit = (values: EmployeeFormValues, { resetForm }: any) => {
    console.log("Employee values:", values);
    // would be saved to the database here if it was implemented
    alert("Employee information saved successfully!");
    resetForm();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Employee Information</Text>
      <Formik<EmployeeFormValues>
        initialValues={{
          employeeId: "",
          firstName: "",
          lastName: "",
          email: "",
          department: "",
          position: "",
          startDate: "",
          salary: "",
          phoneNumber: "",
        }}
        validationSchema={EmployeeSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Employee ID"
              onChangeText={handleChange("employeeId")}
              onBlur={handleBlur("employeeId")}
              value={values.employeeId}
            />
            {touched.employeeId && errors.employeeId && (
              <Text style={styles.error}>{errors.employeeId}</Text>
            )}

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
              placeholder="Department"
              onChangeText={handleChange("department")}
              onBlur={handleBlur("department")}
              value={values.department}
            />
            {touched.department && errors.department && (
              <Text style={styles.error}>{errors.department}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Position"
              onChangeText={handleChange("position")}
              onBlur={handleBlur("position")}
              value={values.position}
            />
            {touched.position && errors.position && (
              <Text style={styles.error}>{errors.position}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Start Date (YYYY-MM-DD)"
              onChangeText={handleChange("startDate")}
              onBlur={handleBlur("startDate")}
              value={values.startDate}
            />
            {touched.startDate && errors.startDate && (
              <Text style={styles.error}>{errors.startDate}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Annual Salary"
              keyboardType="numeric"
              onChangeText={handleChange("salary")}
              onBlur={handleBlur("salary")}
              value={values.salary}
            />
            {touched.salary && errors.salary && (
              <Text style={styles.error}>{errors.salary}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Phone Number (10 digits)"
              keyboardType="phone-pad"
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            )}

            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Save Employee</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/ViewEmployees")}
              style={styles.viewButton}
            >
              <Text style={styles.viewButtonText}>View Employees</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={styles.linkText}>Back To Landing Page</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Employee;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
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
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  submitButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  viewButton: {
    backgroundColor: "#10b981",
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    color: "#2563eb",
    marginTop: 20,
  },
});

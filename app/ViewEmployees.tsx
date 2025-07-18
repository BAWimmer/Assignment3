import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// unnecessary page, but created for practice

interface Employee {
  id: string;
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

// sample employee data
const sampleEmployees: Employee[] = [
  {
    id: "1",
    employeeId: "EMP001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    position: "Software Developer",
    startDate: "2023-01-15",
    salary: "75000",
    phoneNumber: "5551234567",
  },
  {
    id: "2",
    employeeId: "EMP002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    startDate: "2022-06-20",
    salary: "68000",
    phoneNumber: "5559876543",
  },
  {
    id: "3",
    employeeId: "EMP003",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@company.com",
    department: "Sales",
    position: "Sales Representative",
    startDate: "2023-03-10",
    salary: "55000",
    phoneNumber: "5555551234",
  },
];

const ViewEmployees = () => {
  const router = useRouter();

  const renderEmployeeCard = ({ item }: { item: Employee }) => (
    <View style={styles.employeeCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.employeeName}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.employeeId}>ID: {item.employeeId}</Text>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{item.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Department:</Text>
          <Text style={styles.value}>{item.department}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Position:</Text>
          <Text style={styles.value}>{item.position}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.value}>{item.startDate}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Salary:</Text>
          <Text style={styles.value}>
            ${parseInt(item.salary).toLocaleString()}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>
            {item.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Directory</Text>

      <Text style={styles.subtitle}>
        Total Employees: {sampleEmployees.length}
      </Text>

      <FlatList
        data={sampleEmployees}
        renderItem={renderEmployeeCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/employee")}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add New Employee</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={styles.homeButton}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewEmployees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  employeeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 12,
    marginBottom: 12,
  },
  employeeName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  employeeId: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  cardContent: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: "#6b7280",
    flex: 2,
    textAlign: "right",
  },
  buttonContainer: {
    gap: 12,
    paddingTop: 20,
  },
  addButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  homeButton: {
    backgroundColor: "#6b7280",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

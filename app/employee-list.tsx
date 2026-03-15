import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

type WorkStatus = 'pending' | 'cancelled' | 'completed';

type EmployeeRow = {
  id: string;
  name: string;
  email: string;
  salary: string;
  address: string;
  gender: string;
  phone: string;
  status: WorkStatus;
};

const initialEmployees: EmployeeRow[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@office.com',
    salary: '₹80,000',
    address: 'Mumbai, MH',
    gender: 'Male',
    phone: '+91 98765 10001',
    status: 'pending',
  },
  {
    id: '2',
    name: 'Isha Verma',
    email: 'isha.verma@office.com',
    salary: '₹72,500',
    address: 'Pune, MH',
    gender: 'Female',
    phone: '+91 98765 10002',
    status: 'completed',
  },
  {
    id: '3',
    name: 'Karan Mehta',
    email: 'karan.mehta@office.com',
    salary: '₹65,000',
    address: 'Delhi, DL',
    gender: 'Male',
    phone: '+91 98765 10003',
    status: 'cancelled',
  },
  {
    id: '4',
    name: 'Megha Singh',
    email: 'megha.singh@office.com',
    salary: '₹77,000',
    address: 'Bengaluru, KA',
    gender: 'Female',
    phone: '+91 98765 10004',
    status: 'pending',
  },
  {
    id: '5',
    name: 'Rohan Das',
    email: 'rohan.das@office.com',
    salary: '₹68,500',
    address: 'Kolkata, WB',
    gender: 'Male',
    phone: '+91 98765 10005',
    status: 'completed',
  },
];

// --- Dropdown component for status selection ---
type StatusDropdownProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (value: WorkStatus) => void;
  currentStatus: WorkStatus;
};

const statuses: WorkStatus[] = ['pending', 'cancelled', 'completed'];

function StatusDropdown({ visible, onClose, onSelect, currentStatus }: StatusDropdownProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.dropdownOverlay} onPress={onClose}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>Select Status</Text>
          {statuses.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.dropdownOption,
                currentStatus === status && styles.dropdownOptionSelected,
              ]}
              onPress={() => {
                onSelect(status);
                onClose();
              }}
            >
              <Text
                style={[
                  styles.dropdownOptionText,
                  currentStatus === status && styles.dropdownOptionTextSelected,
                ]}
              >
                {statusLabels[status]}
              </Text>
              {currentStatus === status && (
                <Ionicons name="checkmark" size={18} color="#3578e5" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

export default function EmployeeList() {
  const { user } = useAuth();
  const router = useRouter();
  const [employees, setEmployees] = useState<EmployeeRow[]>(initialEmployees);

  const [dropdownOpenFor, setDropdownOpenFor] = useState<string | null>(null);

  const canEdit = useMemo(
    () => user?.role === 'Admin' || user?.role === 'Manager',
    [user?.role]
  );

  const handleStatusChange = (id: string, status: WorkStatus) => {
    if (!canEdit) return;
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === id ? { ...employee, status } : employee
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={22} color="#000000" />
        </TouchableOpacity> */}
        <Text style={styles.title}>Employee List</Text>
        <Text style={styles.subtitle}>
          Review employee details and update work status.
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell, { flex: 0.5 }]}>
              S.No
            </Text>
            <Text style={[styles.cell, styles.headerCell]}>Name</Text>
            <Text style={[styles.cell, styles.headerCell]}>Email</Text>
            <Text style={[styles.cell, styles.headerCell]}>Salary</Text>
            <Text style={[styles.cell, styles.headerCell]}>Address</Text>
            <Text style={[styles.cell, styles.headerCell]}>Gender</Text>
            <Text style={[styles.cell, styles.headerCell]}>Phone Number</Text>
            <Text style={[styles.cell, styles.headerCell]}>Work</Text>
          </View>

          {employees.map((employee, index) => (
            <View key={employee.id} style={[styles.row, styles.dataRow]}>
              <Text style={[styles.cell, { flex: 0.5 }]}>{index + 1}</Text>
              <Text style={styles.cell}>{employee.name}</Text>
              <Text style={styles.cell}>{employee.email}</Text>
              <Text style={styles.cell}>{employee.salary}</Text>
              <Text style={styles.cell}>{employee.address}</Text>
              <Text style={styles.cell}>{employee.gender}</Text>
              <Text style={styles.cell}>{employee.phone}</Text>
              <View style={[styles.cell, styles.statusCell]}>
                {/* Status badge */}
                <View
                  style={[
                    styles.statusBadge,
                    statusStyles[employee.status].badge,
                  ]}
                >
                  <Text style={statusStyles[employee.status].text}>
                    {statusLabels[employee.status]}
                  </Text>
                </View>
                {/* Dropdown for work status */}
                {canEdit && (
                  <>
                    <TouchableOpacity
                      style={styles.statusDropdownButton}
                      onPress={() =>
                        setDropdownOpenFor(employee.id)
                      }
                      activeOpacity={0.7}
                    >
                      <Text style={styles.statusDropdownButtonText}>
                        Change Status
                      </Text>
                      <Ionicons
                        name={
                          dropdownOpenFor === employee.id
                            ? 'chevron-up'
                            : 'chevron-down'
                        }
                        size={16}
                        color="#666"
                        style={{ marginLeft: 3, marginTop: 1 }}
                      />
                    </TouchableOpacity>
                    <StatusDropdown
                      visible={dropdownOpenFor === employee.id}
                      currentStatus={employee.status}
                      onSelect={(val) => handleStatusChange(employee.id, val)}
                      onClose={() => setDropdownOpenFor(null)}
                    />
                  </>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const statusLabels: Record<WorkStatus, string> = {
  pending: 'Pending',
  cancelled: 'Cancelled',
  completed: 'Completed',
};

const statusStyles: Record<
  WorkStatus,
  { badge: object; text: object }
> = {
  pending: {
    badge: { backgroundColor: '#FFF7E6', borderColor: '#FFB020' },
    text: { color: '#C77700', fontWeight: '600' },
  },
  cancelled: {
    badge: { backgroundColor: '#FFEAEA', borderColor: '#FF3B30' },
    text: { color: '#C1271A', fontWeight: '600' },
  },
  completed: {
    badge: { backgroundColor: '#E8F9F0', borderColor: '#34C759' },
    text: { color: '#1E9B46', fontWeight: '600' },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 6,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  table: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    minWidth: 900,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 12,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#F3F4F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  dataRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  cell: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#111111',
  },
  headerCell: {
    fontWeight: '700',
    color: '#555555',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    fontSize: 12,
  },
  statusCell: {
    flexDirection: 'column',
    gap: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F3F3',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  statusButtonActive: {
    backgroundColor: '#E0ECFF',
    borderColor: '#5A8CFF',
  },
  statusButtonText: {
    fontSize: 12,
    color: '#1F1F1F',
    fontWeight: '600',
  },
  statusDropdownButton: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: 'flex-start',
    minWidth: 115,
  },
  statusDropdownButtonText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '600',
  },
  dropdownOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30,30,30,0.11)',
  },
  dropdownContainer: {
    width: 230,
    backgroundColor: '#fff',
    borderRadius: 11,
    paddingVertical: 15,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: '#E3E9F3',
  },
  dropdownTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 9,
    letterSpacing: 0.2,
    color: '#213146',
  },
  dropdownOption: {
    paddingVertical: 8,
    paddingHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 2,
  },
  dropdownOptionSelected: {
    backgroundColor: '#F3F7FB',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#222B3C',
    fontWeight: '600',
    flex: 1,
    letterSpacing: 0.2,
  },
  dropdownOptionTextSelected: {
    color: '#3578e5',
  },
});
import ClientCard from '@/components/list/ClientCard';
import EmployeeCard from '@/components/list/EmployeeCard';
import { useAuth } from '@/context/AuthContext';
import { dummyClients, dummyEmployees } from '@/data/dummpyData';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type ListTab = 'employees' | 'clients';

export default function List() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams<{ tab?: string }>();
  const initialTab = (params.tab === 'clients' ? 'clients' : 'employees') as ListTab;
  const [activeTab, setActiveTab] = useState<ListTab>(initialTab);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (params.tab === 'clients' || params.tab === 'employees') {
      setActiveTab(params.tab as ListTab);
    }
  }, [params.tab]);

  // Filter logic for search
  const filteredEmployees = useMemo(() => {
    if (!search.trim()) return dummyEmployees;
    const q = search.toLowerCase();
    return dummyEmployees.filter(emp =>
      emp.name.toLowerCase().includes(q)
      || emp.email?.toLowerCase().includes(q)
      || emp.phone?.toString().includes(q)
    );
  }, [search]);

  const filteredClients = useMemo(() => {
    if (!search.trim()) return dummyClients;
    const q = search.toLowerCase();
    return dummyClients.filter(client =>
      client.name.toLowerCase().includes(q)
      || client.email?.toLowerCase().includes(q)
      || client.phone?.toString().includes(q)
    );
  }, [search]);

  // Check if user has access
  const hasAccess = user?.role === 'Admin' || user?.role === 'Manager';

  if (!hasAccess) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Lists</Text>
        </View>
        <View style={styles.accessDenied}>
          <Text style={styles.accessDeniedIcon}>🔒</Text>
          <Text style={styles.accessDeniedTitle}>Access Denied</Text>
          <Text style={styles.accessDeniedText}>
            Only Admins and Managers can access this section
          </Text>
        </View>
      </View>
    );
  }

  const handleEmployeePress = (employeeId: string) => {
    router.push(`/employee-detail?id=${employeeId}`);
  };

  const handleClientPress = (clientId: string) => {
    router.push(`/client-detail?id=${clientId}`);
  };

  const handleAssignTask = (employeeId: string, employeeName: string) => {
    router.push(`/assign-task?employeeId=${employeeId}&employeeName=${employeeName}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Lists</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${activeTab === 'employees' ? 'employees' : 'clients'}...`}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#a0a0a0"
          clearButtonMode="while-editing"
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'employees' && styles.tabActive]}
          onPress={() => setActiveTab('employees')}
        >
          <Text style={[styles.tabText, activeTab === 'employees' && styles.tabTextActive]}>
            Employees
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'clients' && styles.tabActive]}
          onPress={() => setActiveTab('clients')}
        >
          <Text style={[styles.tabText, activeTab === 'clients' && styles.tabTextActive]}>
            Clients
          </Text>
        </TouchableOpacity>
      </View>

      {/* List Content */}
      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {activeTab === 'employees' ? (
          <>
            <Text style={styles.countText}>{filteredEmployees.length} Employees</Text>
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onPress={() => handleEmployeePress(employee.id)}
                onAssignTask={() => handleAssignTask(employee.id, employee.name)}
                showAssignButton={true}
              />
            ))}
          </>
        ) : (
          <>
            <Text style={styles.countText}>{filteredClients.length} Clients</Text>
            {filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onPress={() => handleClientPress(client.id)}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  // --- Search Bar styles ---
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 2,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    height: 42,
    borderRadius: 9,
    backgroundColor: '#F1F1F4',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#222',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  //-------------------------
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#000000',
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  countText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    fontWeight: '500',
  },
  accessDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  accessDeniedIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  accessDeniedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  accessDeniedText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
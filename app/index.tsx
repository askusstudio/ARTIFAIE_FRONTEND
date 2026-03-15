import { useAuth } from '@/context/AuthContext';
import { dummyUsers } from '@/data/dummpyData';
import { UserRole } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Admin');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const roles: UserRole[] = ['Admin', 'Manager', 'Employee'];

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // Find user with matching credentials, regardless of the role selected in the UI
    const user = dummyUsers.find(
      (u) =>
        u.email.toLowerCase() === trimmedEmail &&
        u.password === trimmedPassword
    );

    if (user) {
      // Sync the role state with the actual user role for consistency
      setRole(user.role);
      login(user);
      router.replace('/(tabs)/home');
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  const selectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setShowRoleModal(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Illustration */}
        {/* <View style={styles.illustrationContainer}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View> */}

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>

          {/* Role Selector */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Role</Text>
            <TouchableOpacity
              style={styles.roleSelector}
              onPress={() => setShowRoleModal(true)}
            >
              <Text style={styles.roleSelectorText}>{role}</Text>
              <Ionicons name="chevron-down" size={20} color="#666666" />
            </TouchableOpacity>
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#666666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Demo Credentials Helper */}
          <View style={styles.helperContainer}>
            <Text style={styles.helperTitle}>Demo Credentials:</Text>
            <Text style={styles.helperText}>Admin: admin@office.com / admin123</Text>
            <Text style={styles.helperText}>Manager: manager@office.com / manager123</Text>
            <Text style={styles.helperText}>Employee: employee@office.com / employee123</Text>
          </View>
        </View>

        {/* Role Selection Modal */}
        <Modal
          visible={showRoleModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowRoleModal(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowRoleModal(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Role</Text>
              {roles.map((roleOption) => (
                <TouchableOpacity
                  key={roleOption}
                  style={[
                    styles.roleOption,
                    role === roleOption && styles.roleOptionSelected,
                  ]}
                  onPress={() => selectRole(roleOption)}
                >
                  <Text style={[
                    styles.roleOptionText,
                    role === roleOption && styles.roleOptionTextSelected,
                  ]}>
                    {roleOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  illustration: {
    width: 250,
    height: 250,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000000',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333',
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingRight: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  roleSelector: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roleSelectorText: {
    fontSize: 16,
    color: '#000000',
  },
  loginButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  helperContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
  },
  helperTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333',
  },
  helperText: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  roleOption: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#F8F8F8',
  },
  roleOptionSelected: {
    backgroundColor: '#E8E4F3',
  },
  roleOptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
  },
  roleOptionTextSelected: {
    fontWeight: '600',
    color: '#6B4EFF',
  },
});
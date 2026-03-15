import { dummyNotifications, dummyTasks } from '@/data/dummpyData';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import NotificationBadge from '../../components/common/NotificationBadge';
import QuickNotificationModal from '../../components/notification/QuickNotificationModal';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [tasks, setTasks] = useState(dummyTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [showQuickNotifications, setShowQuickNotifications] = useState(false);

  const getLast24HoursNotifications = () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return notifications.filter(
      (n) => new Date(n.createdAt) > twentyFourHoursAgo
    );
  };

  const getUnreadCount = () => {
    return getLast24HoursNotifications().filter((n) => !n.isRead).length;
  };

  const handleNotificationPress = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    ));
    Alert.alert('Notification', 'Notification details coming soon!');
  };

  const handleMarkAllAsRead = () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    setNotifications(notifications.map(n =>
      new Date(n.createdAt) > twentyFourHoursAgo ? { ...n, isRead: true } : n
    ));
  };

  // Dashboard stats
  const activeClients = 45;
  const invoicesDue = 3;
  const expiringLicenses = 5;

  // Filter options
  const filters = ['All', 'Active', 'Expiring', 'This Week', 'Last Month'];

  // Mock client data
  const clients = [
    {
      id: '1',
      companyName: 'Legal business',
      services: ['Tax consultancy', 'market research'],
      invoiceSent: '12-08-2025',
      payment: '12-08-2025',
    },
    {
      id: '2',
      companyName: 'Legal business',
      services: ['Tax consultancy', 'market research'],
      invoiceSent: '12-08-2025',
      payment: '12-08-2025',
    },
  ];

  // Handler to open client-detail page
  const handleClientPress = (clientId: string) => {
    router.push(`/client-detail?id=${clientId}`);
  };

  const pendingTasksCount = dummyTasks.filter(t => t.status === 'pending').length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greetingText}>Hi {user?.name || 'User'} 👋</Text>
            <Text style={styles.dashboardTitle}>Dashboard</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationIconTop}
            onPress={() => setShowQuickNotifications(true)}
          >
            <Ionicons name="notifications-outline" size={28} color="#000000" />
            <NotificationBadge count={getUnreadCount()} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search here"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterChip,
                filter === 'All' && styles.filterChipActive,
              ]}
              onPress={() => { }}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filter === 'All' && styles.filterChipTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#A7F3D0' }]}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitleColor}>Active Clients</Text>
              <Ionicons name="people-outline" size={22} color="#000" />
            </View>
            <Text style={styles.statValueStyle}>{activeClients}</Text>
            <Text style={styles.statSubtextStyle}>Total active instances</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#8ECAFF' }]}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitleColor}>Invoices Due</Text>
              <Ionicons name="receipt-outline" size={22} color="#000" />
            </View>
            <Text style={styles.statValueStyle}>3</Text>
            <Text style={styles.statSubtextStyle}>Total amount: ₹12K</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#FDE46E' }]}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitleColor}>Tasks Pending</Text>
              <Ionicons name="create-outline" size={22} color="#000" />
            </View>
            <Text style={styles.statValueStyle}>{pendingTasksCount}</Text>
            <Text style={styles.statSubtextStyle}>1 high priority item</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#FECACA' }]}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitleColor}>Expiring Licenses</Text>
              <Ionicons name="warning-outline" size={22} color="#000" />
            </View>
            <Text style={styles.statValueStyle}>{expiringLicenses}</Text>
            <Text style={styles.statSubtextStyle}>Expiring in next 30 days</Text>
          </View>
        </View>

        {/* Directories Section */}
        <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Directories</Text>

        <View style={styles.directoryGrid}>
          {/* Employee Card */}
          <TouchableOpacity
            style={styles.directoryCard}
            onPress={() => router.push('/list?tab=employees')}
          >
            <View style={[styles.directoryIconContainer, { backgroundColor: '#E8E4F3' }]}>
              <Ionicons name="people" size={24} color="#6B4EFF" />
            </View>
            <View style={styles.directoryInfo}>
              <Text style={styles.directoryTitle}>Employees</Text>
              <Text style={styles.directoryStats}>Total: 12 • Active: 8</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </TouchableOpacity>

          {/* Client Card */}
          <TouchableOpacity
            style={styles.directoryCard}
            onPress={() => router.push('/list?tab=clients')}
          >
            <View style={[styles.directoryIconContainer, { backgroundColor: '#E4F4E8' }]}>
              <Ionicons name="briefcase" size={24} color="#4CAF50" />
            </View>
            <View style={styles.directoryInfo}>
              <Text style={styles.directoryTitle}>Clients</Text>
              <Text style={styles.directoryStats}>Total: 45 • Active: 32</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </TouchableOpacity>

          {/* Invoice Card */}
          <TouchableOpacity
            style={styles.directoryCard}
            onPress={() => router.push('/invoices' as any)}
          >
            <View style={[styles.directoryIconContainer, { backgroundColor: '#FDECE8' }]}>
              <Ionicons name="receipt" size={24} color="#FF6B6B" />
            </View>
            <View style={styles.directoryInfo}>
              <Text style={styles.directoryTitle}>Invoices</Text>
              <Text style={styles.directoryStats}>Pending: 3 • Paid: 12</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Quick Notification Modal */}
      <QuickNotificationModal
        visible={showQuickNotifications}
        onClose={() => setShowQuickNotifications(false)}
        notifications={getLast24HoursNotifications()}
        onNotificationPress={handleNotificationPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  greetingText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
    marginBottom: 4,
  },
  dashboardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  notificationIconTop: {
    padding: 8,
    position: 'relative',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  filterScroll: {
    marginBottom: 16,
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#E8E4F3',
    borderColor: '#E8E4F3',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#6B4EFF',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  statTitleColor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    marginRight: 8,
  },
  statValueStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  statSubtextStyle: {
    fontSize: 12,
    color: '#333333',
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  clientCard: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  clientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8E4F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  clientAvatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B4EFF',
  },
  clientInfo: {
    flex: 1,
  },
  clientCompany: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  clientDetails: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 12,
  },
  clientServices: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 12,
    lineHeight: 20,
  },
  clientDates: {
    gap: 4,
  },
  clientDateLabel: {
    fontSize: 12,
    color: '#666666',
  },
  clientDate: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
  },
  directoryGrid: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  directoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
  },
  directoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  directoryInfo: {
    flex: 1,
  },
  directoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  directoryStats: {
    fontSize: 13,
    color: '#666666',
  },
});
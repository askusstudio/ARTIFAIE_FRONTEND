import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Client } from '../../types';
import Avatar from '../common/Avatar';

interface ClientCardProps {
  client: Client;
  onPress: () => void;
}

export default function ClientCard({ client, onPress }: ClientCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Avatar name={client.name} size={50} />
        <View style={styles.info}>
          <Text style={styles.name}>{client.name}</Text>
          <Text style={styles.company}>{client.company}</Text>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot, 
              { backgroundColor: client.status === 'active' ? '#34C759' : '#FF3B30' }
            ]} />
            <Text style={styles.statusText}>
              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#CCCCCC" />
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Ionicons name="briefcase-outline" size={16} color="#666666" />
          <Text style={styles.detailText}>{client.projectType}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="folder-open-outline" size={16} color="#666666" />
          <Text style={styles.detailText}>{client.totalProjects} Projects</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#666666',
  },
  details: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
});
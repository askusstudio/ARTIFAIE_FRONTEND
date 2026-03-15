import { Picker } from '@react-native-picker/picker';
import { Building, Calendar, Check, ChevronDown, ChevronUp, Clock, CreditCard, DollarSign, FileCheck, FileText, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface WorkflowStage {
  id: number;
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  status: 'completed' | 'in_progress' | 'pending' | 'cancelled';
  description: string;
  tasks: Task[];
}

interface StatusConfig {
  bg: string;
  text: string;
  label: string;
  dotColor: string;
}

interface ClientData {
  name: string;
  company: string;
  status: string;
  paymentStatus: string;
  workStatus: string;
  invoiceSentDate: string;
  deadlineDate: string;
  services: string[];
}

const ClientProfileScreen: React.FC = () => {
  const [expandedStage, setExpandedStage] = useState<number>(0);
  
  const [workflowStages, setWorkflowStages] = useState<WorkflowStage[]>([
    {
      id: 1,
      name: 'Incorporation',
      icon: Building,
      status: 'completed',
      description: 'Registering entity with state authorities.',
      tasks: [
        { id: 1, name: 'Name Reservation', completed: true },
        { id: 2, name: 'File Articles of Organization', completed: true }
      ]
    },
    {
      id: 2,
      name: 'Tax Registration',
      icon: FileCheck,
      status: 'in_progress',
      description: 'Setting up tax identification and registration.',
      tasks: [
        { id: 1, name: 'Apply for EIN', completed: true },
        { id: 2, name: 'State Tax Registration', completed: false }
      ]
    },
    {
      id: 3,
      name: 'Banking Setup',
      icon: CreditCard,
      status: 'pending',
      description: 'Opening business bank accounts and payment systems.',
      tasks: [
        { id: 1, name: 'Open Business Account', completed: false },
        { id: 2, name: 'Setup Payment Gateway', completed: false }
      ]
    }
  ]);

  const clientData: ClientData = {
    name: 'Rajesh Gupta',
    company: 'Tech Solution Pvt Ltd',
    status: 'Active',
    paymentStatus: 'Pending',
    workStatus: 'Pending',
    invoiceSentDate: '26 Oct 2024',
    deadlineDate: '30 Nov 2024',
    services: [
      'Incorporation',
      'Virtual CFO',
      'Accounting',
      'Tax Consult',
      'GT Filing',
      'HR/PRO'
    ]
  };

  const getStatusConfig = (status: WorkflowStage['status']): StatusConfig => {
    switch (status) {
      case 'completed':
        return { bg: '#dcfce7', text: '#16a34a', label: 'COMPLETED', dotColor: '#16a34a' };
      case 'in_progress':
        return { bg: '#dbeafe', text: '#2563eb', label: 'IN PROGRESS', dotColor: '#2563eb' };
      case 'pending':
        return { bg: '#f3f4f6', text: '#6b7280', label: 'PENDING', dotColor: '#d1d5db' };
      case 'cancelled':
        return { bg: '#fee2e2', text: '#dc2626', label: 'CANCELLED', dotColor: '#dc2626' };
      default:
        return { bg: '#f3f4f6', text: '#6b7280', label: 'PENDING', dotColor: '#d1d5db' };
    }
  };

  const handleStatusChange = (stageId: number, newStatus: WorkflowStage['status']): void => {
    setWorkflowStages(prev =>
      prev.map(stage =>
        stage.id === stageId ? { ...stage, status: newStatus } : stage
      )
    );
  };

  const toggleExpand = (index: number): void => {
    setExpandedStage(expandedStage === index ? -1 : index);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User size={40} color="#3b82f6" />
        </View>
        <Text style={styles.name}>{clientData.name}</Text>
        <Text style={styles.company}>{clientData.company}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{clientData.status}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Client Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Client Details</Text>
          
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <DollarSign size={18} color="#6b7280" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Payment Status</Text>
                <Text style={[styles.detailValue, styles.pendingText]}>
                  {clientData.paymentStatus}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <Clock size={18} color="#6b7280" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Work Status</Text>
                <Text style={[styles.detailValue, styles.pendingText]}>
                  {clientData.workStatus}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <FileText size={18} color="#6b7280" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Invoice Sent Date</Text>
                <Text style={styles.detailValue}>{clientData.invoiceSentDate}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <Calendar size={18} color="#6b7280" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Deadline Date</Text>
                <Text style={styles.detailValue}>{clientData.deadlineDate}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Opted Services Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Opted Services</Text>
          <View style={styles.servicesContainer}>
            {clientData.services.map((service, index) => (
              <View key={index} style={styles.serviceChip}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Workflow Progress Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Workflow Progress</Text>
          
          <View style={styles.workflowContainer}>
            {workflowStages.map((stage, index) => {
              const config = getStatusConfig(stage.status);
              const Icon = stage.icon;
              const isExpanded = expandedStage === index;
              
              return (
                <View key={stage.id} style={styles.workflowStage}>
                  {/* Timeline Dot */}
                  <View style={styles.timelineContainer}>
                    <View style={[styles.timelineDot, { backgroundColor: config.dotColor }]} />
                    {index < workflowStages.length - 1 && (
                      <View style={styles.timelineLine} />
                    )}
                  </View>

                  {/* Stage Card */}
                  <View style={styles.stageCard}>
                    <TouchableOpacity 
                      style={styles.stageHeader}
                      onPress={() => toggleExpand(index)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.stageLeft}>
                        <View style={styles.stageIcon}>
                          <Icon size={24} color="#374151" />
                        </View>
                        <View style={styles.stageInfo}>
                          <Text style={styles.stageName}>{stage.name}</Text>
                          <View style={[styles.statusPickerContainer, { backgroundColor: config.bg }]}>
                            <Picker
                              selectedValue={stage.status}
                              onValueChange={(itemValue) => handleStatusChange(stage.id, itemValue as WorkflowStage['status'])}
                              style={styles.statusPicker}
                              dropdownIconColor={config.text}
                            >
                              <Picker.Item label="PENDING" value="pending" />
                              <Picker.Item label="IN PROGRESS" value="in_progress" />
                              <Picker.Item label="COMPLETED" value="completed" />
                              <Picker.Item label="CANCELLED" value="cancelled" />
                            </Picker>
                          </View>
                        </View>
                      </View>
                      <View style={styles.expandIcon}>
                        {isExpanded ? <ChevronUp size={20} color="#6b7280" /> : <ChevronDown size={20} color="#6b7280" />}
                      </View>
                    </TouchableOpacity>

                    {isExpanded && (
                      <View style={styles.stageDetails}>
                        <Text style={styles.stageDescription}>{stage.description}</Text>
                        
                        <View style={styles.tasksSection}>
                          <Text style={styles.tasksTitle}>TASKS</Text>
                          {stage.tasks.map(task => (
                            <View key={task.id} style={styles.taskItem}>
                              <View style={[
                                styles.taskCheckbox,
                                { backgroundColor: task.completed ? '#16a34a' : '#e5e7eb' }
                              ]}>
                                {task.completed && <Check size={14} color="white" />}
                              </View>
                              <Text style={[
                                styles.taskName,
                                { 
                                  textDecorationLine: task.completed ? 'line-through' : 'none',
                                  color: task.completed ? '#9ca3af' : '#374151'
                                }
                              ]}>
                                {task.name}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  company: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#16a34a',
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  detailsGrid: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  pendingText: {
    color: '#f59e0b',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  serviceChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  serviceText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  workflowContainer: {
    position: 'relative',
  },
  workflowStage: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  timelineContainer: {
    alignItems: 'center',
    paddingTop: 8,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#e5e7eb',
    minHeight: 60,
    marginTop: 8,
  },
  stageCard: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    overflow: 'hidden',
  },
  stageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  stageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  stageIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageInfo: {
    flex: 1,
  },
  stageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  statusPickerContainer: {
    borderRadius: 6,
    overflow: 'hidden',
    height: 28,
    justifyContent: 'center',
  },
  statusPicker: {
    height: 28,
    fontSize: 12,
    fontWeight: '600',
  },
  expandIcon: {
    marginLeft: 8,
  },
  stageDetails: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingLeft: 76,
  },
  stageDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 21,
  },
  tasksSection: {
    marginTop: 16,
  },
  tasksTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  taskCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskName: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ClientProfileScreen;
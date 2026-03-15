import { Picker } from '@react-native-picker/picker';
import { Building, Calendar, Check, ChevronDown, ChevronUp, Clock, CreditCard, FileCheck, FileText, Plus, User } from 'lucide-react-native';
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

interface EmployeeData {
  id: string;
  name: string;
  role: string;
  department: string;
  status: string;
  performanceStatus: string;
  taskStatus: string;
  joinedDate: string;
  nextReviewDate: string;
  specializations: string[];
}

const EmployeeProfileScreen: React.FC = () => {
  const [expandedStage, setExpandedStage] = useState<number>(-1);

  const [workflowStages, setWorkflowStages] = useState<WorkflowStage[]>([
    {
      id: 1,
      name: 'Client Onboarding',
      icon: Building,
      status: 'completed',
      description: 'Complete new client registration and documentation.',
      tasks: [
        { id: 1, name: 'Collect Client Information', completed: true },
        { id: 2, name: 'Verify Documents', completed: true }
      ]
    },
    {
      id: 2,
      name: 'Tax Filing',
      icon: FileCheck,
      status: 'in_progress',
      description: 'Process and file tax returns for assigned clients.',
      tasks: [
        { id: 1, name: 'Review Financial Statements', completed: true },
        { id: 2, name: 'Submit GST Returns', completed: false }
      ]
    },
    {
      id: 3,
      name: 'Compliance Check',
      icon: CreditCard,
      status: 'pending',
      description: 'Ensure all regulatory compliance requirements are met.',
      tasks: [
        { id: 1, name: 'Annual Return Filing', completed: false },
        { id: 2, name: 'License Renewal', completed: false }
      ]
    }
  ]);

  const employeeData: EmployeeData = {
    id: 'EMP001',
    name: 'Priya Sharma',
    role: 'Senior Accountant',
    department: 'Finance & Accounts',
    status: 'Active',
    performanceStatus: 'Excellent',
    taskStatus: 'On Track',
    joinedDate: '15 Jan 2022',
    nextReviewDate: '15 Jan 2025',
    // managingClient: 'Rahul',
    specializations: [
      'Tax Filing',
      'GST Returns',
      'Financial Audit',
      'Payroll',
      'Compliance',
      'Bookkeeping'
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

  const toggleExpand = (id: number): void => {
    setExpandedStage(expandedStage === id ? -1 : id);
  };

  const handleAssignTask = (): void => {
    // Navigation logic would go here
    console.log(`Navigating to assign task for employee: ${employeeData.id}`);
    // router.push(`/assign-task?employeeId=${employeeData.id}&employeeName=${employeeData.name}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User size={40} color="#3b82f6" />
        </View>
        <Text style={styles.name}>{employeeData.name}</Text>
        <Text style={styles.company}>{employeeData.role}</Text>
        <Text style={styles.department}>{employeeData.department}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{employeeData.status}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Employee Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Employee Details</Text>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <FileText size={18} color="#6b7280" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Performance Status</Text>
                <Text style={[styles.detailValue, styles.excellentText]}>
                  {employeeData.performanceStatus}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <Clock size={18} color="#6b7280" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Task Status</Text>
                <Text style={[styles.detailValue, styles.onTrackText]}>
                  {employeeData.taskStatus}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <Calendar size={18} color="#6b7280" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Joined Date</Text>
                <Text style={styles.detailValue}>{employeeData.joinedDate}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <Calendar size={18} color="#6b7280" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Next Review Date</Text>
                <Text style={styles.detailValue}>{employeeData.nextReviewDate}</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Managing Client</Text>
                {/* <Text style={styles.detailValue}>{employeeData.managingClient}</Text> */}
              </View>
            </View>
          </View>
        </View>

        {/* Specializations Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Specializations</Text>
          <View style={styles.servicesContainer}>
            {employeeData.specializations.map((specialization, index) => (
              <View key={index} style={styles.serviceChip}>
                <Text style={styles.serviceText}>{specialization}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Active Tasks Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Active Tasks</Text>
          </View>

          <View style={styles.workflowContainer}>
            {workflowStages
              .filter(stage => stage.status === 'in_progress' || stage.status === 'pending')
              .map((stage, index, filteredArray) => {
                const config = getStatusConfig(stage.status);
                const Icon = stage.icon;
                const isExpanded = expandedStage === stage.id;

                return (
                  <View key={stage.id} style={styles.workflowStage}>
                    {/* Timeline Dot */}
                    <View style={styles.timelineContainer}>
                      <View style={[styles.timelineDot, { backgroundColor: config.dotColor }]} />
                      {index < filteredArray.length - 1 && (
                        <View style={styles.timelineLine} />
                      )}
                    </View>

                    {/* Stage Card */}
                    <View style={styles.stageCard}>
                      <TouchableOpacity
                        style={styles.stageHeader}
                        onPress={() => toggleExpand(stage.id)}
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

          {/* Assign Task Button */}
          <TouchableOpacity
            style={styles.assignButton}
            onPress={handleAssignTask}
            activeOpacity={0.8}
          >
            <Plus size={22} color="#FFFFFF" />
            <Text style={styles.assignButtonText}>Assign New Task</Text>
          </TouchableOpacity>
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
    marginBottom: 4,
  },
  department: {
    fontSize: 14,
    color: '#9ca3af',
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
    paddingBottom: 32,
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
  cardHeader: {
    marginBottom: 0,
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
  excellentText: {
    color: '#16a34a',
  },
  onTrackText: {
    color: '#2563eb',
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
  assignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111111', // Changed to black
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    gap: 8,
    shadowColor: '#111111', // Changed shadow to match black button
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  assignButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmployeeProfileScreen;
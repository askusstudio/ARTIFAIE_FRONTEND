import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function FilterChip({ label, isSelected, onPress }: FilterChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    chip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: '#F5F5F5',
      marginRight: 10,
      height: 36,
      justifyContent: 'center',
    },
    chipSelected: {
      backgroundColor: '#E8E4F3',
    },
    chipText: {
      fontSize: 14,
      color: '#666666',
      fontWeight: '500',
    },
    chipTextSelected: {
      color: '#6B4EFF',
      fontWeight: '600',
    },
  });
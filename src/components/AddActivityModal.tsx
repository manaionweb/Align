import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Keyboard, Switch, Pressable } from 'react-native';
import { COLORS, SPACING, FONTS, SHAPE } from '../constants/theme';
import { useIkigai } from '../context/IkigaiContext';
import { Activity } from '../types';

interface AddActivityModalProps {
  visible: boolean;
  onClose: () => void;
  editingActivity?: Activity | null;
}

export default function AddActivityModal({ visible, onClose, editingActivity }: AddActivityModalProps) {
  const { activities, addActivity, updateActivity } = useIkigai();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [toggles, setToggles] = useState({
    love: false,
    skill: false,
    need: false,
    pay: false,
  });

  useEffect(() => {
    if (visible) {
      if (editingActivity) {
        setName(editingActivity.name);
        setToggles({
          love: editingActivity.love,
          skill: editingActivity.skill,
          need: editingActivity.need,
          pay: editingActivity.pay,
        });
      } else {
        reset();
      }
    }
  }, [visible, editingActivity]);

  const handleSave = () => {
    const trimmedName = name.trim();
    if (trimmedName) {
      // Check for duplicates
      const isDuplicate = activities.some(activity => 
        activity.name.toLowerCase() === trimmedName.toLowerCase() && 
        (!editingActivity || activity.id !== editingActivity.id)
      );

      if (isDuplicate) {
        setError('An activity with this name already exists.');
        return;
      }

      if (editingActivity) {
        updateActivity(editingActivity.id, { name: trimmedName, ...toggles });
      } else {
        addActivity(trimmedName, toggles);
      }
      reset();
      onClose();
    }
  };

  const reset = () => {
    setName('');
    setError('');
    setToggles({ love: false, skill: false, need: false, pay: false });
  };

  const CustomSwitch = ({ value, onValueChange }: { value: boolean, onValueChange: (val: boolean) => void }) => (
    <Pressable 
      onPress={() => onValueChange(!value)}
      style={[
        styles.switchTrack, 
        value ? styles.switchTrackActive : styles.switchTrackInactive
      ]}
    >
      <View style={[
        styles.switchThumb,
        value ? styles.switchThumbActive : styles.switchThumbInactive
      ]} />
    </Pressable>
  );

  const ToggleRow = ({ label, field }: { label: string, field: keyof typeof toggles }) => (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <CustomSwitch
        value={toggles[field]}
        onValueChange={(val) => setToggles(prev => ({ ...prev, [field]: val }))}
      />
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      aria-modal={true}
    >
      <Pressable onPress={onClose} style={{ flex: 1 }}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <Pressable style={styles.modalCard} onPress={(e: any) => e.stopPropagation()}>
              
              <Text style={styles.title}>{editingActivity ? 'Edit Activity' : 'New Activity'}</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Activity Name</Text>
                <TextInput
                  style={[styles.input, error ? styles.inputError : null]}
                  placeholder="e.g. Drawing, Coding etc."
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    if (error) setError('');
                  }}
                  autoFocus={!editingActivity}
                  selectionColor="#868B75"
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </View>

              <View style={styles.questionsContainer}>
                <ToggleRow label="Do you love it?" field="love" />
                <ToggleRow label="Are you good at it?" field="skill" />
                <ToggleRow label="Does the world need it?" field="need" />
                <ToggleRow label="Does it pay well?" field="pay" />
              </View>

              <TouchableOpacity 
                style={[styles.saveButton, !name.trim() && styles.saveButtonDisabled]} 
                onPress={handleSave}
                disabled={!name.trim()}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-end',
  },
  keyboardView: {
    width: '100%',
  },
  modalCard: {
    backgroundColor: '#F3EFE0', // Matches Home Screen Cream
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingTop: 40,
    paddingBottom: 50,
    elevation: 20,
    boxShadow: '0 -5 15 rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.heading,
    color: '#5A5348',
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  inputContainer: {
    marginBottom: SPACING.xl,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.bodyMedium,
    color: '#5A5348',
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30, // Pill shape
    fontSize: 16,
    fontFamily: FONTS.body,
    color: '#5A5348',
    elevation: 2,
    boxShadow: '0 2 4 rgba(0,0,0,0.05)',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#C77D63', // Soft red/coral from palette
  },
  errorText: {
    color: '#C77D63',
    fontSize: 12,
    fontFamily: FONTS.body,
    marginLeft: 12,
    marginTop: 2,
  },
  questionsContainer: {
    gap: 20,
    marginBottom: 40,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: FONTS.body,
    color: '#5A5348',
  },
  // Custom Switch Styles
  switchTrack: {
    width: 60,
    height: 32,
    borderRadius: 16,
    padding: 2,
    justifyContent: 'center',
  },
  switchTrackActive: {
    backgroundColor: '#868B75', // Sage
  },
  switchTrackInactive: {
    backgroundColor: '#D1C8B4', // Sand
  },
  switchThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    boxShadow: '0 2 2 rgba(0,0,0,0.2)',
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  switchThumbInactive: {
    alignSelf: 'flex-start',
  },
  saveButton: {
    backgroundColor: '#868B75', // Dark Sage
    paddingVertical: 18,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 5,
    boxShadow: '0 4 8 rgba(0,0,0,0.2)',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FONTS.bodyMedium,
  },
});

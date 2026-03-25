import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';

interface Action {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
}

interface CustomAlertModalProps {
  visible: boolean;
  title: string;
  message?: string;
  actions: Action[];
  onClose?: () => void;
}

export default function CustomAlertModal({ visible, title, message, actions, onClose }: CustomAlertModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      aria-modal={true}
      accessibilityRole="alert"
    >
      <Pressable onPress={onClose} style={{ flex: 1 }}>
        <View style={styles.overlay}>
          <Pressable>
            <View style={styles.modalCard}>
              <Text style={styles.title}>{title}</Text>
              {message && <Text style={styles.message}>{message}</Text>}

              <View style={styles.buttonContainer}>
                {actions.map((action, index) => {
                   const isCancel = action.style === 'cancel';
                   const isDestructive = action.style === 'destructive';
                   
                   return (
                    <TouchableOpacity 
                      key={index} 
                      style={[
                        styles.button, 
                        isCancel && styles.buttonCancel,
                        isDestructive && styles.buttonDestructive
                      ]}
                      onPress={() => {
                        action.onPress?.();
                        if (onClose) onClose();
                      }}
                    >
                      <Text style={[
                        styles.buttonText,
                         isCancel && styles.buttonTextCancel,
                         isDestructive && styles.buttonTextDestructive
                      ]}>
                        {action.text}
                      </Text>
                    </TouchableOpacity>
                   );
                })}
              </View>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.l,
  },
  modalCard: {
    backgroundColor: '#F3EFE0', // Swift Cream
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    elevation: 10,
    boxShadow: '0 4 12 rgba(0,0,0,0.1)',
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 22,
    color: '#5A5348',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: '#5A5348',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1C8B4', // Sand border
  },
  buttonCancel: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  buttonDestructive: {
    backgroundColor: '#C77D63', // Muted Red
    borderColor: '#C77D63',
  },
  buttonText: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: '#5A5348',
  },
  buttonTextCancel: {
    color: '#999',
  },
  buttonTextDestructive: {
    color: '#FFFFFF',
    fontFamily: FONTS.bodyMedium,
  },
});

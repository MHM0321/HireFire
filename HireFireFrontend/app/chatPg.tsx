//potato
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router/build/exports';
import React from 'react';

type Message = {
  id: string;
  text: string;
  sender: 'client' | 'worker';
};

export default function ChatScreen() {
  const router = useRouter();
  const { clientName } = useLocalSearchParams<{ clientName: string }>();
  
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello, how can I help you?', sender: 'client' },
    { id: '2', text: 'I need help with plumbing at my house.', sender: 'worker' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { 
          id: String(messages.length + 1), 
          text: newMessage, 
          sender: 'worker' 
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{clientName}</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView 
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'worker' ? styles.workerMessage : styles.clientMessage,
            ]}
          >
            <Text style={[
              styles.messageText,
              message.sender === 'worker' ? styles.workerText : styles.clientText
            ]}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={handleSendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity 
          onPress={handleSendMessage} 
          style={styles.sendButton}
          disabled={!newMessage.trim()}
        >
          <Feather name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1A0D0E', // Keeping the dark header
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 16,
    fontWeight: '600',
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
  },
  workerMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF4D4D', // Changed to red (#FF4D4D)
  },
  clientMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
  },
  workerText: {
    color: '#FFFFFF',
  },
  clientText: {
    color: '#333333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginLeft: 8,
    backgroundColor: '#FF4D4D', // Changed to red (#FF4D4D)
    borderRadius: 50,
  },
});
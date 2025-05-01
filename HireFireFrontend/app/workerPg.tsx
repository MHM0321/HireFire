import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView, Animated, Modal, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Type Definitions
type AvailabilityData = Record<string, number[]>;

interface CalendarDay {
  day: number;
  dayOfWeek: string;
  date: Date;
  isEmpty: boolean;
}

interface TimeSlot {
  slot: string;
  display: string;
  hour: number;
}

interface FeatureCardProps {
  iconName: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
}

export default function WorkerScreen() {
  const [location, setLocation] = useState<string>('');
  const router = useRouter();
  
  // Date and time states
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [dayPickerVisible, setDayPickerVisible] = useState<boolean>(false);
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [currentEditingDay, setCurrentEditingDay] = useState<string | null>(null);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData>({});
  
  const monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (): CalendarDay[] => {
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const days: CalendarDay[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: 0, dayOfWeek: '', date: new Date(), isEmpty: true });
    }
    
    // Add actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i);
      days.push({
        day: i,
        dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date,
        isEmpty: false
      });
    }
    
    return days;
  };

  const getTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let i = 0; i < 24; i++) {
      slots.push({
        slot: `${i}-${i+1}`,
        display: `${i === 0 ? '12' : i > 12 ? i - 12 : i}${i < 12 ? ' AM' : ' PM'} - ${i+1 === 12 ? '12' : (i+1) > 12 ? (i+1) - 12 : i+1}${i+1 < 12 ? ' AM' : ' PM'}`,
        hour: i
      });
    }
    return slots;
  };

  const toggleDaySelection = (date: Date) => {
    // Create a UTC date string without time component to avoid timezone issues
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    if (selectedDays.includes(dateStr)) {
      setSelectedDays(selectedDays.filter(d => d !== dateStr));
      
      const newAvailabilityData = { ...availabilityData };
      delete newAvailabilityData[dateStr];
      setAvailabilityData(newAvailabilityData);
    } else {
      setSelectedDays([...selectedDays, dateStr]);
      
      if (!availabilityData[dateStr]) {
        setAvailabilityData({
          ...availabilityData,
          [dateStr]: []
        });
      }
    }
  };

  const toggleTimeSlotSelection = (hour: number) => {
    if (!currentEditingDay) return;
    
    const newAvailabilityData = { ...availabilityData };
    const currentHours = newAvailabilityData[currentEditingDay] || [];
    
    if (currentHours.includes(hour)) {
      newAvailabilityData[currentEditingDay] = currentHours.filter(h => h !== hour);
    } else {
      newAvailabilityData[currentEditingDay] = [...currentHours, hour];
    }
    
    setAvailabilityData(newAvailabilityData);
  };

  const openTimePickerForDay = (date: string) => {
    setCurrentEditingDay(date);
    setTimePickerVisible(true);
  };

  const saveAvailability = () => {
    setTimePickerVisible(false);
    console.log("Availability saved:", availabilityData);
  };

  const formatSelectedDaysCount = (): string => {
    if (selectedDays.length === 0) return 'No days selected';
    return `${selectedDays.length} day${selectedDays.length > 1 ? 's' : ''} selected`;
  };

  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const FeatureCard: React.FC<FeatureCardProps> = ({ iconName, title, subtitle, onPress }) => {
    const glowAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }, [glowAnim]);

    const animatedStyle = {
      shadowOpacity: glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.8],
      }),
      shadowRadius: glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [5, 15],
      }),
    };

    return (
      <Animated.View style={[styles.featureCard, animatedStyle]}>
        <TouchableOpacity onPress={onPress}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Feather name={iconName} size={20} color="#FF0000" style={{ marginRight: 8 }} />
            <Text style={styles.featureTitle}>{title}</Text>
          </View>
          <Text style={styles.featureSubtitle}>{subtitle}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Feather name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logoText.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity style={styles.headerButton}>
          <Feather name="user" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome, Worker</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#666666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Set Location"
              placeholderTextColor="#666666"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* Custom Date Time Picker */}
        <View style={styles.dateTimeSection}>
          <Text style={styles.sectionHeader}>Set Your Availability</Text>
          
          {/* Date Selection Button */}
          <TouchableOpacity 
            style={styles.dateTimeButton}
            onPress={() => setDayPickerVisible(true)}
          >
            <Feather name="calendar" size={20} color="#FF0000" style={styles.dateTimeIcon} />
            <Text style={styles.dateTimeButtonText}>{formatSelectedDaysCount()}</Text>
          </TouchableOpacity>
          
          {/* Selected Days List */}
          {selectedDays.length > 0 && (
            <View style={styles.selectedDaysList}>
              <Text style={styles.selectedDaysTitle}>Selected Days:</Text>
              {selectedDays.sort().map((dateStr) => {
                const date = new Date(dateStr + 'T00:00:00'); // Add time component to ensure correct date
                const formattedDate = date.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                });
                const timeSlots = availabilityData[dateStr] || [];
                
                return (
                  <View key={dateStr} style={styles.selectedDayItem}>
                    <View style={styles.selectedDayHeader}>
                      <Text style={styles.selectedDayText}>{formattedDate}</Text>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => openTimePickerForDay(dateStr)}
                      >
                        <Feather name="clock" size={16} color="#FF0000" />
                        <Text style={styles.editButtonText}>
                          {timeSlots.length > 0 ? 'Edit Hours' : 'Set Hours'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    
                    {timeSlots.length > 0 && (
                      <View style={styles.timeSlotChips}>
                        {timeSlots.sort((a, b) => a - b).map((hour) => (
                          <View key={hour} style={styles.timeSlotChip}>
                            <Text style={styles.timeSlotChipText}>
                              {`${hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`} - ${hour+1 === 12 ? '12 PM' : (hour+1) > 12 ? `${(hour+1) - 12} PM` : `${hour+1} AM`}`}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
          
          {/* Day Picker Modal */}
          <Modal
            visible={dayPickerVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setDayPickerVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Days</Text>
                
                {/* Month Navigation */}
                <View style={styles.monthNavigation}>
                  <TouchableOpacity onPress={goToPreviousMonth}>
                    <Feather name="chevron-left" size={24} color="#333333" />
                  </TouchableOpacity>
                  <Text style={styles.monthYearText}>
                    {`${monthNames[selectedMonth]} ${selectedYear}`}
                  </Text>
                  <TouchableOpacity onPress={goToNextMonth}>
                    <Feather name="chevron-right" size={24} color="#333333" />
                  </TouchableOpacity>
                </View>
                
                {/* Week Days Header */}
                <View style={styles.weekDaysHeader}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <Text key={index} style={styles.weekDayText}>{day}</Text>
                  ))}
                </View>
                
                {/* Calendar Grid */}
                <FlatList
                  data={getDaysInMonth()}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={7}
                  scrollEnabled={false}
                  renderItem={({ item }) => {
                    if (item.isEmpty) {
                      return <View style={styles.emptyDayItem} />;
                    }
                    
                    const dateStr = `${item.date.getFullYear()}-${String(item.date.getMonth() + 1).padStart(2, '0')}-${String(item.date.getDate()).padStart(2, '0')}`;
                    const isSelected = selectedDays.includes(dateStr);
                    
                    return (
                      <TouchableOpacity
                        style={[
                          styles.dayItem,
                          isSelected ? styles.selectedDay : null
                        ]}
                        onPress={() => toggleDaySelection(item.date)}
                      >
                        <Text style={[
                          styles.dayNumber,
                          isSelected ? styles.selectedDayText : null
                        ]}>
                          {item.day}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
                
                <View style={styles.modalButtonRow}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setDayPickerVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          
          {/* Time Slot Picker Modal */}
          <Modal
            visible={timePickerVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setTimePickerVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {currentEditingDay && (
                  <>
                    <Text style={styles.modalTitle}>
                      Select Available Hours
                    </Text>
                    <Text style={styles.modalSubtitle}>
                      {new Date(currentEditingDay).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Text>
                    <Text style={styles.modalInstruction}>
                      Tap to select hourly slots
                    </Text>
                    
                    <FlatList
                      data={getTimeSlots()}
                      keyExtractor={(item) => item.slot}
                      renderItem={({ item }) => {
                        const isSelected = availabilityData[currentEditingDay]?.includes(item.hour) || false;
                        
                        return (
                          <TouchableOpacity
                            style={[
                              styles.timeSlotItem,
                              isSelected ? styles.selectedTimeSlot : null
                            ]}
                            onPress={() => toggleTimeSlotSelection(item.hour)}
                          >
                            <Text style={[
                              styles.timeSlotText,
                              isSelected ? styles.selectedTimeSlotText : null
                            ]}>
                              {item.display}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                    
                    <View style={styles.modalButtonRow}>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setTimePickerVisible(false)}
                      >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={saveAvailability}
                      >
                        <Text style={styles.saveButtonText}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </View>

        {/* Features */}
        <View style={styles.featuresGrid}>
          <FeatureCard 
            iconName="calendar"
            title="Available Appointments"
            subtitle="View work requests"
            onPress={() => router.push('/appointmentsPg')}
          />
          
          <FeatureCard 
            iconName="briefcase"
            title="My Clients"
            subtitle="Manage current clients"
            onPress={() => router.push('/myClientsPg')}
          />
          
          <FeatureCard 
            iconName="bar-chart"
            title="My Performance"
            subtitle="View your statistics"
            onPress={() => router.push('/myPerformancePg')}
          />
          
          <FeatureCard 
            iconName="edit-3"
            title="Rate and Review"
            subtitle="Review past clients"
            onPress={() => router.push('/rateAndReviewPg')}
          />
          
          <FeatureCard 
            iconName="dollar-sign"
            title="Earnings"
            subtitle="Withdraw your money"
            onPress={() => router.push('/earningsPg')}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

// Styles remain exactly the same as in your original code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 38,
    backgroundColor: '#1A0D0E',
  },
  headerButton: {
    width: 40,
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 60,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#F5F0F0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  welcomeSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  dateTimeSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  dateTimeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  dateTimeIcon: {
    marginRight: 10,
  },
  dateTimeButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedDaysList: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  selectedDaysTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  selectedDayItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  selectedDayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  selectedDayText: {
    fontSize: 16,
    color: '#333333',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#FF0000',
  },
  timeSlotChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  timeSlotChip: {
    backgroundColor: '#FFE0E0',
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    margin: 2,
  },
  timeSlotChipText: {
    fontSize: 12,
    color: '#FF0000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  modalSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    color: '#333333',
  },
  modalInstruction: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    color: '#666666',
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDayText: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  dayItem: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  emptyDayItem: {
    width: '14.28%',
    aspectRatio: 1,
  },
  dayNumber: {
    fontSize: 16,
    color: '#333333',
  },
  selectedDay: {
    backgroundColor: '#FFE0E0',
    borderRadius: 100,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#333333',
  },
  timeSlotItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  timeSlotText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedTimeSlot: {
    backgroundColor: '#FFE0E0',
  },
  selectedTimeSlotText: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    flex: 1,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  featuresGrid: {
    paddingHorizontal: 16,
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FF0000',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
});
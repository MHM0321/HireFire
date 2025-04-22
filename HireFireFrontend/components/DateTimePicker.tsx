import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  TextInput,
  Dimensions 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

type DateTimePickerProps = {
  onDateChange?: (date: Date) => void;
  initialDate?: Date;
};

type ViewMode = 'days' | 'months' | 'years';

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ 
  onDateChange, 
  initialDate = new Date() 
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [displayDate, setDisplayDate] = useState(initialDate);
  const [timeInput, setTimeInput] = useState('01:30');
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('days');

  // Format date for display
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = MONTHS[date.getMonth()].substring(0, 3);
    return `${day} ${month}`;
  };

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get days of the current month to display
  const getDaysArray = () => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    
    // Get the day of the week the month starts on (0 = Sunday)
    const firstDay = new Date(year, month, 1).getDay();
    
    const daysArray = [];
    
    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    
    // Add empty spaces at the end to complete the grid rows if needed
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    for (let i = 0; i < remainingCells; i++) {
      daysArray.push(null);
    }
    
    return daysArray;
  };

  // Handle selecting a day
  const handleDaySelect = (day: number) => {
    if (!day) return;
    
    const newDate = new Date(displayDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
    
    // Parse time and set it on the date
    const [hours, minutes] = timeInput.split(':').map(Number);
    newDate.setHours(hours || 0);
    newDate.setMinutes(minutes || 0);
    
    if (onDateChange) {
      onDateChange(newDate);
    }
    
    setShowCalendar(false);
  };

  // Handle changing month
  const changeMonth = (delta: number) => {
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setDisplayDate(newDate);
  };

  // Handle selecting a month
  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(displayDate);
    newDate.setMonth(monthIndex);
    setDisplayDate(newDate);
    setViewMode('days');
  };

  // Handle selecting a year
  const handleYearSelect = (year: number) => {
    const newDate = new Date(displayDate);
    newDate.setFullYear(year);
    setDisplayDate(newDate);
    setViewMode('months');
  };

  // Generate years for year picker
  const getYearsArray = () => {
    const currentYear = displayDate.getFullYear();
    const startYear = currentYear - 7;
    const years = [];
    
    for (let i = 0; i < 15; i++) {
      years.push(startYear + i);
    }
    
    return years;
  };

  // Handle time input change
  const handleTimeChange = (text: string) => {
    // Basic validation for time format
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    
    if (text === '' || timeRegex.test(text)) {
      setTimeInput(text);
      
      if (timeRegex.test(text)) {
        const [hours, minutes] = text.split(':').map(Number);
        const newDate = new Date(selectedDate);
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        
        if (onDateChange) {
          onDateChange(newDate);
        }
      }
    }
  };

  const renderDaysView = () => {
    const days = getDaysArray();
    
    return (
      <>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Feather name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setViewMode('months')}>
            <Text style={styles.monthYearText}>
              {MONTHS[displayDate.getMonth()]} {displayDate.getFullYear()}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Feather name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.weekdaysRow}>
          {WEEKDAYS.map((day, index) => (
            <Text key={index} style={styles.weekdayText}>{day}</Text>
          ))}
        </View>
        
        <View style={styles.daysGrid}>
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                day === selectedDate.getDate() && 
                displayDate.getMonth() === selectedDate.getMonth() && 
                displayDate.getFullYear() === selectedDate.getFullYear() 
                  ? styles.selectedDayCell 
                  : {}
              ]}
              onPress={() => day && handleDaySelect(day)}
              disabled={!day}
            >
              {day ? <Text style={[
                styles.dayText,
                day === selectedDate.getDate() && 
                displayDate.getMonth() === selectedDate.getMonth() && 
                displayDate.getFullYear() === selectedDate.getFullYear() 
                  ? styles.selectedDayText 
                  : {}
              ]}>{day}</Text> : null}
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  const renderMonthsView = () => {
    return (
      <>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => setViewMode('years')}>
            <Text style={styles.monthYearText}>{displayDate.getFullYear()}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.monthsGrid}>
          {MONTHS.map((month, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.monthCell,
                index === selectedDate.getMonth() && 
                displayDate.getFullYear() === selectedDate.getFullYear() 
                  ? styles.selectedMonthCell 
                  : {}
              ]}
              onPress={() => handleMonthSelect(index)}
            >
              <Text style={styles.monthText}>{month.substring(0, 3)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  const renderYearsView = () => {
    const years = getYearsArray();
    
    return (
      <>
        <View style={styles.calendarHeader}>
          <Text style={styles.monthYearText}>
            {years[0]} - {years[years.length - 1]}
          </Text>
        </View>
        
        <View style={styles.yearsGrid}>
          {years.map((year, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.yearCell,
                year === selectedDate.getFullYear() 
                  ? styles.selectedYearCell 
                  : {}
              ]}
              onPress={() => handleYearSelect(year)}
            >
              <Text style={styles.yearText}>{year}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Feather name="clock" size={24} color="#888" style={styles.icon} />
        
        <TouchableOpacity 
          style={styles.dateInput}
          onPress={() => setShowCalendar(true)}
        >
          <Text style={styles.dateInputText}>{formatDate(selectedDate)}</Text>
        </TouchableOpacity>
        
        <View style={styles.timeInputContainer}>
          <TextInput
            style={styles.timeInput}
            value={timeInput}
            onChangeText={handleTimeChange}
            keyboardType="numbers-and-punctuation"
            placeholder="HH:MM"
            placeholderTextColor="#666"
          />
        </View>
      </View>
      
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCalendar(false)}
        >
          <TouchableOpacity 
            activeOpacity={1}
            style={styles.calendarContainer}
            onPress={e => e.stopPropagation()}
          >
            {viewMode === 'days' && renderDaysView()}
            {viewMode === 'months' && renderMonthsView()}
            {viewMode === 'years' && renderYearsView()}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 20,
    color: '#FF4D4D',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 6,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateInputText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  timeInputContainer: {
    backgroundColor: '#FFFFFF',
    marginLeft: 15,
    marginRight: 50,
    borderRadius: 6,
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeInput: {
    padding: 12,
    width: '100%',
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: '#1A0D0E',
    borderRadius: 8,
    padding: 16,
    width: 300,
    maxHeight: 400,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  monthYearText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    width: '100%',
  },
  weekdayText: {
    color: '#BBB',
    width: '14.28%',
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: '14.28%', // Exactly 1/7 of the container width
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  dayText: {
    color: 'white',
    textAlign: 'center',
  },
  selectedDayCell: {
    backgroundColor: '#FF4D4D',
    borderRadius: 18,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  monthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  monthCell: {
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1.66%',
    borderRadius: 8,
  },
  monthText: {
    color: 'white',
    fontSize: 16,
  },
  selectedMonthCell: {
    backgroundColor: '#FF4D4D',
  },
  yearsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  yearCell: {
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1.66%',
    borderRadius: 8,
  },
  yearText: {
    color: 'white',
    fontSize: 16,
  },
  selectedYearCell: {
    backgroundColor: '#FF4D4D',
  },
});
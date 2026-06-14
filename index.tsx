import { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  // State to hold the list of all workout logs
  const [logs, setLogs] = useState([
    { id: '1', date: 'Today', type: 'Running', duration: '30', calories: '250', steps: '4500' },
    { id: '2', date: 'Yesterday', type: 'Cycling', duration: '45', calories: '320', steps: '0' }
  ]);

  // Form Input States
  const [activityType, setActivityType] = useState('Walking');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [steps, setSteps] = useState('');

  // Calculate Dashboard Summary Totals dynamically
  const totalCalories = logs.reduce((sum, item) => sum + Number(item.calories || 0), 0);
  const totalMinutes = logs.reduce((sum, item) => sum + Number(item.duration || 0), 0);
  const totalSteps = logs.reduce((sum, item) => sum + Number(item.steps || 0), 0);

  // Function to handle adding a new activity log manually
  const handleAddLog = () => {
    if (!duration || !calories) {
      alert('Please fill out workout duration and calories burned!');
      return;
    }

    const newLog = {
      id: Date.now().toString(),
      date: 'Today',
      type: activityType,
      duration: duration,
      calories: calories,
      steps: steps || '0'
    };

    setLogs([newLog, ...logs]); // Add new log to the top of the list
    
    // Reset Form Fields
    setDuration('');
    setCalories('');
    setSteps('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fitness Tracker</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* DASHBOARD SUMMARY SCREEN */}
        <Text style={styles.sectionTitle}>Today's Dashboard Summary</Text>
        <View style={styles.dashboardContainer}>
          <View style={[styles.card, { backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.cardValue}>{totalCalories}</Text>
            <Text style={styles.cardLabel}>Calories Burned</Text>
          </View>
          <View style={[styles.card, { backgroundColor: '#4D96FF' }]}>
            <Text style={styles.cardValue}>{totalMinutes}m</Text>
            <Text style={styles.cardLabel}>Active Time</Text>
          </View>
          <View style={[styles.card, { backgroundColor: '#6BCB77' }]}>
            <Text style={styles.cardValue}>{totalSteps}</Text>
            <Text style={styles.cardLabel}>Steps Taken</Text>
          </View>
        </View>

        {/* PROGRESS VISUAL ELEMENT (Progress Bar) */}
        <View style={styles.progressBarWidget}>
          <Text style={styles.widgetTitle}>Daily Step Goal Progress</Text>
          <Text style={styles.widgetSub}>{totalSteps} / 10,000 steps</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${Math.min((totalSteps / 10000) * 100, 100)}%` }]} />
          </View>
        </View>

        {/* MANUAL LOG ACTIVITY FORM */}
        <Text style={styles.sectionTitle}>Log New Activity</Text>
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Select Exercise Type:</Text>
          <View style={styles.pickerAlternative}>
            {['Walking', 'Running', 'Cycling', 'Gym Workout'].map((type) => (
              <TouchableOpacity 
                key={type} 
                style={[styles.typeButton, activityType === type && styles.typeButtonSelected]}
                onPress={() => setActivityType(type)}
              >
                <Text style={[styles.typeButtonText, activityType === type && styles.typeButtonTextSelected]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput 
            style={styles.input} 
            placeholder="Duration (Minutes)" 
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Calories Burned" 
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Steps Taken (Optional)" 
            keyboardType="numeric"
            value={steps}
            onChangeText={setSteps}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleAddLog}>
            <Text style={styles.submitButtonText}>Save Workout Log</Text>
          </TouchableOpacity>
        </View>

        {/* WORKOUT RECENT HISTORY */}
        <Text style={styles.sectionTitle}>Recent Activity Logs</Text>
        {logs.map((item) => (
          <View key={item.id} style={styles.historyRow}>
            <View>
              <Text style={styles.historyType}>{item.type}</Text>
              <Text style={styles.historyMeta}>{item.date} • {item.duration} mins</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.historyStats}>{item.calories} kcal</Text>
              {item.steps !== '0' && <Text style={styles.historyMeta}>{item.steps} steps</Text>}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  scrollContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginTop: 25,
    marginBottom: 12,
  },
  dashboardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
    textAlign: 'center',
  },
  progressBarWidget: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  widgetTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  widgetSub: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6BCB77',
    borderRadius: 6,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  pickerAlternative: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  typeButton: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  typeButtonSelected: {
    backgroundColor: '#4D96FF',
  },
  typeButtonText: {
    fontSize: 12,
    color: '#475569',
  },
  typeButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 12,
    color: '#1E293B',
  },
  submitButton: {
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyRow: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4D96FF',
  },
  historyType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  historyMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  historyStats: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
});
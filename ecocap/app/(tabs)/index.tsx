import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

interface FormData {
  surface: string;
  sousDalle: string;
  sousSol: string;
  aerienne: string;
  conso: string;
  employe: string;
  poste: string;
}

export default function HomeScreen() {
  const [formData, setFormData] = useState<FormData>({
    surface: '',
    sousDalle: '',
    sousSol: '',
    aerienne: '',
    conso: '',
    employe: '',
    poste: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['surface', 'conso', 'employe', 'poste'] as const;
    const missingFields = requiredFields.filter(field => !formData[field].trim());

    if (missingFields.length > 0) {
      Alert.alert('Erreur', `Veuillez remplir les champs suivants: ${missingFields.join(', ')}`);
      return;
    }

    // Here you would typically send the data to your backend
    Alert.alert('Succès', 'Formulaire soumis avec succès!', [
      { text: 'OK', onPress: () => console.log('Form data:', formData) }
    ]);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Évaluation Écologique</ThemedText>
      </ThemedView>

      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle" style={styles.formTitle}>Informations du Site</ThemedText>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Surface du site (m²)*</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.surface}
            onChangeText={(value) => updateField('surface', value)}
            placeholder="Entrez la surface"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Places sous-dalle</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.sousDalle}
            onChangeText={(value) => updateField('sousDalle', value)}
            placeholder="Nombre de places"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Places sous-sol</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.sousSol}
            onChangeText={(value) => updateField('sousSol', value)}
            placeholder="Nombre de places"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Places aériennes</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.aerienne}
            onChangeText={(value) => updateField('aerienne', value)}
            placeholder="Nombre de places"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Consommation énergétique (kWh/an)</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.conso}
            onChangeText={(value) => updateField('conso', value)}
            placeholder="Consommation annuelle"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Nombre d'employés</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.employe}
            onChangeText={(value) => updateField('employe', value)}
            placeholder="Nombre d'employés"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Nombre de postes</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.poste}
            onChangeText={(value) => updateField('poste', value)}
            placeholder="Nombre de postes"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </ThemedView>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <ThemedText style={styles.submitButtonText}>Soumettre</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  formContainer: {
    padding: 20,
    gap: 16,
  },
  formTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});


import {Text, View, StyleSheet, TouchableOpacity, TextInput, Animated, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from "react-native";
import {router} from "expo-router";

export default function HomeScreen() {
  return (

      <View>

          <View>
              <Text>Some stuff that the user should see first (either login/signup or dashboard)</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => router.replace("/hidden/customerToWorker1")}>
              <Text>Go to customerToWorker1</Text>
          </TouchableOpacity>


      </View>


  );
}

const styles = StyleSheet.create({
  button: {
      width: 100,
      height: 100,
      backgroundColor: 'red',
      marginTop: 100,
      marginLeft: 100,
  },
});


import {Text, View, StyleSheet, TouchableOpacity, TextInput, Animated, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from "react-native";

export default function SettingsScreen() {
    return (

        <View>

            <View>
                <Text>Settings</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text>Settings</Text>
            </TouchableOpacity>


        </View>


    );
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 100,
        backgroundColor: 'green',
        marginTop: 100,
        marginLeft: 100,
    },
});
